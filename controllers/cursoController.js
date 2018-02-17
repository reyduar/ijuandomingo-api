'use stritc'

var Curso = require('../models/curso');


function agregar (req, res){
	var parametros = req.body;
	var curso = new Curso();
	curso.nombre = parametros.nombre;
	curso.save((err, cursoGuardado) => {
		if(err){
			res.status(500).send({message: "Error al guardar el curso"});
		}else{
			res.status(200).send({message: "Curso guardado", curso: cursoGuardado});
		}
	});
}

function editar (req, res){
	var id = req.params.id;
	var parametros = req.body;
	Curso.findByIdAndUpdate(id, parametros, (err, cursoEditado) => {
		if(err){
			res.status(500).send({message: "Error al editar curso", cursoId: id});
		}else{
			res.status(200).send({message: "Exito al editar alumno", curso: cursoEditado});
		}
	});
}

function borrar (req, res){
	var id = req.params.id;
	Curso.findById(id, (err, cursoABorrar) => {
		if(err){
			res.status(500).send({message: "Error al encontrar el curso", cursoId: id});
		}
		if(!cursoABorrar){
			res.status(404).send({message: "Curso no encontrado"});
		}else{
			cursoABorrar.remove(err => {
				if(err){
					res.status(500).send({message: "Error al borrar el curso", cursoId: id});
				}else{
					res.status(200).send({message: "Exito al borrar", curso: cursoABorrar});
				}
			});
		}
	});

}

function listar (req, res){
	var page = Number(req.query.page);
	var size = Number(req.query.size);
	var sort = req.query.sort;
	var query = {};
	var options = {
	  sort: { nombre: sort || 'desc' },
	  lean: false,
	  page: page || 1, 
	  limit: size || 50
	};

	Curso.paginate(query, options, function(err, cursos) {
		if(err){
			res.status(500).send({message: "Error al listar cursos"});
		}else{
			if(!cursos){
				res.status(404).send({message: "No encontrado"});
			}else{
				res.status(200).send({cursos: cursos.docs});
			}
		}
	});
}

function buscarPorId (req, res){
	var id = req.params.id;
	Curso.findById(id, (err, cursoEncontrado) => {
		if(err){
			res.status(500).send({message: "Error al encontrar el curso", cursoId: id});
		}else{
			if(!cursoEncontrado){
				res.status(404).send({message: "No encontrado"});
			}else{
				res.status(200).send({curso: cursoEncontrado});
			}
		}
	});
}

module.exports = {
	agregar,
	editar,
	borrar,
	listar,
	buscarPorId
}
