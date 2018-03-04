'use stritc'

var express = require('express');
var cursoController = require('../controllers/cursoController');
var router = express.Router();

var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/isAdmin');

//Ruta para buscar por el id del curso
router.get('/curso/buscar/:id', md_auth.ensureAuth, cursoController.buscarPorId);

//Ruta para agregar curso
router.post('/curso/agregar', md_auth.ensureAuth, cursoController.agregar);

//Route para editar curso
router.put('/curso/editar/:id',md_auth.ensureAuth, cursoController.editar);

//Ruta para borrar curso
router.delete('/curso/borrar/:id', [md_auth.ensureAuth, md_admin.isAdmin], cursoController.borrar);

//ruta para listar curso
router.get('/cursos', md_auth.ensureAuth, cursoController.listar);

module.exports = router;
