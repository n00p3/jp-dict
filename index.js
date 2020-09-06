const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const ve = require('@n00p3/ve-js');
const words = require('./features/words').words;
const extractKanji = require('./features/kanji').extractKanji;
const sqlHelper = require('./sqlHelper');

const app = new express();
const limiter = rateLimit({
  windowMs: 1000,
  max: 1,
});
app.use(limiter);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());


app.get('/', async (req, res) => {

  const result = {};
  const text = req.query.text;
  const features = req.query.features.replace(/\s/g,'').split(',');

  result.words = await words(text);

  if (features.includes('jmdict')) {
    for (const word of result.words) {
      const sql = await sqlHelper.jmdict(word.lemma === '*' ? word.word : word.lemma);
      word.jmdict = sql;
    }
  }

  if (features.includes('kanji'))
    result.kanji = await extractKanji(text);

  res.send(result);

  // res.send({stat: 'ok'})
});

app.listen(3010)