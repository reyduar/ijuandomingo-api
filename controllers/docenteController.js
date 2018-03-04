'use stritc'

var Docente = require('../models/docente');


function agregar (req, res){
	var parametros = req.body;
	var docente = new Docente();
	docente.nombre = parametros.nombre;
	docente.apellido = parametros.apellido;
	docente.fecnac = parametros.fecnac;
	docente.dni = parametros.dni;
	docente.sexo = parametros.sexo;
	docente.email = parametros.email;
	docente.fijo = parametros.fijo;
	docente.celular = parametros.celular;
	docente.domicilio = parametros.domicilio;
	docente.barrio = parametros.barrio;
	docente.ocupacion = parametros.ocupacion;
	docente.nacionalidad = parametros.nacionalidad._id;
	docente.localidad = parametros.localidad._id;
	Docente.find({dni: docente.dni }).exec((err, existe) => {
		if(err){
			res.status(500).send({message: "Error al verificar si existe el DNI."});
		}else{
			console.log(existe);
			if(existe.length == 0){
				docente.save((err, docenteGuardado) => {
					if(err){
						res.status(500).send({message: "Error al guardar los datos del docente."});
					}else{
						res.status(200).send({message: "Los datos del docente se guardaron exitosamente.", docente: docenteGuardado});
					}
				});
			}else{
				res.status(409).send({message: "El DNI de este docente ya se encuentra ingresado."});
			}
		}
	});
}

function editar (req, res){
	var id = req.params.id;
	var parametros = req.body;
	Docente.findByIdAndUpdate(id, parametros, (err, docenteEditado) => {
		if(err){
			res.status(500).send({message: "Error al editar docente.", docenteId: id});
		}else{
			res.status(200).send({message: "Docente editado con éxito.", docente: docenteEditado});
		}
	});
}

function borrar (req, res){
	var id = req.params.id;
	Docente.findById(id, (err, docenteABorrar) => {
		if(err){
			res.status(500).send({message: "Error al encontrar el docente.", docenteId: id});
		}
		if(!docenteABorrar){
			res.status(404).send({message: "Docente no encontrado."});
		}else{
			docenteABorrar.remove(err => {
				if(err){
					res.status(500).send({message: "Error al borrar el docente.", docenteId: id});
				}else{
					res.status(200).send({message: "Docente borrado con éxito.", docente: docenteABorrar});
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
	  sort: { nombre: sort || 'asc' },
	  populate: [{ path: 'localidad' }, { path: 'nacionalidad', select: 'nombre' }],
	  lean: false,
	  page: page || 1, 
	  limit: size || 50
	};

	Docente.paginate(query, options, function(err, docentes) {
		if(err){
			res.status(500).send({message: "Error al obtener docentes"});
		}else{
			if(!docentes){
				res.status(404).send({message: "No encontrado"});
			}else{
				res.status(200).send({docentes: docentes.docs});
			}
		}
	});
}

function buscarPorDni (req, res){
	var dni = req.params.dni;
	Docente.find({dni: dni})
	.populate({ path: 'localidad' })
	.populate({ path: 'nacionalidad', select: 'nombre' })
	.exec((err, docente) => {
		if(err){
			res.status(500).send({message: "Error al buscar el docente"});
		}else{
			if(!docente){
				res.status(404).send({message: "No encontrado"});
			}else{
				res.status(200).send({docente: docente});
			}
		}
	});
}

function buscarPorId (req, res){
	var id = req.params.id;
	Docente.findOne({id: id})
	.populate({ path: 'localidad', select: 'nombre' })
	.populate({ path: 'nacionalidad', select: 'nombre' })
	.exec((err, docente) => {
		if(err){
			res.status(500).send({message: "Error al encontrar el docente", docenteId: id});
		}else{
			if(!docente){
				res.status(404).send({message: "No encontrado"});
			}else{
				res.status(200).send({docente: docente});
			}
		}
	});
}

module.exports = {
	agregar,
	editar,
	borrar,
	listar,
	buscarPorDni,
	buscarPorId
}
