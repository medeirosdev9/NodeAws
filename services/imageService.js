const ImageRepository = require('../repositories/imageRepository');
const Image = require('../models/imageModel');

class ImageService {
    async createNewImage(reference) {
        const newImage = new Image(reference);
        return await ImageRepository.createImage(newImage);
    }

    async listImages() {
        return await ImageRepository.listImages();
    }

    async getImageById(id) {
        return await ImageRepository.getImageById(id);
    }

    async updateImage(id, reference) {
        const updatedData = { reference };
        return await ImageRepository.updateImage(id, updatedData);
    }
}

module.exports = new ImageService();
