const db = require('../db');

class UsuarioRepository {
  async create(nome) {
    const [rows] = await db.execute(
      'INSERT INTO usuarios (nome, data_criacao) VALUES (?, ?)', 
      [nome, new Date()]
    );
    return rows;
  }

  async findAll() {
    const [rows] = await db.execute('SELECT * FROM usuarios');
    return rows;
  }

  async findById(id) {
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
    return rows[0];
  }

  async update(id, nome) {
    const [rows] = await db.execute(
      'UPDATE usuarios SET nome = ? WHERE id = ?',
      [nome, id]
    );
    return rows;
  }

  async delete(id) {
    const [rows] = await db.execute('DELETE FROM usuarios WHERE id = ?', [id]);
    return rows;
  }
}

module.exports = new UsuarioRepository();
