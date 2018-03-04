'use stritc'

var express = require('express');
var usuarioController = require('../controllers/usuarioController');
var router = express.Router();

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/isAdmin');

//Ruta para buscar por el id del usuario
router.get('/usuario/buscar/id/:id', md_auth.ensureAuth, usuarioController.buscarPorId);

//Ruta para buscar por el nombre del usuario
router.get('/usuario/buscar/usuario/:username', usuarioController.buscarPorNombre);

//Ruta para agregar usuario
router.post('/usuario/agregar', usuarioController.agregar);

//Route para editar usuario
router.put('/usuario/editar/:id', md_auth.ensureAuth, usuarioController.editar);

//Ruta para borrar usuario
router.delete('/usuario/borrar/:id', [md_auth.ensureAuth, md_admin.isAdmin], usuarioController.borrar);

//ruta para listar usuario
router.get('/usuarios/lista', md_auth.ensureAuth, usuarioController.listar);

//ruta para login de usuario
router.post('/login', usuarioController.login);

module.exports = router;
