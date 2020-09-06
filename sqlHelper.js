const jmdict = require('better-sqlite3')('./dict/JMDict.sqlite3');

module.exports.jmdict = async (word) => {
  // language=sql
  const stmt = jmdict.prepare(`
    select id, kanji, reading, gloss, position
    from entry
    where kanji = ?                      -- Exact,
       or kanji like '%, ' || ?          -- ends with,
       or kanji like ?     || ',%'       -- starts with,
       or kanji like '%, ' || ? || ', %' -- in the middle.
    limit 10;
  `)

  const rows = stmt.all(word, word, word, word);

  return rows;
}
