'use stritc'

var Localidad = require('../models/localidad');


function agregar (req, res){
	var parametros = req.body;
	var localidad = new Localidad();
	localidad.nombre = parametros.nombre;
	localidad.provincia = parametros.provincia._id;
	localidad.save((err, localidadGuardada) => {
		if(err){
			res.status(500).send({message: "Error al guardar la localidad"});
		}else{
			res.status(200).send({message: "Localidad guardada", localidad: localidadGuardada});
		}
	});
}

function editar (req, res){
	var id = req.params.id;
	var parametros = req.body;
	Localidad.findByIdAndUpdate(id, parametros, (err, localidadEditada) => {
		if(err){
			res.status(500).send({message: "Error al editar la localidad", _id: id});
		}else{
			res.status(200).send({message: "Exito al editar la localidad", localidad: localidadEditada});
		}
	});
}

function borrar (req, res){
	var id = req.params.id;
	Localidad.findById(id, (err, localidadABorrar) => {
		if(err){
			res.status(500).send({message: "Error al encontrar la localidad", _id: id});
		}
		if(!localidadABorrar){
			res.status(404).send({message: "Localidad no encontrado"});
		}else{
			localidadABorrar.remove(err => {
				if(err){
					res.status(500).send({message: "Error al borrar la localidad", _id: id});
				}else{
					res.status(200).send({message: "Exito al borrar", localidad: localidadABorrar});
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
	  sort: { provincia: sort || 'desc' },
	  populate: 'provincia',
	  lean: false,
	  page: page || 1, 
	  limit: size || 30
	};
	Localidad.paginate(query, options, function(err, localidades) {
		if(err){
			res.status(500).send({message: "Error al obtener las localidades"});
		}else{
			if(!localidades){
				res.status(404).send({message: "No encontrado"});
			}else{
				res.status(200).send({localidades: localidades.docs});
			}
		}
	});
}

function buscarPorId (req, res){
	var id = req.params.id;
	Localidad.findById(id, (err, localidad) => {
		if(err){
			res.status(500).send({message: "Error al encontrar la localidad", _id: id});
		}else{
			if(!localidad){
				res.status(404).send({message: "No encontrado"});
			}else{
				res.status(200).send({localidad: localidad});
			}
		}
	});
}

function buscarPorProvincia (req, res){
	var provincia = req.params.provincia;
	Localidad.find({ provincia: provincia })
	.populate({ path: 'provincia' })
	.exec((err, localidades) => {
		if(err){
			res.status(500).send({message: "Error del servidor"});
		}else{
			if(!localidades){
				res.status(404).send({message: "Nota no encontrada"});
			}else{
				res.status(200).send({localidades: localidades});
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
	buscarPorProvincia
}
