const ImageService = require('../services/imageService');
const { CreateImageDTO, UpdateImageDTO } = require('../dto/imageDto');

class ImageController {
  async create(req, res) {
    const { referencia, titulo } = req.body;

    if (!referencia || !titulo) {
      return res.status(400).send({ message: 'Referência e título são obrigatórios.' });
    }

    try {
      const dto = new CreateImageDTO(referencia, titulo);
      const image = await ImageService.createImage(dto);
      res.status(201).send(image);
    } catch (error) {
      res.status(500).send({ message: 'Erro ao criar imagem.', error });
    }
  }

  async getAll(req, res) {
    try {
      const images = await ImageService.getImages();
      res.status(200).send(images);
    } catch (error) {
      res.status(500).send({ message: 'Erro ao obter imagens.', error });
    }
  }

  async getById(req, res) {
    const { id } = req.params;

    try {
      const image = await ImageService.getImageById(id);
      if (!image) {
        return res.status(404).send({ message: 'Imagem não encontrada.' });
      }
      res.status(200).send(image);
    } catch (error) {
      res.status(500).send({ message: 'Erro ao obter imagem.', error });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { referencia, titulo } = req.body;

    if (!referencia || !titulo) {
      return res.status(400).send({ message: 'Referência e título são obrigatórios.' });
    }

    try {
      const dto = new UpdateImageDTO(referencia, titulo);
      const success = await ImageService.updateImage(id, dto);
      if (!success) {
        return res.status(404).send({ message: 'Imagem não encontrada.' });
      }
      res.status(200).send({ message: 'Imagem atualizada com sucesso.' });
    } catch (error) {
      res.status(500).send({ message: 'Erro ao atualizar imagem.', error });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const success = await ImageService.deleteImage(id);
      if (!success) {
        return res.status(404).send({ message: 'Imagem não encontrada.' });
      }
      res.status(200).send({ message: 'Imagem excluída com sucesso.' });
    } catch (error) {
      res.status(500).send({ message: 'Erro ao excluir imagem.', error });
    }
  }
}

module.exports = new ImageController();
