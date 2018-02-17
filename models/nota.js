'use stritc'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var NotaSchema = Schema({
	exaparcial: Number,
	exafinal: Number,
	exatotal: Number,
	asistencia: Number,
	periodo: { type: Schema.Types.ObjectId, ref: 'Periodo' },
	alumno: { type: Schema.Types.ObjectId, ref: 'Alumno' },
	curso: { type: Schema.Types.ObjectId, ref: 'Curso' }
});

NotaSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Nota', NotaSchema);
