const hepburn = require('hepburn');
const sqlHelper = require('../sqlHelper');
const _ = require('lodash');

module.exports.extractKanji = async (sentence) => {
  let kanji = [];
  for (const char of sentence) {
    if (hepburn.containsKanji(char))
      kanji.push(await sqlHelper.kanjiDefinition(char));
  }

  kanji = _.uniqBy(kanji, n => JSON.stringify(n));
  return kanji;
}