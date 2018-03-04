'use stritc'
var bcrypt = require('bcrypt-nodejs');
var Usuario = require('../models/usuario');
var jwt = require('../services/jwt');
var common = require('../routers/common')
var config = common.config();

function agregar (req, res){
	var parametros = req.body;
	if (parametros.userkey == config.admin || parametros.userkey == config.user) {
		var usuario = new Usuario();
		usuario.username = parametros.username;
		usuario.nombre = parametros.nombre;
		usuario.apellido = parametros.apellido;
		usuario.password = parametros.password;
		usuario.role = parametros.userkey == config.admin ? 'ROLE_ADMIN' : parametros.userkey == config.user ? 'ROLE_USER' : 'ROLE_DEMO';

		// encrypt password
		bcrypt.hash(parametros.password, null, null, function (err, hash) {
			usuario.password = hash;
		});

		Usuario.findOne({ username: usuario.username }, (err, result) => {
			if (err) {
				res.status(500).send({ message: "Error al verificar duplicados." });
			} else {
				if (!result) {
					usuario.save((err, saved) => {
						if (err) {
							res.status(500).send({ message: "No se puede registrar el usuario, error en el servidor." });
						} else {
							if (!saved) {
								res.status(404).send({ message: "El usuario no fue registrado, vuelva intentarlo." });
							} else {
								res.status(200).send({ message: "Usuario registrado con éxito.", usuario: saved });
							}
						}
					});
				} else {
					res.status(409).send({ message: "No es posible registrar este nombre de usuario porque ya existe." });
				}
			}
		});
	} else {
		res.status(400).send({ message: "La llave del registro es incorrecta." });
	}
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

function login(req, res) {
	var params = req.body;
	var username = params.username;
	var password = params.password;
	if(params.password && params.username){
		Usuario.findOne({username: username}, (err, user) => {
            if(err){
                res.status(500).send({message: "Error en el servidor al verificar el usuario."});
            }else{
                if(user){
					bcrypt.compare(password, user.password, (err, check) => {
						if (check) {
							//check and generate token
							if (params.gettoken) {
								//token generated
								res.status(200).send({ 
									token: jwt.createToken(user)
								 });	
							} else {
								res.status(200).send({ usuario: user });	
							}
							
						} else {
							res.status(404).send({message: "El usuario o la contraseña son incorrectas."});
						}
					});
                    
                }else{
                    res.status(404).send({message: "No se encontraron datos del usuario."});
                }
            }
        });
	}else{
		res.status(400).send({message: "Ingrese los datos solicitados para la autenticación."});
	}
}

module.exports = {
	agregar,
	editar,
	borrar,
	listar,
	buscarPorNombre,
	buscarPorId,
	login
}
