'use stritc'

var Asistencia = require('../models/asistencia');


function agregar (req, res){
	var parametros = req.body;
	var asistencia = new Asistencia();
	asistencia.fecasis = parametros.fecasis;
	asistencia.estado = parametros.estado;
	asistencia.periodo = parametros.periodo._id;
	asistencia.alumno = parametros.alumno._id;
	asistencia.curso = parametros.curso._id;
	asistencia.save((err, asistenciaGuardado) => {
		if(err){
			res.status(500).send({message: "Error al guardar asistencia"});
		}else{
			res.status(200).send({message: "Asistencia guardada", asistencia: asistenciaGuardado});
		}
	});
}

function editar (req, res){
	var id = req.params.id;
	var parametros = req.body;
	Asistencia.findByIdAndUpdate(id, parametros, (err, asistenciaEditado) => {
		if(err){
			res.status(500).send({message: "Error al editar asistencia", asistenciaId: id});
		}else{
			res.status(200).send({message: "Exito al editar asistencia", asistencia: asistenciaEditado});
		}
	});
}

function borrar (req, res){
	var id = req.params.id;
	Asistencia.findById(id, (err, asistenciaABorrar) => {
		if(err){
			res.status(500).send({message: "Error al encontrar la asistencia", asistenciaId: id});
		}
		if(!asistenciaABorrar){
			res.status(404).send({message: "asistencia no encontrada"});
		}else{
			asistenciaABorrar.remove(err => {
				if(err){
					res.status(500).send({message: "Error al borrar la asistencia", asistenciaId: id});
				}else{
					res.status(200).send({message: "Exito al borrar", asistencia: asistenciaABorrar});
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

	Asistencia.paginate(query, options, function(err, asistencias) {
		if(err){
			res.status(500).send({message: "Error al listar asistencias"});
		}else{
			if(!asistencias){
				res.status(404).send({message: "Asistencias no encontradas"});
			}else{
				res.status(200).send({asistencias: asistencias.docs});
			}
		}
	});
}

function buscarPorId (req, res){
	var id = req.params.id;
	Asistencia.findById(id, (err, asistencia) => {
		if(err){
			res.status(500).send({message: "Error al encontrar asistencia", _id: id});
		}else{
			if(!asistencia){
				res.status(404).send({message: "No encontrado"});
			}else{
				res.status(200).send({asistencia: asistencia});
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
			res.status(500).send({message: "Error al obtener la asistencia", _id: id});
		}else{
			if(!inscripcion){
				res.status(404).send({message: "No encontrado"});
			}else{
				res.status(200).send({inscripcion: inscripcion});
			}
		}
	});
}

function buscarPorAlumnoYCursoYFecha (req, res){
	var alumno = req.params.alumno;
	var curso = req.params.curso;
	var fecha = req.params.fecha;
	Asistencia.find({ alumno: alumno._id, curso: curso._id, fecasis: fecha })
	.populate({ path: 'alumno' })
	.populate({ path: 'curso' })
	.exec((err, asistencias) => {
		if(err){
			res.status(500).send({message: "Error al buscar asistencia por fecha, alumno y curso"});
		}else{
			if(!asistencias){
				res.status(404).send({message: "Asistencia no encontrada"});
			}else{
				res.status(200).send({asistencias: asistencias});
			}
		}
	});
}

function buscarPorCursoYFecha (req, res){
	var curso = req.params.curso;
	var fecha = req.params.fecha;
	Asistencia.find({ curso: curso._id, fecasis: fecha })
	.populate({ path: 'alumno' })
	.populate({ path: 'curso' })
	.sort('alumno').exec((err, asistencias) => {
		if(err){
			res.status(500).send({message: "Error al encontrar asistencias"});
		}else{
			if(!asistencias){
				res.status(404).send({message: "Asistencia no encontrada"});
			}else{
				res.status(200).send({asistencias: asistencias});
			}
		}
	});
}

module.exports = {
	agregar,
	editar,
	borrar,
	listar,
	buscarPorId,
	buscarPorAlumnoYCursoYFecha,
	buscarPorCursoYFecha
}
