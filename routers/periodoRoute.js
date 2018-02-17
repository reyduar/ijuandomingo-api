'use stritc'

var express = require('express');
var periodoController = require('../controllers/periodoController');
var router = express.Router();

//Ruta para buscar por el id del periodo
router.get('/periodo/buscar/:id', periodoController.buscarPorId);

//Ruta para agregar periodo
router.post('/periodo/agregar', periodoController.agregar);

//Route para editar periodo
router.put('/periodo/editar/:id', periodoController.editar);

//Ruta para borrar periodo
router.delete('/periodo/borrar/:id', periodoController.borrar);

//ruta para listar periodo
router.get('/periodos', periodoController.listar);

//ruta para periodo activo
router.get('/periodo/activo', periodoController.activo);

module.exports = router;
