const express = require('express');
const ImageController = require('../controllers/imageController');
const router = express.Router();

router.post('/', ImageController.create);
router.get('/', ImageController.getAll);
router.get('/:id', ImageController.getById);
router.put('/:id', ImageController.update);
router.delete('/:id', ImageController.delete);

module.exports = router;
