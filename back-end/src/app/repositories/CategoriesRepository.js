const database = require('../../database');

class CategoriesRepository {
  async findAll(orderBy = 'asc') {
    const order = orderBy.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

    const rows = await database.query(`
      SELECT * FROM categories ORDER BY name ${order};
    `);

    return rows;
  }

  async create(name) {
    const [newDatabaseRow] = await database.query(`
      INSERT INTO categories(name)
      VALUES ($1)
      RETURNING *;
    `, [name]);

    return newDatabaseRow;
  }
}

module.exports = new CategoriesRepository();
