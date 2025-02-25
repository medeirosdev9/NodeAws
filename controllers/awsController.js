const AWSService = require('../services/awsService');

class AWSController {
    async buscarImagem(req, res, next) {
        try {
            const { referencia } = req.body;
            if (!referencia) throw new Error("A referência da imagem é obrigatória.");

            // Chama o serviço para buscar a imagem
            const resultado = await AWSService.buscarImagem(referencia);
            res.json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async uploadImagem(req, res, next) {
        try {
            if (!req.file) throw new Error("Nenhum arquivo enviado.");

            // Chama o serviço para fazer o upload da imagem
            const resultado = await AWSService.uploadImagem(req.file);
            res.json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async downloadImagem(req, res, next) {
        try {
            const { referencia } = req.body;
            if (!referencia) throw new Error("A referência da imagem é obrigatória.");

            // Baixa a imagem e envia para o usuário
            const filePath = await AWSService.downloadImagem(referencia);
            res.download(filePath, (err) => {
                if (err) {
                    console.error("Erro ao enviar o arquivo:", err);
                    res.status(500).json({ error: "Erro ao enviar o arquivo." });
                }
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AWSController();
