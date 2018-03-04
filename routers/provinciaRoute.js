'use stritc'

var express = require('express');
var provinciaController = require('../controllers/provinciaController');
var router = express.Router();

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/isAdmin');

//Ruta para buscar por el id del provincia
router.get('/provincia/buscar/:id', md_auth.ensureAuth, provinciaController.buscarPorId);

//Ruta para agregar provincia
router.post('/provincia/agregar', md_auth.ensureAuth, provinciaController.agregar);

//Route para editar provincia
router.put('/provincia/editar/:id', md_auth.ensureAuth, provinciaController.editar);

//Ruta para borrar provincia
router.delete('/provincia/borrar/:id', [md_auth.ensureAuth, md_admin.isAdmin], provinciaController.borrar);

//ruta para listar provincia
router.get('/provincias', md_auth.ensureAuth, provinciaController.listar);

module.exports = router;
