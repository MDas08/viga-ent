const { Pool } = require('pg');

const pool = new Pool({
  user: '',
  host: '',
  database: 'viga-ent-api',
  password: '',
  port: 5432,
});

const createNewItem = async (newItem) => {
  const { id, type, description } = newItem;

  try {
    const client = await pool.connect();

    await client.query('BEGIN');

    await client.query(
      'INSERT INTO Pricing (id, type, descripton) ' +
      'VALUES ($1, $2, $3)',
      [id, type, description]
    );
    await client.query('COMMIT');

    client.release();
    
    return true; 
  } catch (error) {
    
    await pool.query('ROLLBACK');
    throw error;
  }
};


const getItemIdByType = async (itemType) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT id FROM Item WHERE type = $1', [itemType]);
    client.release();
    if (result.rows.length > 0) {
      return result.rows[0].id;
    } else {
      throw new Error(`Item type '${itemType}' not found.`);
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createNewItem,
  getItemIdByType,
};