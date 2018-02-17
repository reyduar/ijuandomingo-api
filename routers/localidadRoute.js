'use stritc'

var express = require('express');
var localidadController = require('../controllers/localidadController');
var router = express.Router();

//Ruta para buscar por el id del localidad
router.get('/localidad/buscar/id/:id', localidadController.buscarPorId);

//Ruta para agregar localidad
router.post('/localidad/agregar', localidadController.agregar);

//Route para editar localidad
router.put('/localidad/editar/:id', localidadController.editar);

//Ruta para borrar localidad
router.delete('/localidad/borrar/:id', localidadController.borrar);

//ruta para listar localidad
router.get('/localidades', localidadController.listar);

//Ruta para buscar por el provincia del localidad
router.get('/localidad/buscar/provincia/:provincia', localidadController.buscarPorProvincia);

module.exports = router;
