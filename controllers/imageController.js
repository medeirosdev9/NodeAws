const AWSService = require('../services/awsService');

class AWSController {
    async uploadImagem(req, res) {
        try {
            const { usuarioId } = req.params;
            const { file } = req;

            if (!usuarioId || !file) {
                return res.status(400).json({ message: "Usuário ID e arquivo são obrigatórios!" });
            }

            console.log("📂 Arquivo recebido:", file.originalname);
            console.log("🆔 Usuário ID:", usuarioId);

            const referencia = await AWSService.uploadImagem(file, usuarioId);

            return res.status(201).json({ message: "Imagem enviada com sucesso!", referencia });
        } catch (error) {
            console.error("❌ Erro ao fazer upload no S3:", error);
            return res.status(500).json({ message: "Erro ao fazer upload da imagem no S3.", error: error.message });
        }
    }

    async downloadImagem(req, res) {
        try {
            const { referencia } = req.params;

            if (!referencia) {
                return res.status(400).json({ error: "Referência da imagem é obrigatória." });
            }

            const filePath = await AWSService.downloadImagem(referencia);
            
            return res.status(200).json({ message: 'Imagem baixada com sucesso', caminho: filePath });
        } catch (error) {
            console.error("Erro ao fazer download da imagem:", error);
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new AWSController();
