const AWSRepository = require('../repositories/awsRepository');
const path = require('path');
const fs = require('fs').promises;
const os = require('os');

class ImagemService {
    async buscarImagem(referencia) {
        // Busca a imagem na AWS pelo nome
        return AWSRepository.buscarImagem(referencia);
    }

    async uploadImagem(file) {
        // Faz upload da imagem para a AWS
        return AWSRepository.uploadImagem(file);
    }

    async downloadImagem(referencia) {
        const fileData = await AWSRepository.downloadImagem(referencia);

        const downloadsPath = path.join(require('os').homedir(), 'Downloads');
        const filePath = path.join(downloadsPath, referencia);

        await fs.writeFile(filePath, fileData);

        return filePath;
    }
}

module.exports = new ImagemService();
