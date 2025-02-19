const express = require('express')
const multer = require('multer');
const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const UsuarioController = require('../controllers/usuarioController');
const ImageController = require('../controllers/imageController');
const awsController = require('../controllers/awsController');

router.post('/usuarios', UsuarioController.create);
router.get('/usuarios', UsuarioController.getAll);
router.get('/usuarios/:id', UsuarioController.getById);
router.put('/usuarios/:id', UsuarioController.update);
router.delete('/usuarios/:id', UsuarioController.delete);

router.post('/imagem', ImageController.create);
router.get('/imagem', ImageController.getAll);
router.get('/imagem/:id', ImageController.getById);
router.put('/imagem/:id', ImageController.update);
router.delete('/imagem/:id', ImageController.delete);

router.get('/aws', awsController.buscarImagem)
router.post('/upload', upload.single('file'), awsController.uploadImagem);
router.get('/download', awsController.downloadImagem);

module.exports = router


