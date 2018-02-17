'use stritc'

var express = require('express');
var cursoController = require('../controllers/cursoController');
var router = express.Router();

//Ruta para buscar por el id del curso
router.get('/curso/buscar/:id', cursoController.buscarPorId);

//Ruta para agregar curso
router.post('/curso/agregar', cursoController.agregar);

//Route para editar curso
router.put('/curso/editar/:id', cursoController.editar);

//Ruta para borrar curso
router.delete('/curso/borrar/:id', cursoController.borrar);

//ruta para listar curso
router.get('/cursos', cursoController.listar);

module.exports = router;
