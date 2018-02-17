'use stritc'

var Periodo = require('../models/periodo');


function agregar (req, res){
	var parametros = req.body;
	var periodo = new Periodo();
	periodo.nombre = parametros.nombre;
	periodo.descripcion = parametros.descripcion;
	periodo.estado = parametros.estado;
	periodo.save((err, periodoGuardado) => {
		if(err){
			res.status(500).send({message: "Error al guardar la periodo"});
		}else{
			res.status(200).send({message: "Periodo guardada", periodo: periodoGuardado});
		}
	});
}

function editar (req, res){
	var id = req.params.id;
	var parametros = req.body;
	Periodo.findByIdAndUpdate(id, parametros, (err, periodoEditado) => {
		if(err){
			res.status(500).send({message: "Error al editar la periodo", _id: id});
		}else{
			res.status(200).send({message: "Exito al editar la periodo", periodo: periodoEditado});
		}
	});
}

function borrar (req, res){
	var id = req.params.id;
	Periodo.findById(id, (err, periodoABorrar) => {
		if(err){
			res.status(500).send({message: "Error al encontrar el periodo", _id: id});
		}
		if(!periodoABorrar){
			res.status(404).send({message: "Periodo no encontrada"});
		}else{
			periodoABorrar.remove(err => {
				if(err){
					res.status(500).send({message: "Error al borrar el periodo", _id: id});
				}else{
					res.status(200).send({message: "Exito al borrar", periodo: periodoABorrar});
				}
			});
		}
	});

}

function listar (req, res){
	Periodo.find({}).sort('nombre').exec((err, periodos) => {
		if(err){
			res.status(500).send({message: "Error al obtener las periodos"});
		}else{
			if(!periodos){
				res.status(404).send({message: "No encontrado"});
			}else{
				res.status(200).send({periodo: periodos});
			}
		}
	});
}

function activo (req, res){
	Periodo.findOne({estado: true}).exec((err, periodo) => {
		if(err){
			res.status(500).send({message: "Error al obtener las periodo"});
		}else{
			if(!periodo){
				res.status(404).send({message: "No encontrado"});
			}else{
				res.status(200).send({periodo: periodo});
			}
		}
	});
}

function buscarPorId (req, res){
	var id = req.params.id;
	Periodo.findById(id, (err, periodo) => {
		if(err){
			res.status(500).send({message: "Error al encontrar la periodo", _id: id});
		}else{
			if(!periodo){
				res.status(404).send({message: "No encontrada"});
			}else{
				res.status(200).send({periodo: periodo});
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
	activo
}
