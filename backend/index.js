const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const ve = require('@n00p3/ve-js');
const words = require('./features/words').words;
const extractKanji = require('./features/kanji').extractKanji;
const sqlHelper = require('./sqlHelper');
const {check, validationResult} = require('express-validator');
const hepburn = require('hepburn');
const config = require('./config');

const app = new express();
const limiter = rateLimit({
  windowMs: 1000,
  max: 1,
});
app.use(limiter);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

function jpToEngRatio(text) {
  let jp = 0;
  for (const char of text) {
    if (hepburn.containsKana(char) || hepburn.containsKanji(char))
      jp++;
  }

  return jp / text.length
}

app.get('/api/translate',
  [check('text').isLength({max: config.maxTextLength})
    .withMessage(`Text cannot be longer than ${config.maxTextLength} characters.`)],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const result = {};
    const text = req.query.text;
    const features = req.query.features.replace(/\s/g, '').split(',');

    const isEnglish = jpToEngRatio(text) < 0.5;

    result.words = await words(text, isEnglish);

    if (features.includes('jmdict')) {
      for (const word of result.words) {
        const sql = await sqlHelper.jmdict(word.lemma === '*' ? word.word : word.lemma, isEnglish);
        word.jmdict = sql;
      }
    }

    if (features.includes('kanji'))
      result.kanji = await extractKanji(text);

    res.send(result);
  });

app.listen(3010)