'use stritc'

var express = require('express');
var inscripcionController = require('../controllers/inscripcionController');
var router = express.Router();

//Ruta para agregar inscripcion
router.post('/inscripcion/agregar', inscripcionController.agregar);

//Route para editar inscripcion
router.put('/inscripcion/editar/:id', inscripcionController.editar);

//Ruta para borrar inscripcion
router.delete('/inscripcion/borrar/:id', inscripcionController.borrar);

//ruta para listar inscripcion
router.get('/inscripciones/:periodo', inscripcionController.listar);

//Ruta para buscar por el dni del inscripcion
router.get('/inscripcion/buscar/alumno/:alumno', inscripcionController.buscarPorAlumno);

//Ruta para buscar por el dni y curso
router.get('/inscripcion/buscar/alumno-curso/:alumno/:curso', inscripcionController.buscarPorAlumnoYCurso);

//Ruta para buscar por curso
router.get('/inscripcion/buscar/curso/:periodo', inscripcionController.buscarPorCurso);

//Ruta para buscar por el estado de docuemento
router.get('/inscripcion/buscar/doc-pendientes/:periodo/docPendientes', inscripcionController.buscarPorEstadoc);

//Ruta para buscar por el id del inscripcion
router.get('/inscripcion/buscar/id/:id', inscripcionController.buscarPorId);

module.exports = router;
