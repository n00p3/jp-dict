const jmdict = require('better-sqlite3')('./dict/JMDict.sqlite3');
const kanjidb = require('better-sqlite3')('./dict/kanjidb.sqlite3');
const japanese = require('@lazy-cjk/japanese');

function jmDictQuery(word) {
  // language=sql
  const stmt = jmdict.prepare(`
    select id, kanji, reading, gloss, position
    from entry
    where kanji_always_hiragana = ?                      -- Exact,
       or kanji_always_hiragana like '%, ' || ?          -- ends with,
       or kanji_always_hiragana like ?     || ',%'       -- starts with,
       or kanji_always_hiragana like '%, ' || ? || ', %' -- in the middle.
       or reading_always_hiragana = ?                     
       or reading_always_hiragana like '%, ' || ?      
       or reading_always_hiragana like ?     || ',%'   
       or reading_always_hiragana like '%, ' || ? || ', %' 
    limit 10;
  `)
  const rows = stmt.all(word, word, word, word, word, word, word, word);

  return rows;
}

function kanjiDefinitionQuery(kanji) {
  // language=sql
  const stmt = kanjidb.prepare(`
    select literal,
           radical,
           strokecount,
           JLPT as jlpt,
           ONreading as onReading,
           KUNreading as kunReading,
           nanori,
           meaning,
           skip_1 as skip1,
           skip_2 as skip2,
           skip_3 as skip3
    from kanji
    where literal = ?
  `)
  const rows = stmt.all(kanji);

  return rows;
}

module.exports.jmdict = async (word) => {
  const hiraganized = japanese.hiraganize(word);
  const rows = jmDictQuery(hiraganized);

  return rows;
}

module.exports.kanjiDefinition = async (sentence) => {

  return kanjiDefinitionQuery(sentence);
}