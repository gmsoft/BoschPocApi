var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SolicitudServicioSchema   = new Schema({
    fecha_creacion: Date,
    vehiculo: String,
    direccion: String,
    fecha_deseada: Date,
    user:  [{ type: Schema.Types.ObjectId, ref: 'User' }],
    solicitudcotizacion: [{ type: Schema.Types.ObjectId, ref: 'SolicitudCotizacion' }]
},  { collection: 'SolicitudServicios' });

module.exports = mongoose.model('SolicitudServicio', SolicitudServicioSchema);
