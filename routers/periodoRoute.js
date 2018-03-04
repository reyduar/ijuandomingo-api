'use stritc'

var express = require('express');
var periodoController = require('../controllers/periodoController');
var router = express.Router();

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/isAdmin');

//Ruta para buscar por el id del periodo
router.get('/periodo/buscar/:id', md_auth.ensureAuth, periodoController.buscarPorId);

//Ruta para agregar periodo
router.post('/periodo/agregar', md_auth.ensureAuth, periodoController.agregar);

//Route para editar periodo
router.put('/periodo/editar/:id', md_auth.ensureAuth, periodoController.editar);

//Ruta para borrar periodo
router.delete('/periodo/borrar/:id', [md_auth.ensureAuth, md_admin.isAdmin], periodoController.borrar);

//ruta para listar periodo
router.get('/periodos', md_auth.ensureAuth, periodoController.listar);

//ruta para periodo activo
router.get('/periodo/activo', md_auth.ensureAuth, periodoController.activo);

module.exports = router;
