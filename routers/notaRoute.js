'use stritc'

var express = require('express');
var notaController = require('../controllers/notaController');
var router = express.Router();

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/isAdmin');

//Ruta para agregar nota
router.post('/nota/agregar', md_auth.ensureAuth, notaController.agregar);

//Route para editar nota
router.put('/nota/editar/:id', md_auth.ensureAuth, notaController.editar);

//Ruta para borrar nota
router.delete('/nota/borrar/:id', [md_auth.ensureAuth, md_admin.isAdmin], notaController.borrar);

//ruta para listar notas
router.get('/notas/buscar/lista/:periodo', md_auth.ensureAuth, notaController.listar);

//Ruta para buscar nota por el dni
router.get('/notas/buscar/alumno/:periodo/:alumno', md_auth.ensureAuth, notaController.buscarPorAlumno);

//Ruta para buscar por el dni y curso
router.get('/nota/buscar/alumno-curso/:periodo/:alumno/:curso', md_auth.ensureAuth, notaController.buscarPorAlumnoYCurso);

//Ruta para buscar por curso
router.get('/notas/buscar/query/:periodo', md_auth.ensureAuth, notaController.buscarPorQuery);

//Ruta para buscar nota por el id 
router.get('/nota/buscar/id/:id', md_auth.ensureAuth, notaController.buscarPorId);

module.exports = router;
