var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TallerSchema   = new Schema({
    name: String,
    direccion:String
},  { collection: 'Talleres' });

module.exports = mongoose.model('Taller', TallerSchema);
