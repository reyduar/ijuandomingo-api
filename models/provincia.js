'use stritc'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var ProvinciaSchema = Schema({
	nombre: String
});

ProvinciaSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Provincia', ProvinciaSchema);