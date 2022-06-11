const database = require('../../database');

class ContactsRepository {
  async findAll(orderBy = 'asc') {
    const order = orderBy.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

    const rows = await database.query(`
      SELECT con.*, cat.name AS category_name
      FROM contacts AS con
      LEFT JOIN categories AS cat
      ON cat.id = con.category_id
      ORDER BY con.name ${order}
    `);

    return rows;
  }

  async findById(id) {
    const [foundById] = await database.query(`
      SELECT con.*, cat.name AS category_name
      FROM contacts AS con
      LEFT JOIN categories AS cat
      ON cat.id = con.category_id
      WHERE con.id = $1;
    `, [id]);
    return foundById;
  }

  async findByEmail(email) {
    const [foundByEmail] = await database
      .query('SELECT * FROM contacts WHERE email = $1;', [email]);
    return foundByEmail;
  }

  async delete(id) {
    const deleteOperation = await database
      .query('DELETE from contacts WHERE id = $1;', [id]);

    return deleteOperation;
  }

  async create({
    name, email, phone, category_id,
  }) {
    const [newDatabaseRow] = await database.query(`
        INSERT INTO contacts(name, email, phone, category_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `, [name, email, phone, category_id]);

    return newDatabaseRow;
  }

  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await database.query(`
      UPDATE contacts
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *;
      `, [name, email, phone, category_id, id]);

    return row;
  }
}

module.exports = new ContactsRepository();
// export default new ContactsRepository();
