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
	inscripcion.provincia = parametros.provincia._id;
	inscripcion.localidad = parametros.localidad._id;
	Inscripcion.find({ alumno: inscripcion.alumno, curso: inscripcion.curso, periodo: inscripcion.periodo }).exec((err, existe) => {
		if (err) {
			console.log("Error al verificar si existen duplicados.");
		} else {
			console.log(existe);
			if (existe.length == 0) {
				inscripcion.save((err, inscripcionGuardado) => {
					if (err) {
						res.status(500).send({ message: "Error al guardar la inscripción." });
					} else {
						res.status(200).send({ message: "Inscripcion guardada con éxito.", inscripcion: inscripcionGuardado });
					}
				});
			} else {
				res.status(409).send({ message: "Este alumno se encuentra inscripto en este curso." });
			}
		}
	});	
}

function editar (req, res){
	var id = req.params.id;
	var parametros = req.body;
	Inscripcion.findByIdAndUpdate(id, parametros, (err, inscripcionEditado) => {
		if(err){
			res.status(500).send({message: "Error al editar la inscripción.", inscripcionId: id});
		}else{
			res.status(200).send({message: "Inscripción editada con éxito.", inscripcion: inscripcionEditado});
		}
	});
}

function borrar (req, res){
	var id = req.params.id;
	Inscripcion.findById(id, (err, inscripcionABorrar) => {
		if(err){
			res.status(500).send({message: "Error al borrar la inscripción.", inscripcionId: id});
		}
		if(!inscripcionABorrar){
			res.status(404).send({message: "Inscripción no encontrada."});
		}else{
			inscripcionABorrar.remove(err => {
				if(err){
					res.status(500).send({message: "Error al borrar la inscripción.", inscripcionId: id});
				}else{
					res.status(200).send({message: "Inscripción borrada con éxito.", inscripcion: inscripcionABorrar});
				}
			});
		}
	});

}

function buscarPorPeriodo (req, res){
	var periodo = req.params.periodo;
	var page = Number(req.query.page);
	var size = Number(req.query.size);
	var sort = req.query.sort;
	var query = { periodo: periodo };
	var options = {
	  sort: { fecinsc: sort || 'desc' },
	  populate: [{ path: 'alumno', select: 'nombre apellido dni' }, { path: 'curso' }, { path: 'localidad' }, { path: 'provincia' }, { path: 'periodo' }],
	  lean: false,
	  page: page || 1, 
	  limit: size || 10
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

function listar (req, res){
	var periodo = req.params.periodo;
	var curso = req.query.curso;
	var provincia = req.query.provincia;
	var localidad = req.query.localidad;
	var page = Number(req.query.page);
	var size = Number(req.query.size);
	var sort = req.query.sort;
	var query = { periodo: periodo, curso: curso,  provincia: provincia, localidad: localidad };
	var options = {
	  sort: { curso: sort || 'asc' },
	  populate: [{ path: 'alumno', select: '_id nombre apellido dni' }, { path: 'curso' }, { path: 'localidad' }, { path: 'provincia' }, { path: 'periodo' }],
	  lean: false,
	  page: page || 1, 
	  limit: size || 1000
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
	Inscripcion.find({ periodo: periodo, alumno: alumno })
	.populate({ path: 'alumno', select: '_id nombre apellido dni' })
	.populate({ path: 'curso' })
	.populate({ path: 'localidad' })
	.populate({ path: 'provincia' })
	.populate({ path: 'periodo' })
	.sort('curso').exec((err, resultadoInscripcion) => {
		if(err){
			res.status(500).send({message: "Error al buscar la inscripción del alumno."});
		}else{
			if(!resultadoInscripcion){
				res.status(404).send({message: "Este alumno no se encuentra inscripto en este periodo"});
			}else{
				res.status(200).send({alumnoInscripciones: resultadoInscripcion});
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
	  limit: size || 100
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
	buscarPorCurso,
	buscarPorPeriodo
}
