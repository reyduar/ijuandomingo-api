'use stritc'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var CursoSchema = Schema({
	nombre: String
});

CursoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Curso', CursoSchema);
