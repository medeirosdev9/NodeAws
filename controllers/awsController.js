const AWSService = require('../services/awsService')


class AWSController {
    async buscarImagem(req, res) {
        try {
            const { referencia } = req.body;
            if (!referencia) {
                return res.status(400).json({ error: "A referência da imagem é obrigatória." });
            }
            const resultado = await AWSService.buscarImagem(referencia);
            res.json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new AWSController();