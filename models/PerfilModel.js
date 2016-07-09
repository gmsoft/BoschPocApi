var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Perfil   = new Schema({
    name: String
},  { collection: 'Perfiles' });

module.exports = mongoose.model('Perfil', Perfil);
