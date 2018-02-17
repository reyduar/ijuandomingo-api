'use stritc'

var express = require("express");
var bodyParser = require('body-parser')
var app = express();

var docente_router = require('./routers/docenteRoute');
var alumno_router = require('./routers/alumnoRoute');
var asistencia_router = require('./routers/asistenciaRoute');
var curso_router = require('./routers/cursoRoute');
var inscripcion_router = require('./routers/inscripcionRoute');
var nota_router = require('./routers/notaRoute');
var usuario_router = require('./routers/usuarioRoute');
var nacionalidad_router = require('./routers/nacionalidadRoute');
var provincia_router = require('./routers/provinciaRoute');
var localidad_router = require('./routers/localidadRoute');
var periodo_router = require('./routers/periodoRoute');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Config HTTP HEAD (Cors, Method)
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT, PATCH');
	res.header('Allow', 'GET, POST, OPTIONS, DELETE, PUT, PATCH');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.use('/api', docente_router);
app.use('/api', alumno_router);
app.use('/api', asistencia_router);
app.use('/api', curso_router);
app.use('/api', inscripcion_router);
app.use('/api', usuario_router);
app.use('/api', nota_router);
app.use('/api', nacionalidad_router);
app.use('/api', provincia_router);
app.use('/api', localidad_router);
app.use('/api', periodo_router);

module.exports = app;
