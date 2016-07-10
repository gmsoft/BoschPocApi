var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SolicitudCotizacionSchema   = new Schema({
    estado: String,
    precio: Number,
    taller:  [{ type: Schema.Types.ObjectId, ref: 'Taller' }],
    solicitud_servicio:  [{ type: Schema.Types.ObjectId, ref: 'SolicitudServicio' }]
},  { collection: 'SolicitudCotizacion' });

module.exports = mongoose.model('SolicitudCotizacion', SolicitudCotizacionSchema);
