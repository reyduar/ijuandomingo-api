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
	asistencia.provincia = parametros.provincia._id;
	asistencia.localidad = parametros.localidad._id;

	Asistencia.find({ localidad: asistencia.localidad, curso: asistencia.curso, periodo: asistencia.periodo, fecasis: asistencia.fecasis}).exec((err, existe) => {
		if (err) {
			console.log("Error al verificar si existen duplicados.");
		} else {
			console.log(existe);
			if (existe.length == 0) {
				asistencia.save((err, asistenciaGuardado) => {
					if(err){
						res.status(500).send({message: "Ocurrio un error cuando se estaba creando la lista de asistencia."});
					}else{
						res.status(200).send({message: "La lista de asistencia fue creada con éxito.", asistencia: asistenciaGuardado});
					}
				});
			} else {
				res.status(409).send({ message: "Ya existe una lista de asistencia para este dia con esos datos." });
			}
		}
	});	
}

function editar (req, res){
	var id = req.params.id;
	var parametros = req.body;
	Asistencia.findByIdAndUpdate(id, parametros, (err, asistenciaEditado) => {
		if(err){
			res.status(500).send({message: "Error al actualizar los datos de la lista de asistencia.", asistenciaId: id});
		}else{
			res.status(200).send({message: "La lista fue actualizada con éxito.", asistencia: asistenciaEditado});
		}
	});
}

function borrar (req, res){
	var id = req.params.id;
	Asistencia.findById(id, (err, asistenciaABorrar) => {
		if(err){
			res.status(500).send({message: "Error al buscar la lista de asistencia."});
		}
		if(!asistenciaABorrar){
			res.status(404).send({message: "La lista de asistencia no fue encontrada."});
		}else{
			asistenciaABorrar.remove(err => {
				if(err){
					res.status(500).send({message: "Error al borrar la lista de asistencia"});
				}else{
					res.status(200).send({message: "La lista de asistencia fue eliminada con éxito."});
				}
			});
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
	  sort: { alumno: sort || 'asc' },
	  populate: [
		  { path: 'alumno', select: 'nombre apellido dni' }, 
		  { path: 'curso' }, 
		  { path: 'periodo' }, 
		  { path: 'provincia' },
		  { path: 'localidad' }],
	  lean: false,
	  page: page || 1, 
	  limit: size || 1000
	};
	Asistencia.paginate(query, options, function(err, asistencias) {
		if(err){
			res.status(500).send({message: "Error al buscar la listar asistencia."});
		}else{
			if(!asistencias){
				res.status(404).send({message: "Lista de asistencia no encontrada."});
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

function buscarPorFecha (req, res){
	var periodo = req.params.periodo;
	var curso = req.query.curso;
	var provincia = req.query.provincia;
	var localidad = req.query.localidad;
	var fecha = req.query.fecha;
	var page = Number(req.query.page);
	var size = Number(req.query.size);
	var sort = req.query.sort;
	var query = { periodo: periodo, curso: curso,  provincia: provincia, localidad: localidad, fecasis: fecha };
	var options = {
	  sort: { alumno: sort || 'asc' },
	  populate: [{ path: 'alumno', select: 'nombre apellido dni' }, { path: 'curso' }, { path: 'localidad' }, { path: 'provincia' }],
	  lean: false,
	  page: page || 1, 
	  limit: size || 1000
	};

	Asistencia.paginate(query, options, function(err, asistencias) {
		if(err){
			res.status(500).send({message: "Error al obtener la lista de asistencia"});
		}else{
			if(!asistencias){
				res.status(404).send({message: "No existen datos para esta lista de asistencia"});
			}else{
				res.status(200).send({asistencias: asistencias.docs});
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
	buscarPorFecha
}
