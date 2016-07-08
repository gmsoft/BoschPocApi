var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SolicitudServicioSchema   = new Schema({
    name: String,
    description: String,
    user:  [{ type: Schema.Types.ObjectId, ref: 'User' }],
    solicitudcotizacion: [{ type: Schema.Types.ObjectId, ref: 'SolicitudCotizacion' }]
},  { collection: 'SolicitudServicios' });

module.exports = mongoose.model('SolicitudServicio', SolicitudServicioSchema);