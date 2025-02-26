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
        if (!id) throw new Error("ID do usuário não fornecido.");
        const [rows] = await db.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    }
    
    async associarImagem(usuarioId, referencia) {
        await db.execute('INSERT INTO imagens (referencia, usuario_id) VALUES (?, ?)', [referencia, usuarioId]);
    }

    async delete(id) {
        const [rows] = await db.execute('DELETE FROM usuarios WHERE id = ?', [id]);
        return rows;
    }
}

module.exports = new UsuarioRepository();
