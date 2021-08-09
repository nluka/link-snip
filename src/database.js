const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  database: 'link_snip',
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  doesShortExist: async (short) => {
    const result = await pool.query('select * from urls where (short = $1);', [
      short,
    ]);
    return result.rowCount > 0;
  },
};
