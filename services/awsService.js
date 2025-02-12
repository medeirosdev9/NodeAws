const AWSRepository = require('../repositories/awsRepository')

class AwsService {

    async buscarImagem(referencia) {
        return await AWSRepository.buscarImagem(referencia);
    }
}

module.exports = new AwsService();