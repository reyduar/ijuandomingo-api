'use stritc'

var express = require('express');
var alumnoController = require('../controllers/alumnoController');
var router = express.Router();

//Ruta para buscar por el id del alumno
router.get('/alumno/buscar/id/:id', alumnoController.buscarPorId);

//Ruta para agregar alumno
router.post('/alumno/agregar', alumnoController.agregar);

//Route para editar alumno
router.put('/alumno/editar/:id', alumnoController.editar);

//Ruta para borrar alumno
router.delete('/alumno/borrar/:id', alumnoController.borrar);

//ruta para listar alumno
router.get('/alumnos', alumnoController.listar);

//Ruta para buscar por dni
router.get('/alumno/buscar/dni/:dni', alumnoController.buscarPorDni);

module.exports = router;
