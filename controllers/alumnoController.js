'use stritc'

var Alumno = require('../models/alumno');


function agregar (req, res){
	var parametros = req.body;
	var alumno = new Alumno();
	alumno.nombre = parametros.nombre;
	alumno.apellido = parametros.apellido;
	alumno.fecnac = parametros.fecnac;
	alumno.dni = parametros.dni;
	alumno.sexo = parametros.sexo;
	alumno.email = parametros.email;
	alumno.fijo = parametros.fijo;
	alumno.celular = parametros.celular;
	alumno.domicilio = parametros.domicilio;
	alumno.barrio = parametros.barrio;
	alumno.ocupacion = parametros.ocupacion;
	alumno.localidad = parametros.localidad._id;
	alumno.nacionalidad = parametros.nacionalidad._id;
	alumno.save((err, alumnoGuardado) => {
		if(err){
			res.status(500).send({message: "Error al guardar el alumno"});
		}else{
			res.status(200).send({message: "alumno guardado", alumno: alumnoGuardado});
		}
	});
}

function editar (req, res){
	var id = req.params.id;
	var parametros = req.body;
	Alumno.findByIdAndUpdate(id, parametros, (err, alumnoEditado) => {
		if(err){
			res.status(500).send({message: "Error al editar alumno", _id: id});
		}else{
			res.status(200).send({message: "Exito al editar alumno", alumno: alumnoEditado});
		}
	});
}

function borrar (req, res){
	var id = req.params.id;
	Alumno.findById(id, (err, alumnoABorrar) => {
		if(err){
			res.status(500).send({message: "Error al encontrar el alumno", _id: id});
		}
		if(!alumnoABorrar){
			res.status(404).send({message: "Alumno no encontrado"});
		}else{
			alumnoABorrar.remove(err => {
				if(err){
					res.status(500).send({message: "Error al borrar el alumno", _id: id});
				}else{
					res.status(200).send({message: "Exito al borrar", alumno: alumnoABorrar});
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
	  populate: [{ path: 'localidad', select: 'nombre' }, { path: 'nacionalidad', select: 'nombre' }],
	  lean: false,
	  page: page || 1, 
	  limit: size || 50
	};

	Alumno.paginate(query, options, function(err, alumnos) {
		if(err){
			res.status(500).send({message: "Error al listar alumnos"});
		}else{
			if(!alumnos){
				res.status(404).send({message: "Alumnnos no encontrado"});
			}else{
				res.status(200).send({alumnos: alumnos.docs});
			}
		}
	});
}

function buscarPorDni (req, res){
	var dni = req.params.dni;
	Alumno.find({dni: dni})
	.populate({ path: 'localidad', select: 'nombre' })
	.populate({ path: 'nacionalidad', select: 'nombre' })
	.exec((err, alumno) => {
		if(err){
			res.status(500).send({message: "Error al listar alumnos"});
		}else{
			if(!alumnoDni){
				res.status(404).send({message: "Datos no encontrados"});
			}else{
				res.status(200).send({alumnoDni: alumnoDni});
			}
		}
	});
}

function buscarPorId (req, res){
	var id = req.params.id;
	Alumno.findOne({_id: id})
	.populate({ path: 'localidad' })
	.populate({ path: 'nacionalidad' })
	.exec((err, alumno) => {
		if(err){
			res.status(500).send({message: "Error al obtener alumno por Id"});
		}else{
			if(!alumno){
				res.status(404).send({message: "Alumno no encontrado"});
			}else{
				res.status(200).send({alumno: alumno});
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
