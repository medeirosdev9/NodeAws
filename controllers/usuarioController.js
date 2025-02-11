const UsuarioService = require('../services/usuarioService');
const { CreateUsuarioDTO, UpdateUsuarioDTO } = require('../dto/usuarioDto.js');

class UsuarioController {
  async create(req, res) {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).send({ message: 'Nome é obrigatório.' });
    }

    try {
      const dto = new CreateUsuarioDTO(nome);
      const usuario = await UsuarioService.createUsuario(dto);
      res.status(201).send(usuario);
    } catch (error) {
      res.status(500).send({ message: 'Erro ao criar um usuário.', error });
    }
  }

  async getAll(req, res) {
    try {
      const usuarios = await UsuarioService.getUsuarios();
      res.status(200).send(usuarios);
    } catch (error) {
      res.status(500).send({ message: 'Erro ao obter usuários.', error });
    }
  }

  async getById(req, res) {
    const { id } = req.params;

    try {
      const usuario = await UsuarioService.getUsuarioById(id);
      if (!usuario) {
        return res.status(404).send({ message: 'Usuário não encontrado.' });
      }
      res.status(200).send(usuario);
    } catch (error) {
      res.status(500).send({ message: 'Erro ao obter usuário', error });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).send({ message: 'Nome é obrigatório.' });
    }

    try {
      const dto = new UpdateUsuarioDTO(nome);
      const success = await UsuarioService.updateUsuario(id, dto);
      if (!success) {
        return res.status(404).send({ message: 'Usuário não encontrado.' });
      }
      res.status(200).send({ message: 'Usuário atualizado com sucesso.' });
    } catch (error) {
      res.status(500).send({ message: 'Erro ao atualizar usuário.', error });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const success = await UsuarioService.deleteUsuario(id);
      if (!success) {
        return res.status(404).send({ message: 'Usuário não encontrado.' });
      }
      res.status(200).send({ message: 'Usuário excluído com sucesso.' });
    } catch (error) {
      res.status(500).send({ message: 'Erro ao excluir usuário.', error });
    }
  }
}

module.exports = new UsuarioController();
