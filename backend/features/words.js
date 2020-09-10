const Ve = require('@n00p3/ve-js');

module.exports.words = async (sentence, isEnglish) => {
  const punctuationMarks = [
    ',', '.', '(', '[', '{', '【', ')', ']', '}', '】',
  ]

  const ve = new Ve();
  let words = await ve.words(sentence);
  if (isEnglish) {
    words.forEach(word => {
      word.tokens = [];
    })
  }

  words = words.filter(word => word.word.trim().length > 0);
  words = words.filter(word => !punctuationMarks.includes(word.word));

  return words;
}