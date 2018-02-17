'use stritc'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var PeriodoSchema = Schema({
	nombre: String,
	descripcion: String,
	estado: Boolean
});

PeriodoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Periodo', PeriodoSchema);
