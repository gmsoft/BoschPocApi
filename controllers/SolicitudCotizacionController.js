var SolicitudCotizacionModel          = require('../models/SolicitudCotizacionModel');
var cors = require('cors');
var ErrorHelper = require('../utils/ErrorHelper');

function init (router){
	

	router.route('/solicitudservicio/:id/solicitudcotizacion')
		//crea una solicitud de cotizacion
		.post(cors(), function(req, res){
				var sdc = new SolicitudCotizacionModel();
				sdc.solicitudservicio =  req.params.id;
		    	sdc.estado = req.body.estado;
		  		sdc.taller = req.body.taller._id;
				// save the taller and check for errors
				sdc.save(function(err, result) {
				
				ErrorHelper.errorHandler(err, res);
				res.json(result);
			});
		})

		.get(cors(),function(req, res) {
			SolicitudCotizacionModel.findById(req.params.id).exec( function (err, sds) {
				ErrorHelper.errorHandler(err, res);
				res.json(sds);
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
