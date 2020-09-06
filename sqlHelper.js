const jmdict = require('better-sqlite3')('./dict/JMDict.sqlite3');
const japanese = require('@lazy-cjk/japanese');

function query(word) {
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

module.exports.jmdict = async (word) => {
  const hiraganized = japanese.hiraganize(word);
  const rows = query(hiraganized);

  return rows;
}
