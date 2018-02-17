'use stritc'

var express = require('express');
var asistenciaController = require('../controllers/asistenciaController');
var router = express.Router();

//Ruta para buscar por el id del asistencia
router.get('/asistencia/buscar/id/:id', asistenciaController.buscarPorId);

//Ruta para agregar asistencia
router.post('/asistencia/agregar', asistenciaController.agregar);

//Route para editar asistencia
router.patch('/asistencia/editar/:id', asistenciaController.editar);

//Ruta para borrar asistencia
router.delete('/asistencia/borrar/:id', asistenciaController.borrar);

//ruta para listar asistencia por periodo
router.get('/asistencias/:periodo', asistenciaController.listar);

//Ruta para buscar por el dni y curso
router.get('/asistencia/buscar/alumno-curso-fecha/:alumno/:curso/:fecha', asistenciaController.buscarPorAlumnoYCursoYFecha);

//Ruta para buscar por curso y fecha
router.get('/asistencia/buscar/curso-fecha/:curso/:fecha', asistenciaController.buscarPorCursoYFecha);

module.exports = router;