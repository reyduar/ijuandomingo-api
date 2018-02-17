'use stritc'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var NacionalidadSchema = Schema({
	nombre: String,
	pais: String
});

NacionalidadSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Nacionalidad', NacionalidadSchema);