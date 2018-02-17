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
	nota.alumno = parametros.alumno._id;
	nota.curso = parametros.curso._id;
	nota.save((err, notaGuardada) => {
		if(err){
			res.status(500).send({message: "Error al guardar la nota"});
		}else{
			res.status(200).send({message: "Datos de nota guardados", nota: notaGuardada});
		}
	});
}

function editar (req, res){
	var id = req.params.id;
	var parametros = req.body;
	Nota.findByIdAndUpdate(id, parametros, (err, notaEditada) => {
		if(err){
			res.status(500).send({message: "Error al editar la nota", notaId: id});
		}else{
			res.status(200).send({message: "Exito al editar la nota", nota: notaEditada});
		}
	});
}

function borrar (req, res){
	var id = req.params.id;
	Nota.findById(id, (err, notaABorrar) => {
		if(err){
			res.status(500).send({message: "Error al encontrar la nota", notaId: id});
		}
		if(!notaABorrar){
			res.status(404).send({message: "Nota no encontrada"});
		}else{
			notaABorrar.remove(err => {
				if(err){
					res.status(500).send({message: "Error al borrar la nota", notaId: id});
				}else{
					res.status(200).send({message: "Exito al borrar", nota: notaABorrar});
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
	Nota.find({ periodo: periodo._id, alumno: alumno._id })
	.populate({ path: 'alumno' })
	.populate({ path: 'curso' })
	.exec((err, resultadoBusqueda) => {
		if(err){
			res.status(500).send({message: "Error del servidor"});
		}else{
			if(!resultadoBusqueda){
				res.status(404).send({message: "La nota para este dni no fue encontrada", dni: dni});
			}else{
				res.status(200).send({notaPorDni: resultadoBusqueda});
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

function buscarPorCurso (req, res){
	var periodo = req.params.periodo;
	var curso = req.params.curso;
	Nota.find({ periodo: periodo._id, curso: curso._id })
	.sort('alumno').exec((err, notas) => {
		if(err){
			res.status(500).send({message: "Error del servidor"});
		}else{
			if(!notas){
				res.status(404).send({message: "Notas no encontrada"});
			}else{
				res.status(200).send({notas: notas});
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
	buscarPorCurso
}
