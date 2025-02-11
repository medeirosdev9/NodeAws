const db = require('../db');

class ImageRepository {
  async create(referencia, titulo) {
    const [rows] = await db.execute(
      'INSERT INTO imagens (referencia, data_criacao, titulo) VALUES (?, ?, ?)', 
      [referencia, new Date(), titulo]
    );
    return rows;
  }

  async findAll() {
    const [rows] = await db.execute('SELECT * FROM imagens');
    return rows;
  }

  async findById(id) {
    const [rows] = await db.execute('SELECT * FROM imagens WHERE id = ?', [id]);
    return rows[0];
  }

  async update(id, referencia, titulo) {
    const [rows] = await db.execute(
      'UPDATE imagens SET referencia = ?, titulo = ? WHERE id = ?',
      [referencia, titulo, id]
    );
    return rows;
  }

  async delete(id) {
    const [rows] = await db.execute('DELETE FROM imagens WHERE id = ?', [id]);
    return rows;
  }
}

module.exports = new ImageRepository();
