'use stritc'

var express = require('express');
var localidadController = require('../controllers/localidadController');
var router = express.Router();

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/isAdmin');

//Ruta para buscar por el id del localidad
router.get('/localidad/buscar/id/:id', md_auth.ensureAuth, localidadController.buscarPorId);

//Ruta para agregar localidad
router.post('/localidad/agregar', md_auth.ensureAuth, localidadController.agregar);

//Route para editar localidad
router.put('/localidad/editar/:id', md_auth.ensureAuth, localidadController.editar);

//Ruta para borrar localidad
router.delete('/localidad/borrar/:id', [md_auth.ensureAuth, md_admin.isAdmin], localidadController.borrar);

//ruta para listar localidad
router.get('/localidades', md_auth.ensureAuth, localidadController.listar);

//Ruta para buscar por el provincia del localidad
router.get('/localidad/buscar/provincia/:provincia', md_auth.ensureAuth, localidadController.buscarPorProvincia);

//Ruta para buscar localidad por nombre
router.get('/localidad/buscar/nombre/:nombre', md_auth.ensureAuth, localidadController.buscarPorNombre);

module.exports = router;
