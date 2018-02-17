'use stritc'

var express = require('express');
var docenteController = require('../controllers/docenteController');
var router = express.Router();

//Ruta para buscar por el id del docente
router.get('/docentes/buscar/id/:id', docenteController.buscarPorId);

//Ruta para agregar docente
router.post('/docente/agregar', docenteController.agregar);

//Route para editar docente
router.put('/docente/editar/:id', docenteController.editar);

//Ruta para borrar docente
router.delete('/docente/borrar/:id', docenteController.borrar);

//ruta para listar docente
router.get('/docentes', docenteController.listar);

//Ruta para buscar por dni
router.get('/docentes/buscar/dni/:dni', docenteController.buscarPorDni);

module.exports = router;
