var SolicitudCotizacionModel          = require('../models/SolicitudCotizacionModel');
var SolicitudServicioModel = require('../models/SolicitudServicioModel');
var cors = require('cors');
var ErrorHelper = require('../utils/ErrorHelper');

function init (router){

	router.route('/solicitudcotizacion')
		.get(  function(req, res){
			SolicitudCotizacionModel.find().populate('taller solicitud_servicio').exec(function(err, sdc){
				ErrorHelper.errorHandler(err, res);

				res.json(sdc);
			})
		});

		router.route('/solicitudcotizacion/:id')
			.get(  function(req, res){
				SolicitudCotizacionModel.findById(req.params.id).populate('taller solicitud_servicio').exec(function(err, sdc){
					ErrorHelper.errorHandler(err, res);
					res.json(sdc);
				})
			});

	router.route('/solicitudservicio/:id/solicitudcotizacion')
		//crea una solicitud de cotizacion
		.post(  function(req, res){
				var sdc = new SolicitudCotizacionModel();
				sdc.solicitud_servicio =  req.params.id;
		    	sdc.estado = req.body.estado;
		  		sdc.taller = req.body.taller._id;
					console.log(req.body);
				// save the taller and check for errors
				sdc.save(function(err, result) {

				ErrorHelper.errorHandler(err, res);
				SolicitudServicioModel.findById(req.params.id, function (err, sds) {
					ErrorHelper.errorHandler(err, res);
					sds.solicitudcotizacion = result._id;
					sds.save(function(err, result){
						ErrorHelper.errorHandler(err, res);
						res.json(sds);
					});
				});
			});
		})

		.get( function(req, res) {
			SolicitudCotizacionModel.findById(req.params.id).exec( function (err, sds) {
				ErrorHelper.errorHandler(err, res);
				res.json(sds);
			})
		})

		.options( function(req, res) {
				console.log("OPTIONS");
				res.json("");
			});

}
module.exports = {
	init : init
}
