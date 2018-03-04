'use stritc'

var express = require('express');
var alumnoController = require('../controllers/alumnoController');
var router = express.Router();

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/isAdmin');

//Ruta para buscar por el id del alumno
router.get('/alumno/buscar/id/:id', md_auth.ensureAuth, alumnoController.buscarPorId);

//Ruta para agregar alumno
router.post('/alumno/agregar', md_auth.ensureAuth, alumnoController.agregar);

//Route para editar alumno
router.put('/alumno/editar/:id', md_auth.ensureAuth, alumnoController.editar);

//Ruta para borrar alumno
router.delete('/alumno/borrar/:id', [md_auth.ensureAuth, md_admin.isAdmin], alumnoController.borrar);

//ruta para listar alumno
router.get('/alumnos', md_auth.ensureAuth, alumnoController.listar);

//Ruta para buscar por dni
router.get('/alumno/buscar/dni/:dni', md_auth.ensureAuth, alumnoController.buscarPorDni);

module.exports = router;
