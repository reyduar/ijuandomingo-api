'use stritc'

var Inscripcion = require('../models/inscripcion');
var mongoose = require('mongoose');

function agregar (req, res){
	var parametros = req.body;
	var inscripcion = new Inscripcion();
	inscripcion.fecinsc = parametros.fecinsc;
	inscripcion.estadoc = parametros.estadoc;
	inscripcion.estado = parametros.estado;
	inscripcion.periodo = parametros.periodo._id;
	inscripcion.alumno = parametros.alumno._id;
	inscripcion.curso = parametros.curso._id;
	inscripcion.save((err, inscripcionGuardado) => {
		if(err){
			res.status(500).send({message: "Error al guardar inscripción"});
		}else{
			res.status(200).send({message: "Datos de la inscripcion guardado", inscripcion: inscripcionGuardado});
		}
	});
}

function editar (req, res){
	var id = req.params.id;
	var parametros = req.body;
	Inscripcion.findByIdAndUpdate(id, parametros, (err, inscripcionEditado) => {
		if(err){
			res.status(500).send({message: "Error al editar curso", inscripcionId: id});
		}else{
			res.status(200).send({message: "Exito al editar curso", inscripcion: inscripcionEditado});
		}
	});
}

function borrar (req, res){
	var id = req.params.id;
	Inscripcion.findById(id, (err, inscripcionABorrar) => {
		if(err){
			res.status(500).send({message: "Error al encontrar la inscripcion", inscripcionId: id});
		}
		if(!inscripcionABorrar){
			res.status(404).send({message: "Inscripcion no encontrada"});
		}else{
			inscripcionABorrar.remove(err => {
				if(err){
					res.status(500).send({message: "Error al borrar la inscripcion", inscripcionId: id});
				}else{
					res.status(200).send({message: "Exito al borrar", inscripcion: inscripcionABorrar});
				}
			});
		}
	});

}

function listar (req, res){
	var periodo = req.params.periodo;
	var page = Number(req.query.page);
	var size = Number(req.query.size);
	var sort = req.query.sort;
	var query = { periodo: periodo };
	var options = {
	  sort: { curso: sort || 'desc' },
	  populate: [{ path: 'alumno', select: 'nombre apellido dni localidad' }, { path: 'curso' }],
	  lean: false,
	  page: page || 1, 
	  limit: size || 50
	};

	Inscripcion.paginate(query, options, function(err, inscripciones) {
		if(err){
			res.status(500).send({message: "Error al obtener las inscripciones"});
		}else{
			if(!inscripciones){
				res.status(404).send({message: "No encontrado"});
			}else{
				res.status(200).send({inscripciones: inscripciones.docs});
			}
		}
	});
}

function buscarPorAlumno (req, res){
	var periodo = req.params.periodo;
	var alumno = req.params.alumno;
	Inscripcion.find({ periodo: periodo._id, alumno: alumno._id, estado: true })
	.populate({ path: 'alumno' })
	.populate({ path: 'curso' })
	.sort('curso').exec((err, resultadoInscripcion) => {
		if(err){
			res.status(500).send({message: "Error del servidor"});
		}else{
			if(!resultadoInscripcion){
				res.status(404).send({message: "Las inscripciones no para este Dni no fueron encontradas", dni: dni});
			}else{
				res.status(200).send({resultadoInscripcion: resultadoInscripcion});
			}
		}
	});
}

function buscarPorAlumnoYCurso (req, res){
	var periodo = req.params.periodo;
	var alumno = req.params.alumno;
	var curso = req.params.curso;
	Inscripcion.find({ periodo: periodo._id, alumno: alumno._id, curso: curso._id, estado: true })
	.populate({ path: 'alumno' })
	.populate({ path: 'curso' })
	.sort('curso').exec((err, inscripcion) => {
		if(err){
			res.status(500).send({message: "Error del servidor"});
		}else{
			if(!inscripcion){
				res.status(404).send({message: "No encontrado"});
			}else{
				res.status(200).send({inscripcion: inscripcion});
			}
		}
	});
}

function buscarPorCurso (req, res){
	var periodo = req.params.periodo;
	var curso = req.query.curso;
	var page = Number(req.query.page);
	var size = Number(req.query.size);
	var sort = req.query.sort;
	var query = { periodo: periodo, curso: curso };
	var options = {
	  sort: { curso: sort || 'desc' },
	  populate: [{ path: 'alumno', select: 'nombre apellido dni localidad' }, { path: 'curso' }],
	  lean: false,
	  page: page || 1, 
	  limit: size || 50
	};

	Inscripcion.paginate(query, options, function(err, inscripciones) {
		if(err){
			res.status(500).send({message: "Error al obtener las inscripciones "+ err});
		}else{
			if(!inscripciones){
				res.status(404).send({message: "No encontrado"});
			}else{
				res.status(200).send({inscripciones: inscripciones.docs});
			}
		}
	});
}

function buscarPorEstadoc (req, res){
	var periodo = req.params.periodo;
	Inscripcion.find({ periodo: periodo._id, estadoc: false, estado: true })
	.populate({ path: 'periodo', select: "nombre" })
	.populate({ path: 'alumno' })
	.populate({ path: 'curso' })
	.sort('alumno').exec((err, estadoDocumentos) => {
		if(err){
			res.status(500).send({message: "Error del servidor"});
		}else{
			if(!estadoDocumentos){
				res.status(404).send({message: "No encontrado"});
			}else{
				res.status(200).send({estados: estadoDocumentos});
			}
		}
	});
}

function buscarPorId (req, res){
	var id = req.params.id;
	Inscripcion.findOne({id: id})
	.populate({ path: 'periodo' })
	.populate({ path: 'alumno' })
	.populate({ path: 'curso' })
	.exec((err, inscripcion) => {
		if(err){
			res.status(500).send({message: "Error al obtener la inscripcion", _id: id});
		}else{
			if(!inscripcion){
				res.status(404).send({message: "No encontrado"});
			}else{
				res.status(200).send({inscripcion: inscripcion});
			}
		}
	});
}

module.exports = {
	agregar,
	editar,
	borrar,
	listar,
	buscarPorAlumno,
	buscarPorAlumnoYCurso,
	buscarPorId,
	buscarPorEstadoc,
	buscarPorCurso
}
