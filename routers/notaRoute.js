'use stritc'

var express = require('express');
var notaController = require('../controllers/notaController');
var router = express.Router();

//Ruta para agregar nota
router.post('/nota/agregar', notaController.agregar);

//Route para editar nota
router.put('/nota/editar/:id', notaController.editar);

//Ruta para borrar nota
router.delete('/nota/borrar/:id', notaController.borrar);

//ruta para listar notas
router.get('/notas/:periodo', notaController.listar);

//Ruta para buscar nota por el dni
router.get('/nota/buscar/alumno/:periodo/:alumno', notaController.buscarPorAlumno);

//Ruta para buscar por el dni y curso
router.get('/nota/buscar/alumno-curso/:periodo/:alumno/:curso', notaController.buscarPorAlumnoYCurso);

//Ruta para buscar por curso
router.get('/nota/buscar/curso/:curso', notaController.buscarPorCurso);

//Ruta para buscar nota por el id 
router.get('/nota/buscar/id/:id', notaController.buscarPorId);

module.exports = router;
