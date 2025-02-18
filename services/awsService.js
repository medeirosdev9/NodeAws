const AWSRepository = require('../repositories/awsRepository');

class ImagemService {
    async buscarImagem(referencia) {
        return await AWSRepository.buscarImagem(referencia);
    }
}

module.exports = new ImagemService();