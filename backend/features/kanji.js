const hepburn = require('hepburn');
const sqlHelper = require('../sqlHelper');

module.exports.extractKanji = async (sentence) => {
  const kanji = [];
  for (const char of sentence) {
    if (hepburn.containsKanji(char))
      kanji.push(await sqlHelper.kanjiDefinition(char));
  }

  return kanji;
}