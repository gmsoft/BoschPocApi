var SolicitudServicioModel          = require('../models/SolicitudServicioModel');
var cors = require('cors');
var ErrorHelper = require('../utils/ErrorHelper');

function init (router){
	router.route('/solicitudservicio')

		.post( function(req, res) {
			console.log(req.body);
			var sds = new SolicitudServicioModel();      // create a new instance of the taller model
				sds.fecha_creacion = Date.now(),
				sds.vehiculo       = req.body.vehiculo;
				sds.direccion       = req.body.direccion;
				sds.fecha_deseada  = req.body.fecha_deseada;
				sds.user           = req.body.user._id;
			// save the taller and check for errors
			sds.save(function(err, result) {

				ErrorHelper.errorHandler(err, res);
				res.json(result);
			});

		})

		.get( function(req, res) {
			var query= {};
			if(req.query.status){
				if(req.query.status=="send"){
					query.solicitudcotizacion = {$not: {$size: 0}};
				}else{
					query.solicitudcotizacion = [];
				}
			}

			SolicitudServicioModel.find(query).populate('user').exec(function (err, sds) {
				ErrorHelper.errorHandler(err, res);
				res.json(sds);
			})
		})

		.options( function(req, res) {
				console.log("OPTIONS");
				res.json("");
			});

	router.route('/solicitudservicio/:id')

		.get( function(req, res) {
			SolicitudServicioModel.findById(req.params.id).populate('user').exec( function (err, sds) {
				ErrorHelper.errorHandler(err, res);
				res.json(sds);
			})
		})

		.delete( function(req, res) {
			SolicitudServicioModel.findByIdAndRemove(req.params.id, function (err, sds) {
				ErrorHelper.errorHandler(err, res);
				res.json(sds);
			})
		})
		.put( function(req, res) {
			SolicitudServicioModel.findById(req.params.id, function (err, sds) {
			  ErrorHelper.errorHandler(err, res);
				sds.vehiculo       = req.body.vehiculo||req.body.vehiculo.trim()!=''?req.body.vehiculo:sds.vehiculo;
				sds.direccion      = req.body.direccion||req.body.direccion.trim()!=''?req.body.direccion:sds.direccion;
				sds.fecha_deseada  = req.body.fecha_deseada||req.body.fecha_deseada.trim()!=''?req.body.fecha_deseada:sds.fecha_deseada;
				sds.user           = req.body.user._id||req.body.user._id.trim()!=''?req.body.fecha_deseada:sds.user;
				sds.save(function (err) {
			    ErrorHelper.errorHandler(err, res);
			    res.json(sds);
			  });
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
