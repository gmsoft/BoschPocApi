var SolicitudServicioModel          = require('../models/SolicitudServicioModel');
var cors = require('cors');
var ErrorHelper = require('../utils/ErrorHelper');

function init (router){
	router.route('/solicitudservicio')

		.post(cors(),function(req, res) {
			var sds = new SolicitudServicioModel();      // create a new instance of the taller model
			sds.name = req.body.name;  // set the tallers name (comes from the request)
		    sds.description = req.body.description;
		    sds.user = req.body.user._id;
			// save the taller and check for errors
			sds.save(function(err, result) {
				
				ErrorHelper.errorHandler(err, res);
				res.json(result);
			});

		})

		.get(cors(),function(req, res) {
			SolicitudServicioModel.find().populate('user').exec(function (err, sds) {
				ErrorHelper.errorHandler(err, res);
				
				res.json(sds);
			})
		})

		.options(cors(),function(req, res) {
				console.log("OPTIONS");
				res.json("");
			});

	router.route('/solicitudservicio/:id')

		.get(cors(),function(req, res) {
			SolicitudServicioModel.findById(req.params.id).populate('user').exec( function (err, sds) {
				ErrorHelper.errorHandler(err, res);
				res.json(sds);
			})
		})

		.delete(cors(),function(req, res) {
			SolicitudServicioModel.findByIdAndRemove(req.params.id, function (err, sds) {
				ErrorHelper.errorHandler(err, res);
				res.json(sds);
			})
		})
		.put(cors(),function(req, res) {
			SolicitudServicioModel.findById(req.params.id, function (err, sds) {
			  ErrorHelper.errorHandler(err, res);
			  sds.name = req.body.name;
			  sds.description = req.body.description;
				console.log(sds);
			  sds.save(function (err) {
			    ErrorHelper.errorHandler(err, res);
			    res.json(sds);
			  });
			})
		})

		.options(cors(),function(req, res) {
				console.log("OPTIONS");
				res.json("");
			});

}
module.exports = {
	init : init
}
