const AWSRepository = require('../repositories/awsRepository');
const path = require('path');
const fs = require('fs');

class ImagemService {
    async buscarImagem(referencia) {
        return await AWSRepository.buscarImagem(referencia);
    }

    async uploadImagem(file) {
        return await AWSRepository.uploadImagem(file);
    }

    async downloadImagem(referencia) {
        const fileData = await AWSRepository.downloadImagem(referencia);

        // Define o caminho onde o arquivo será salvo
        const downloadsPath = path.join(require('os').homedir(), 'Downloads');
        const filePath = path.join(downloadsPath, referencia);

        // Salva o arquivo na pasta Downloads
        fs.writeFileSync(filePath, fileData);

        console.log(`Arquivo salvo em: ${filePath}`);
        return filePath;
    }
}

module.exports = new ImagemService();
