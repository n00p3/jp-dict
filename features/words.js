const Ve = require('@n00p3/ve-js');

module.exports.words = (sentence) => {
  const ve = new Ve();
  return ve.words(sentence);
}