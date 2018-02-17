'use stritc'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var AlumnoSchema = Schema({
	nombre: String,
	apellido: String,
	fecnac: String,
	dni: String,
	sexo: String,
	email: String,
	fijo: String,
	celular: String,
	domicilio: String,
	barrio: String,
	ocupacion: String,
	localidad: { type: Schema.Types.ObjectId, ref: 'Localidad' },
	nacionalidad: { type: Schema.Types.ObjectId, ref: 'Nacionalidad' }
});

AlumnoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Alumno', AlumnoSchema);
