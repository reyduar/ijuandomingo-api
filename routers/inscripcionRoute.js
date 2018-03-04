'use stritc'

var express = require('express');
var inscripcionController = require('../controllers/inscripcionController');
var router = express.Router();

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/isAdmin');

//Ruta para agregar inscripcion
router.post('/inscripcion/agregar', md_auth.ensureAuth, inscripcionController.agregar);

//Route para editar inscripcion
router.put('/inscripcion/editar/:id', md_auth.ensureAuth, inscripcionController.editar);

//Ruta para borrar inscripcion
router.delete('/inscripcion/borrar/:id', [md_auth.ensureAuth, md_admin.isAdmin], inscripcionController.borrar);

//ruta para listar inscripcion
router.get('/inscripciones/buscar/lista/:periodo', md_auth.ensureAuth, inscripcionController.listar);

//Ruta para buscar por el dni del inscripcion
router.get('/inscripcion/buscar/alumno/:periodo/:alumno', md_auth.ensureAuth, inscripcionController.buscarPorAlumno);

//Ruta para buscar por el dni y curso
router.get('/inscripcion/buscar/alumno-curso/:alumno/:curso', md_auth.ensureAuth, inscripcionController.buscarPorAlumnoYCurso);

//Ruta para buscar por curso
router.get('/inscripcion/buscar/curso/:periodo', md_auth.ensureAuth, inscripcionController.buscarPorCurso);

//Ruta para buscar por periodo
router.get('/inscripciones/buscar/periodo/:periodo', md_auth.ensureAuth, inscripcionController.buscarPorPeriodo);

//Ruta para buscar por el estado de docuemento
router.get('/inscripcion/buscar/doc-pendientes/:periodo/docPendientes', md_auth.ensureAuth, inscripcionController.buscarPorEstadoc);

//Ruta para buscar por el id del inscripcion
router.get('/inscripcion/buscar/id/:id', md_auth.ensureAuth, inscripcionController.buscarPorId);

module.exports = router;
