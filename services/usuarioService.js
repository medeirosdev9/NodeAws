// services/usuarioService.js
const UsuarioRepository = require('../repositories/usuarioRepository'); 
const Usuario = require('../models/usuarioModel');

class UsuarioService {
  async createUsuario(createUsuarioDTO) {
    const result = await UsuarioRepository.create(createUsuarioDTO.nome);
    return new Usuario(result.insertId, createUsuarioDTO.nome, new Date());
  }

  async getUsuarios() {
    const rows = await UsuarioRepository.findAll();
    return rows.map(row => new Usuario(row.id, row.nome, row.data_criacao));
  }

  async getUsuarioById(id) {
    const row = await UsuarioRepository.findById(id);
    if (!row) return null;
    return new Usuario(row.id, row.nome, row.data_criacao);
  }

  async updateUsuario(id, updateUsuarioDTO) {
    const result = await UsuarioRepository.update(id, updateUsuarioDTO.nome);
    return result.affectedRows > 0;
  }

  async deleteUsuario(id) {
    const result = await UsuarioRepository.delete(id);
    return result.affectedRows > 0;
  }
}

module.exports = new UsuarioService();
