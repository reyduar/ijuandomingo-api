'use stritc'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var AsistenciaSchema = Schema({
	fecasis: String,
	estado: String,
	periodo: { type: Schema.Types.ObjectId, ref: 'Periodo' },
	alumno: { type: Schema.Types.ObjectId, ref: 'Alumno' },
	curso: { type: Schema.Types.ObjectId, ref: 'Curso' }
});

AsistenciaSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Asistencia', AsistenciaSchema);
