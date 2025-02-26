const database = require('db.js');

class ImagemRepository {
    async createImage(image) {
        try {
            await database('imagem').insert(image);
            return { message: "Imagem criada com sucesso" };
        } catch (error) {
            throw new Error("Erro ao inserir imagem no banco de dados");
        }
    }

    async listImages() {
        try {
            const imagens = await database('imagem').select("*");
            return { imagens };
        } catch (error) {
            throw new Error("Erro ao listar as imagens");
        }
    }

    async getImageById(id) {
        try {
            const imagem = await database('imagem').select("*").where({ id: id.id });
            return { imagem };
        } catch (error) {
            throw new Error("Erro ao buscar a imagem");
        }
    }
    
    async updateImage(id, data) {
        try {
            const resultado = await database('imagem')
                .where({ id })
                .update(data);
    
            if (resultado === 0) {
                throw new Error("Imagem não encontrada");
            }
    
            return { message: "Imagem atualizada com sucesso" };
        } catch (error) {
            throw new Error("Erro ao atualizar a imagem");
        }
    }

    async deleteImage(id) {
        try {
            const resultado = await database('imagem')
                .where({ id })
                .del();
    
            if (resultado === 0) {
                throw new Error("Imagem não encontrada");
            }
    
            return { message: "Imagem deletada com sucesso" };
        } catch (error) {
            throw new Error("Erro ao deletar a imagem");
        }
    }
}

module.exports = new ImagemRepository();
