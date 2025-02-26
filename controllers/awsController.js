const AWSRepository = require('../repositories/awsRepository');
const UsuarioRepository = require('../repositories/usuarioRepository');
const mime = require('mime-types');

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
            console.log("📂 Arquivo recebido:", file.originalname);
            console.log("🆔 Usuário ID:", usuarioId);

            const referencia = await AWSRepository.uploadImagem(file, usuarioId);
            await UsuarioRepository.associarImagem(usuarioId, referencia);

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
    
            const fileBuffer = await AWSRepository.downloadImagem(referencia);
            const contentType = mime.lookup(referencia) || "application/octet-stream";
    
            res.setHeader("Content-Type", contentType);
            res.setHeader("Content-Disposition", `attachment; filename="${referencia}"`);
            res.status(200).send(fileBuffer);
        } catch (error) {
            console.error("Erro ao fazer download da imagem:", error);
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new AWSController();
