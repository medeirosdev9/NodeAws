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
        // Baixa a imagem da AWS
        const fileData = await AWSRepository.downloadImagem(referencia);
        
        // Define o caminho para salvar no PC
        const downloadsPath = path.join(os.homedir(), 'Downloads');
        const filePath = path.join(downloadsPath, referencia);

        try {
            // Salva o arquivo no disco
            await fs.writeFile(filePath, fileData);
            console.log(`Arquivo salvo em: ${filePath}`);
            return filePath;
        } catch (error) {
            console.error(`Erro ao salvar o arquivo: ${error.message}`);
            throw new Error("Falha ao salvar o arquivo.");
        }
    }
}

module.exports = new ImagemService();
