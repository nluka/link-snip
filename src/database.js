const { Pool } = require('pg');
const isEnvironmentProduction = require('./utilities/isEnvironmentProduction');

if (!isEnvironmentProduction()) {
  require('dotenv').config();
}

const developmentConfig = `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

const productionConfig = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: isEnvironmentProduction()
    ? productionConfig
    : developmentConfig,
  ssl: true,
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
  const result = await pool.query('select * from urls where short = $1;', [
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
  const result = await query('delete from urls where short = $1 returning *;', [
    short,
  ]);

  const deletedUrl = result.rows[0];

  return {
    name: deletedUrl.name,
    actual: deletedUrl.actual,
    short: deletedUrl.short,
    clicks: deletedUrl.clicks,
  };
}

async function urlPatch(short, newName = null, newActual = null) {
  let queryText, queryParams;

  if (newName !== null && newActual !== null) {
    queryText =
      'update urls set name = $1, actual = $2 where short = $3 returning *;';
    queryParams = [newName, newActual, short];
  } else if (newName !== null) {
    queryText = 'update urls set name = $1 where short = $2 returning *;';
    queryParams = [newName, short];
  } else if (newActual !== null) {
    queryText = 'update urls set actual = $1 where short = $2 returning *;';
    queryParams = [newActual, short];
  } else {
    throw new Error(
      `at least one of 'newName' or 'newActual' must be provided`
    );
  }

  const result = await query(queryText, queryParams);

  const patchedUrl = result.rows[0];

  return {
    name: patchedUrl.name,
    actual: patchedUrl.actual,
    short: patchedUrl.short,
    clicks: patchedUrl.clicks,
  };
}

async function urlGetFromShort(short) {
  const result = await query('select * from urls where short = $1;', [short]);

  if (result.rowCount === 0) {
    return null;
  }

  const row = result.rows[0];

  return {
    name: row.name,
    actual: row.actual,
    short: row.short,
    clicks: row.clicks,
  };
}

async function urlGetActualFromShort(short) {
  const result = await query('select actual from urls where short = $1;', [
    short,
  ]);
  if (result.rowCount === 0) {
    return null;
  }
  return result.rows[0].actual;
}

async function urlIncrementClicks(short) {
  await query('update urls set clicks = clicks + 1 where short = $1;', [short]);
}

module.exports = {
  query,
  urlGetAll,
  urlDoesShortExist,
  urlCreate,
  urlDelete,
  urlPatch,
  urlGetFromShort,
  urlGetActualFromShort,
  urlIncrementClicks,
};
