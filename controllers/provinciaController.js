'use stritc'

var Provincia = require('../models/provincia');


function agregar (req, res){
	var parametros = req.body;
	var provincia = new Provincia();
	provincia.nombre = parametros.nombre;
	provincia.save((err, provinciaGuardada) => {
		if(err){
			res.status(500).send({message: "Error al guardar la provincia"});
		}else{
			res.status(200).send({message: "Provincia guardada", provincia: provinciaGuardada});
		}
	});
}

function editar (req, res){
	var id = req.params.id;
	var parametros = req.body;
	Provincia.findByIdAndUpdate(id, parametros, (err, provinciaEditada) => {
		if(err){
			res.status(500).send({message: "Error al editar la provincia", _id: id});
		}else{
			res.status(200).send({message: "Exito al editar la provincia", provincia: provinciaEditada});
		}
	});
}

function borrar (req, res){
	var id = req.params.id;
	Provincia.findById(id, (err, provinciaABorrar) => {
		if(err){
			res.status(500).send({message: "Error al encontrar la provincia", _id: id});
		}
		if(!provinciaABorrar){
			res.status(404).send({message: "Provincia no encontrado"});
		}else{
			provinciaABorrar.remove(err => {
				if(err){
					res.status(500).send({message: "Error al borrar la provincia", _id: id});
				}else{
					res.status(200).send({message: "Exito al borrar", provincia: provinciaABorrar});
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

	Provincia.paginate(query, options, function(err, provincias) {
		if(err){
			res.status(500).send({message: "Error al obtener las provincias"});
		}else{
			if(!provincias){
				res.status(404).send({message: "No encontrado"});
			}else{
				res.status(200).send({provincias: provincias.docs});
			}
		}
	});
}

function buscarPorId (req, res){
	var id = req.params.id;
	Provincia.findById(id, (err, provincia) => {
		if(err){
			res.status(500).send({message: "Error al encontrar la provincia", _id: id});
		}else{
			if(!provincia){
				res.status(404).send({message: "No encontrado"});
			}else{
				res.status(200).send({provincia: provincia});
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
