const AWSRepository = require('../repositories/awsRepository');
const UsuarioRepository = require('../repositories/usuarioRepository'); //Rotas, lida com HTTP, Regras de negocio, e comunicacao com o banco e s3
const mime = require('mime-types');
const awsService = require('../services/awsService');

class AWSController {
    async buscarImagem(req, res) {
        try {
            const { referencia } = req.params;
            if (!referencia) {
                return res.status(400).json({ error: "Referência da imagem é obrigatória." });
            }

            const result = await AWSRepository.buscarImagem(referencia);
            return res.json({ url: result });
        } catch (error) {
            console.error("Erro ao buscar imagem:", error);
            return res.status(500).json({ error: error.message });
        }
    }

    async uploadImagem(req, res) {
        const usuarioId = req.params.usuarioId;
        const file = req.file;
    
        if (!usuarioId || !file) {
            return res.status(400).json({ message: "Usuário ID e arquivo são obrigatórios!" });
        }
    
        try {
            console.log("Arquivo recebido:", file.originalname);
            console.log("Usuário ID:", usuarioId);
    
            const referencia = await AWSRepository.uploadImagem(file, usuarioId);
    
            return res.status(201).json({ message: "Imagem enviada com sucesso!", referencia });
        } catch (error) {
            console.error("Erro ao fazer upload no S3:", error);
            return res.status(500).json({ message: "Erro ao fazer upload da imagem no S3.", error: error.message });
        }
    }
    

    async downloadImagem(req, res) {
        try {
            const { referencia } = req.params;
            const filePath = await awsService.downloadImagem(referencia);
            res.status(200).json({ mensagem: 'Imagem baixada com sucesso', caminho: filePath });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}

module.exports = new AWSController();
