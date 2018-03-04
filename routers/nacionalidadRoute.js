'use stritc'

var express = require('express');
var nacionalidadController = require('../controllers/nacionalidadController');
var router = express.Router();

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/isAdmin');

//Ruta para buscar por el id del nacionalidad
router.get('/nacionalidad/buscar/:id', md_auth.ensureAuth, nacionalidadController.buscarPorId);

//Ruta para agregar nacionalidad
router.post('/nacionalidad/agregar', md_auth.ensureAuth, nacionalidadController.agregar);

//Route para editar nacionalidad
router.put('/nacionalidad/editar/:id', md_auth.ensureAuth, nacionalidadController.editar);

//Ruta para borrar nacionalidad
router.delete('/nacionalidad/borrar/:id', [md_auth.ensureAuth, md_admin.isAdmin], nacionalidadController.borrar);

//ruta para listar nacionalidad
router.get('/nacionalidades', md_auth.ensureAuth, nacionalidadController.listar);

module.exports = router;
