const ImageRepository = require('../repositories/imageRepository');
const Image = require('../models/imageModel');

class ImageService {
  async createImage(createImageDTO) {
    const result = await ImageRepository.create(
      createImageDTO.referencia,
      createImageDTO.titulo
    );
    return new Image(result.insertId, createImageDTO.referencia, createImageDTO.titulo, new Date());
  }

  async getImages() {
    const rows = await ImageRepository.findAll();
    return rows.map(row => new Image(row.id, row.referencia, row.titulo, row.data_criacao));
  }

  async getImageById(id) {
    const row = await ImageRepository.findById(id);
    if (!row) return null;
    return new Image(row.id, row.referencia, row.titulo, row.data_criacao);
  }

  async updateImage(id, updateImageDTO) {
    const result = await ImageRepository.update(
      id,
      updateImageDTO.referencia,
      updateImageDTO.titulo
    );
    return result.affectedRows > 0;
  }

  async deleteImage(id) {
    const result = await ImageRepository.delete(id);
    return result.affectedRows > 0;
  }
}

module.exports = new ImageService();
