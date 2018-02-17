'use stritc'

var Nacionalidad = require('../models/nacionalidad');


function agregar (req, res){
	var parametros = req.body;
	var nacionalidad = new Nacionalidad();
	nacionalidad.nombre = parametros.nombre;
	nacionalidad.pais = parametros.pais;
	nacionalidad.save((err, nacionalidadGuardado) => {
		if(err){
			res.status(500).send({message: "Error al guardar la nacionalidad"});
		}else{
			res.status(200).send({message: "Nacionalidad guardada", nacionalidad: nacionalidadGuardado});
		}
	});
}

function editar (req, res){
	var id = req.params.id;
	var parametros = req.body;
	Nacionalidad.findByIdAndUpdate(id, parametros, (err, nacionalidadEditada) => {
		if(err){
			res.status(500).send({message: "Error al editar la nacionalidad", _id: id});
		}else{
			res.status(200).send({message: "Exito al editar la nacionalidad", nacionalidad: nacionalidadEditada});
		}
	});
}

function borrar (req, res){
	var id = req.params.id;
	Nacionalidad.findById(id, (err, nacionalidadABorrar) => {
		if(err){
			res.status(500).send({message: "Error al encontrar el nacionalidad", _id: id});
		}
		if(!nacionalidadABorrar){
			res.status(404).send({message: "Nacionalidad no encontrada"});
		}else{
			nacionalidadABorrar.remove(err => {
				if(err){
					res.status(500).send({message: "Error al borrar el nacionalidad", _id: id});
				}else{
					res.status(200).send({message: "Exito al borrar", nacionalidad: nacionalidadABorrar});
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

	Nacionalidad.paginate(query, options, function(err, nacionalidades) {
		if(err){
			res.status(500).send({message: "Error al obtener las nacionalidades"});
		}else{
			if(!nacionalidades){
				res.status(404).send({message: "No encontrado"});
			}else{
				res.status(200).send({nacionalidades: nacionalidades.docs});
			}
		}
	});
}

function buscarPorId (req, res){
	var id = req.params.id;
	Nacionalidad.findById(id, (err, nacionalidad) => {
		if(err){
			res.status(500).send({message: "Error al encontrar la nacionalidad", _id: id});
		}else{
			if(!nacionalidad){
				res.status(404).send({message: "No encontrada"});
			}else{
				res.status(200).send({nacionalidad: nacionalidad});
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
