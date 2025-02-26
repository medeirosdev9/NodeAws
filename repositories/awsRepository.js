const AWS = require('aws-sdk');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const UsuarioRepository = require('./usuarioRepository');


AWS.config.update({
  region: 'us-east-1',
  accessKeyId: '',
  secretAccessKey: '',
});

const s3 = new AWS.S3();

// Função para gerar um UUID
function gerarUUID() {
    return crypto.randomUUID(); 
}

class AWSRepository {
    async uploadImagem(file, usuarioId) {
        try {
            const referencia = uuidv4(); // Gera um UUID único para a imagem
            console.log("Referência gerada:", referencia); // Verifica se está sendo gerado corretamente
            
            const params = {
                Bucket: 'bucketmi74',
                Key: referencia, 
                Body: file.buffer, 
                ContentType: file.mimetype 
            };
    
            await s3.upload(params).promise();
            
            // Certifique-se de passar os parâmetros corretamente
            await UsuarioRepository.associarImagem(usuarioId, referencia);
    
            return referencia;
        } catch (error) {
            throw new Error("Erro ao fazer upload da imagem no S3: " + error.message);
        }
    }
    

    async buscarImagem(referencia) {
        try {
            const params = {
                Bucket: 'bucketmi74',
                Key: referencia
            };

            const url = s3.getSignedUrl('getObject', params); 
            return { url };
        } catch (error) {
            throw new Error("Erro ao buscar imagem no S3: " + error.message);
        }
    }

    async downloadImagem(referencia) {
        try {
            const params = {
                Bucket: 'bucketmi74',
                Key: referencia
            };

            const data = await s3.getObject(params).promise();

            return {
                Body: data.Body,  
                ContentType: data.ContentType || 'application/octet-stream'
            };
        } catch (error) {
            throw new Error("Erro ao baixar imagem do S3: " + error.message);
        }
    }
}

module.exports = new AWSRepository();
