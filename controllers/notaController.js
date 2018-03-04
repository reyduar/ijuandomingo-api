'use stritc'

var Nota = require('../models/nota');


function agregar (req, res){
	var parametros = req.body;
	var nota = new Nota();
	nota.exaparcial = parametros.exaparcial;
	nota.exafinal = parametros.exafinal;
	nota.exatotal = parametros.exatotal;
	nota.asistencia = parametros.asistencia;
	nota.periodo = parametros.periodo._id;
	nota.alumno = parametros.inscripcion.alumno._id;
	nota.curso = parametros.inscripcion.curso._id;
	nota.provincia = parametros.localidad.provincia._id;
	nota.localidad = parametros.localidad._id;
	nota.inscripcion = parametros.inscripcion._id;

	Nota.find({ localidad: nota.localidad, curso: nota.curso, periodo: nota.periodo, inscripcion: nota.inscripcion })
		.exec((err, existe) => {
			if (err) {
				console.log("Error al verificar si existen duplicados.");
			} else {
				console.log(existe);
				if (existe.length == 0) {
					nota.save((err, notaGuardada) => {
						if (err) {
							res.status(500).send({ message: "Error al guardar la nota." });
						} else {
							res.status(200).send({ message: "La nota fue guardada con éxito." });
						}
					});
				} else {
					res.status(409).send({ message: "Ya existe una nota para este alumno en este curso." });
				}
			}
		});	
}

function editar (req, res){
	var id = req.params.id;
	var parametros = req.body;
	Nota.findByIdAndUpdate(id, parametros, (err, notaEditada) => {
		if(err){
			res.status(500).send({message: "Error al editar la nota.", notaId: id});
		}else{
			res.status(200).send({message: "Nota editada con éxito.", nota: notaEditada});
		}
	});
}

function borrar (req, res){
	var id = req.params.id;
	Nota.findById(id, (err, notaABorrar) => {
		if(err){
			res.status(500).send({message: "Error al borrar la nota.", notaId: id});
		}
		if(!notaABorrar){
			res.status(404).send({message: "Nota no encontrada."});
		}else{
			notaABorrar.remove(err => {
				if(err){
					res.status(500).send({message: "Error al borrar la nota.", notaId: id});
				}else{
					res.status(200).send({message: "Nota borrada con éxito.", nota: notaABorrar});
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
	  sort: { alumno: sort || 'asc' },
	  populate: [
		  { path: 'alumno', select: 'nombre apellido dni' }, 
		  { path: 'curso' }, 
		  { path: 'periodo' }, 
		  { path: 'localidad' }, 
		  { path: 'provincia' }, 
		  { path: 'inscripcion', select: '_id' }],
	  lean: false,
	  page: page || 1, 
	  limit: size || 100
	};

	Nota.paginate(query, options, function(err, notas) {
		if(err){
			res.status(500).send({message: "Error al listar las notas"});
		}else{
			if(!notas){
				res.status(404).send({message: "Notas no encontradas"});
			}else{
				res.status(200).send({notas: notas.docs});
			}
		}
	});
}

function buscarPorAlumno (req, res){
	var periodo = req.params.periodo;
	var alumno = req.params.alumno;
	Nota.find({ periodo: periodo, alumno: alumno })
	.populate({ path: 'alumno', select: 'nombre apellido dni' })
	.populate({ path: 'curso' })
	.populate({ path: 'localidad' })
	.populate({ path: 'provincia' })
	.populate({ path: 'periodo' })
	.sort('curso').exec((err, notas) => {
		if(err){
			res.status(500).send({message: "Error al buscar las notas del alumno."});
		}else{
			if(!notas){
				res.status(404).send({message: "No se encontraron las notas del alumno"});
			}else{
				res.status(200).send({notas: notas});
			}
		}
	});
}

function buscarPorAlumnoYCurso (req, res){
	var periodo = req.params.periodo;
	var alumno = req.params.alumno;
	var curso = req.params.curso;
	Nota.find({ periodo: periodo._id, alumno: alumno._id, curso: curso._id })
	.populate({ path: 'alumno' })
	.populate({ path: 'curso' })
	.exec((err, resultadoBusqueda) => {
		if(err){
			res.status(500).send({message: "Error del servidor"});
		}else{
			if(!resultadoBusqueda){
				res.status(404).send({message: "Nota no encontrada"});
			}else{
				res.status(200).send({notasDniCurso: resultadoBusqueda});
			}
		}
	});
}

function buscarPorQuery (req, res){
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
	Nota.paginate(query, options, function(err, notas) {
		if(err){
			res.status(500).send({message: "Error al buscar las notas."});
		}else{
			if(!notas){
				res.status(404).send({message: "Notas no encontrada."});
			}else{
				res.status(200).send({notas: notas.docs});
			}
		}
	});
}

function buscarPorId (req, res){
	var id = req.params.id;
	Nota.findById(id, (err, nota) => {
		if(err){
			res.status(500).send({message: "Error al encontrar la nota", _id: id});
		}else{
			if(!nota){
				res.status(404).send({message: "Nota no encontrada"});
			}else{
				res.status(200).send({nota: nota});
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
	buscarPorQuery
}
