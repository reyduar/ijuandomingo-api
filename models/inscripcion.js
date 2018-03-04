'use stritc'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var InscripcionSchema = Schema({
	fecinsc: String,
	estadoc: Boolean,
	estado: Boolean,
	periodo: { type: Schema.Types.ObjectId, ref: 'Periodo' },
	alumno: { type: Schema.Types.ObjectId, ref: 'Alumno' },
	curso: { type: Schema.Types.ObjectId, ref: 'Curso' },
	provincia: { type: Schema.Types.ObjectId, ref: 'Provincia' },
	localidad: { type: Schema.Types.ObjectId, ref: 'Localidad' }

});

InscripcionSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Inscripcion', InscripcionSchema);
