'use stritc'

var express = require('express');
var nacionalidadController = require('../controllers/nacionalidadController');
var router = express.Router();

//Ruta para buscar por el id del nacionalidad
router.get('/nacionalidad/buscar/:id', nacionalidadController.buscarPorId);

//Ruta para agregar nacionalidad
router.post('/nacionalidad/agregar', nacionalidadController.agregar);

//Route para editar nacionalidad
router.put('/nacionalidad/editar/:id', nacionalidadController.editar);

//Ruta para borrar nacionalidad
router.delete('/nacionalidad/borrar/:id', nacionalidadController.borrar);

//ruta para listar nacionalidad
router.get('/nacionalidades', nacionalidadController.listar);

module.exports = router;
