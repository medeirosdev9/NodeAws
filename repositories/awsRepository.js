const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: '',
  secretAccessKey: ''
});

const s3 = new AWS.S3();

class AWSRepository {
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
    
    async uploadImagem(file) {
        try {
            const params = {
                Bucket: 'bucketmi74',
                Key: file.originalname,
                Body: file.buffer,
                ContentType: file.mimetype
            };

            const resultado = await s3.upload(params).promise();
            return { url: resultado.Location };
        } catch (error) {
            throw new Error("Erro ao fazer upload da imagem no S3: " + error.message);
        }
    }

    async downloadImagem(referencia) {
        try {
            const params = {
                Bucket: 'bucketmi74',
                Key: referencia
            };

            const data = await s3.getObject(params).promise();
            return data.Body; // Retorna o buffer do arquivo
        } catch (error) {
            throw new Error("Erro ao baixar imagem do S3: " + error.message);
        }
    }
}

module.exports = new AWSRepository();


