const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const UsuarioController = require('../controllers/usuarioController');
const awsController = require('../controllers/awsController');

// Rotas para usuários
router.post('/usuarios', UsuarioController.create);
router.get('/usuarios', UsuarioController.getAll);
router.get('/usuarios/:id', UsuarioController.getById);
router.put('/usuarios/:id', UsuarioController.update);
router.delete('/usuarios/:id', UsuarioController.delete);

// Rotas para imagens no AWS S3
router.get('/aws/imagem/:referencia', awsController.buscarImagem);
router.post('/aws/upload/:usuarioId', upload.single('file'), awsController.uploadImagem);
router.get('/aws/download/:referencia', awsController.downloadImagem);



module.exports = router;
