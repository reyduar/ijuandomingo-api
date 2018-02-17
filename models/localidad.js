'use stritc'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var LocalidadSchema = Schema({
	nombre: String,
	provincia: { type: Schema.Types.ObjectId, ref: 'Provincia' }
});

LocalidadSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Localidad', LocalidadSchema);