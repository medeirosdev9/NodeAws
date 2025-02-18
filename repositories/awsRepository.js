const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'AKIA5RRHCKYZZ7ADAU6V',
  secretAccessKey: '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'
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
}

module.exports = new AWSRepository();   