const { Pool } = require('pg');
const isEnvironmentProduction = require('./utilities/isEnvironmentProduction');

if (!isEnvironmentProduction()) {
  require('dotenv').config();
}

const developmentConfig = {
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
};

const productionConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
};

const pool = new Pool(
  isEnvironmentProduction() ? productionConfig : developmentConfig
);

function query(text, params) {
  return pool.query(text, params);
}

async function urlGetAll() {
  const result = await pool.query('SELECT * FROM urls;');
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
  const result = await pool.query('SELECT * FROM urls WHERE short = $1;', [
    short,
  ]);
  return result.rowCount > 0;
}

async function urlCreate(name, actual, short) {
  const result = await query(
    'INSERT INTO urls (name, actual, short, clicks) VALUES ($1, $2, $3, $4) RETURNING *;',
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
  const result = await query('DELETE FROM urls WHERE short = $1 RETURNING *;', [
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
      'UPDATE urls SET name = $1, actual = $2 WHERE short = $3 RETURNING *;';
    queryParams = [newName, newActual, short];
  } else if (newName !== null) {
    queryText = 'UPDATE urls SET name = $1 WHERE short = $2 RETURNING *;';
    queryParams = [newName, short];
  } else if (newActual !== null) {
    queryText = 'UPDATE urls SET actual = $1 WHERE short = $2 RETURNING *;';
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
  const result = await query('SELECT * FROM urls WHERE short = $1;', [short]);

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
  const result = await query('SELECT actual FROM urls WHERE short = $1;', [
    short,
  ]);
  if (result.rowCount === 0) {
    return null;
  }
  return result.rows[0].actual;
}

async function urlIncrementClicks(short) {
  await query('UPDATE urls SET clicks = clicks + 1 WHERE short = $1;', [short]);
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
