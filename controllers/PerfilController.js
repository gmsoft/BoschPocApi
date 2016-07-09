var PerfilModel          = require('../models/PerfilModel');
var ErrorHelper = require('../utils/ErrorHelper');
var cors = require('cors');

function init (router){
	router.route('/perfil')

		.post(cors(),function(req, res) {
			var perfil = new PerfilModel();      // create a new instance of the taller model
			perfil.name = req.body.name;  // set the tallers name (comes from the request)

			// save the taller and check for errors
			perfil.save(function(err, result) {
				ErrorHelper.errorHandler(err, res);
				res.json(result);
			});

		})
		.get(cors(),function(req, res) {
			PerfilModel.find(function (err, tallers) {
				ErrorHelper.errorHandler(err, res);
				res.json(tallers);
			})
		})
		.options(cors(),function(req, res) {
				console.log("OPTIONS");
				res.json("");
			});

	 router.route('/perfil/:id')
	 	.get(cors(),function(req, res) {
 			PerfilModel.findById(req.params.id, function (err, perfil) {
 				ErrorHelper.errorHandler(err, res);;
 				res.json(perfil);
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
