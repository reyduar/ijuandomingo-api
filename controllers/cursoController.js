'use stritc'

var Curso = require('../models/curso');


function agregar (req, res){
	var parametros = req.body;
	var curso = new Curso();
	curso.nombre = parametros.nombre;

	Curso.find({ nombre: curso.nombre }).exec((err, existe) => {
		if (err) {
			console.log("Error al verificar si existen duplicados.");
		} else {
			console.log(existe);
			if (existe.length == 0) {
				curso.save((err, cursoGuardado) => {
					if(err){
						res.status(500).send({message: "Error al guardar el curso."});
					}else{
						res.status(200).send({message: "Curso guardado exitosamente.", curso: cursoGuardado});
					}
				});
			} else {
				res.status(409).send({ message: "Este curso ya se encuentra ingresada." });
			}
		}
	});
}

function editar (req, res){
	var id = req.params.id;
	var parametros = req.body;
	Curso.findByIdAndUpdate(id, parametros, (err, cursoEditado) => {
		if(err){
			res.status(500).send({message: "Error al editar el curso.", cursoId: id});
		}else{
			res.status(200).send({message: "Curso editado con éxito.", curso: cursoEditado});
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
					res.status(500).send({message: "Error al borrar el curso.", cursoId: id});
				}else{
					res.status(200).send({message: "Curso borrado con éxito.", curso: cursoABorrar});
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
