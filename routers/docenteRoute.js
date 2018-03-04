'use stritc'

var express = require('express');
var docenteController = require('../controllers/docenteController');
var router = express.Router();

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/isAdmin');

//Ruta para buscar por el id del docente
router.get('/docentes/buscar/id/:id', md_auth.ensureAuth, docenteController.buscarPorId);

//Ruta para agregar docente
router.post('/docente/agregar', md_auth.ensureAuth, docenteController.agregar);

//Route para editar docente
router.put('/docente/editar/:id', md_auth.ensureAuth, docenteController.editar);

//Ruta para borrar docente
router.delete('/docente/borrar/:id', [md_auth.ensureAuth, md_admin.isAdmin], docenteController.borrar);

//ruta para listar docente
router.get('/docentes', md_auth.ensureAuth, docenteController.listar);

//Ruta para buscar por dni
router.get('/docentes/buscar/dni/:dni', md_auth.ensureAuth, docenteController.buscarPorDni);

module.exports = router;
