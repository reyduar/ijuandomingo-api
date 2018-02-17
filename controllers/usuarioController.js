'use stritc'

var Usuario = require('../models/usuario');


function agregar (req, res){
	var parametros = req.body;
	var usuario = new Usuario();
	usuario.username = parametros.username;
	usuario.password = parametros.password;
	usuario.role = parametros.role;
	usuario.save((err, usuarioGuardado) => {
		if(err){
			res.status(500).send({message: "Error al guardar información del usuario"});
		}else{
			res.status(200).send({message: "Dato del usuario guardado", usuario: usuarioGuardado});
		}
	});
}

function editar (req, res){
	var id = req.params.id;
	var parametros = req.body;
	Usuario.findByIdAndUpdate(id, parametros, (err, usuarioEditado) => {
		if(err){
			res.status(500).send({message: "Error al editar usuario", _id: id});
		}else{
			res.status(200).send({message: "Exito al editar usuario", usuario: usuarioEditado});
		}
	});
}

function borrar (req, res){
	var id = req.params.id;
	Usuario.findById(id, (err, usuarioABorrar) => {
		if(err){
			res.status(500).send({message: "Error al encontrar el usuario", _id: id});
		}
		if(!usuarioABorrar){
			res.status(404).send({message: "usuario no encontrado"});
		}else{
			usuarioABorrar.remove(err => {
				if(err){
					res.status(500).send({message: "Error al borrar el usuario", _id: id});
				}else{
					res.status(200).send({message: "Exito al borrar", usuario: usuarioABorrar});
				}
			});
		}
	});

}

function listar (req, res){
	Usuario.find({}).sort('username').exec((err, usuarios) => {
		if(err){
			res.status(500).send({message: "Error al obtener los usuarios"});
		}else{
			if(!listarInfocursos){
				res.status(404).send({message: "No encontrado"});
			}else{
				res.status(200).send({usuarios: usuarios});
			}
		}
	});
}

function buscarPorNombre (req, res){
	var username = req.params.username;
	Usuario.find({username: username}).exec((err, usuario) => {
		if(err){
			res.status(500).send({message: "Error al buscar el usuario"});
		}else{
			if(!usuario){
				res.status(404).send({message: "No encontrado"});
			}else{
				res.status(200).send({usuario: usuario});
			}
		}
	});
}

function buscarPorId (req, res){
	var id = req.params.id;
	Usuario.findById(id, (err, usuario) => {
		if(err){
			res.status(500).send({message: "Error del Servidor", _id: id});
		}else{
			if(!usuario){
				res.status(404).send({message: "Usuario no encontrado"});
			}else{
				res.status(200).send({usuario: usuario});
			}
		}
	});
}

module.exports = {
	agregar,
	editar,
	borrar,
	listar,
	buscarPorNombre,
	buscarPorId
}
