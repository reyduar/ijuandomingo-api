'use stritc'

var express = require('express');
var asistenciaController = require('../controllers/asistenciaController');
var router = express.Router();

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/isAdmin');

//Ruta para buscar por el id del asistencia
router.get('/asistencia/buscar/id/:id',md_auth.ensureAuth, asistenciaController.buscarPorId);

//Ruta para agregar asistencia
router.post('/asistencia/agregar', md_auth.ensureAuth, asistenciaController.agregar);

//Route para editar asistencia
router.patch('/asistencia/editar/:id', md_auth.ensureAuth, asistenciaController.editar);

//Ruta para borrar asistencia
router.delete('/asistencia/borrar/:id', [md_auth.ensureAuth, md_admin.isAdmin], asistenciaController.borrar);

//ruta para listar asistencia por periodo
router.get('/asistencias/:periodo', md_auth.ensureAuth, asistenciaController.listar);

//Ruta para buscar por el dni y curso
router.get('/asistencia/buscar/alumno-curso-fecha/:alumno/:curso/:fecha', md_auth.ensureAuth, asistenciaController.buscarPorAlumnoYCursoYFecha);

//Ruta para buscar por curso y fecha
router.get('/asistencias/buscar/lista/:periodo', md_auth.ensureAuth, asistenciaController.buscarPorFecha);

module.exports = router;