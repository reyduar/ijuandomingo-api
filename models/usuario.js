'use stritc'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
	username: String,
	password: String,
	role: String
});

UsuarioSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Usuario', UsuarioSchema);