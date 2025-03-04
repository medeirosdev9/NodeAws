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
class AWSRepository {
    async uploadImagem(file, usuarioId) {
        try {
            const referencia = uuidv4() + "." + file.originalname.split('.').pop(); // Gera um UUID único com a extensão correta
            console.log("Referência gerada:", referencia); 
    
            const params = {
                Bucket: 'bucketmi74',
                Key: referencia, 
                Body: file.buffer, 
                ContentType: file.mimetype 
            };
    
            await s3.upload(params).promise();
            
            await UsuarioRepository.associarImagem(usuarioId, referencia); // Chama apenas aqui
    
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
            return data.Body;
        } catch (error) {
            throw new Error("Erro ao baixar imagem do S3: " + error.message);
        }
    }
}

module.exports = new AWSRepository();
