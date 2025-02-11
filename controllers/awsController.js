import { getAllaws } from "../services/awsService.js"

export const getAws = (_,res) => {
    getAllaws((err, data) =>{
        if (err) return res.status(500).json({message: "Erro. AWS não encontrada!", error: err});
        return res.status(200).json(data)
    });
};