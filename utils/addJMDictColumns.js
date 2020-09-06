const jmdict = require('better-sqlite3')('./dict/JMDict.sqlite3');
const japanese = require('@lazy-cjk/japanese');

function addColumns() {
  jmdict.exec(`
    alter table entry
      add column kanji_always_hiragana text
  `)

  jmdict.exec(`
    alter table entry
      add column reading_always_hiragana text
  `)
}

function fillKanjiAlwaysHiragana() {
  const rows = jmdict.prepare(`
      select id, kanji, reading, gloss, position
      from entry
  `).all();

  for (const [i, row] of rows.entries()) {
    if (i % 1000 === 0)
      console.log(`${i} / ${rows.length}`);

    const hiraganized = japanese.hiraganize(row.kanji);
    const stmt = jmdict.prepare(`
      update entry
         set kanji_always_hiragana = ?
       where id = ?
    `);
    stmt.run(hiraganized, row.id);
  }
}

function fillReadingAlwaysHiragana() {
  const rows = jmdict.prepare(`
      select id, kanji, reading, gloss, position
      from entry
  `).all();

  for (const [i, row] of rows.entries()) {
    if (i % 1000 === 0)
      console.log(`${i} / ${rows.length}`);

    const hiraganized = japanese.hiraganize(row.reading);
    const stmt = jmdict.prepare(`
      update entry
         set reading_always_hiragana = ?
       where id = ?
    `);
    stmt.run(hiraganized, row.id);
  }
}

// addColumns();
// fillKanjiAlwaysHiragana();
// fillReadingAlwaysHiragana();