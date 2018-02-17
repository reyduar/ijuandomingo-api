'use stritc'

var express = require('express');
var usuarioController = require('../controllers/usuarioController');
var router = express.Router();

//Ruta para buscar por el id del usuario
router.get('/usuario/buscar/id/:id', usuarioController.buscarPorId);

//Ruta para buscar por el nombre del usuario
router.get('/usuario/buscar/usuario/:username', usuarioController.buscarPorNombre);

//Ruta para agregar usuario
router.post('/usuario/agregar', usuarioController.agregar);

//Route para editar usuario
router.put('/usuario/editar/:id', usuarioController.editar);

//Ruta para borrar usuario
router.delete('/usuario/borrar/:id', usuarioController.borrar);

//ruta para listar usuario
router.get('/usuarios', usuarioController.listar);

module.exports = router;
