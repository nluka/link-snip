const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  database: 'link_snip',
});

function query(text, params) {
  return pool.query(text, params);
}

async function urlGetAll() {
  const result = await pool.query('select * from urls;');
  return result.rows.map((row) => {
    return {
      name: row.name,
      actual: row.actual,
      short: row.short,
      clicks: row.clicks,
    };
  });
}

async function urlDoesShortExist(short) {
  const result = await pool.query('select * from urls where (short = $1);', [
    short,
  ]);
  return result.rowCount > 0;
}

async function urlCreate(name, actual, short) {
  const result = await query(
    'insert into urls (name, actual, short, clicks) values ($1, $2, $3, $4) returning *;',
    [name, actual, short, 0]
  );

  const createdUrl = result.rows[0];

  return {
    name: createdUrl.name,
    actual: createdUrl.actual,
    short: createdUrl.short,
    clicks: createdUrl.clicks,
  };
}

async function urlDelete(short) {
  const result = await query(
    'delete from urls where (short = $1) returning *;',
    [short]
  );

  const deletedUrl = result.rows[0];

  return {
    name: deletedUrl.name,
    actual: deletedUrl.actual,
    short: deletedUrl.short,
    clicks: deletedUrl.clicks,
  };
}

module.exports = {
  query,
  urlGetAll,
  urlDoesShortExist,
  urlCreate,
  urlDelete,
};
