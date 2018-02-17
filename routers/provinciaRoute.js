'use stritc'

var express = require('express');
var provinciaController = require('../controllers/provinciaController');
var router = express.Router();

//Ruta para buscar por el id del provincia
router.get('/provincia/buscar/:id', provinciaController.buscarPorId);

//Ruta para agregar provincia
router.post('/provincia/agregar', provinciaController.agregar);

//Route para editar provincia
router.put('/provincia/editar/:id', provinciaController.editar);

//Ruta para borrar provincia
router.delete('/provincia/borrar/:id', provinciaController.borrar);

//ruta para listar provincia
router.get('/provincias', provinciaController.listar);

module.exports = router;
