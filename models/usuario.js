'use stritc'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
	mombre: String,
	apellido: String,
	email: String,
	username: String,
	password: String,
	role: String,
	userkey: String
});

UsuarioSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Usuario', UsuarioSchema);