var UserModel          = require('../models/UserModel');
var PerfilModel          = require('../models/PerfilModel');
var cors = require('cors');
var ErrorHelper = require('../utils/ErrorHelper');

function init (router){
	router.route('/users')

		.post(function(req, res) {
			var user = new UserModel();      // create a new instance of the user model
			user.name = req.body.name;  // set the users name (comes from the request)
		  user.nick_name = req.body.nick_name;
			PerfilModel.findOne({name:'cliente'}, function(err, perfil){
				ErrorHelper.errorHandler(err, res);
				user.perfil = perfil._id;
				// save the user and check for errors
				user.save(function(err, user_new) {
					ErrorHelper.errorHandler(err, res);
					res.json(user_new);
				});

			});

		}).get(function(req, res) {
			UserModel.find(function (err, users) {
				ErrorHelper.errorHandler(err, res);
				res.json(users);
			})
		})

		.options( function(req, res) {
				console.log("OPTIONS");
				res.json("");
			});

	router.route('/users/:id')

		.get(function(req, res) {
			UserModel.findById(req.params.id, function (err, user) {
				ErrorHelper.errorHandler(err, res);
				res.json(user);
			})
		})

		.delete(function(req, res) {
			UserModel.findByIdAndRemove(req.params.id, function (err, user) {
				ErrorHelper.errorHandler(err, res);
				res.json(user);
			})
		})
		.put(function(req, res) {
			UserModel.findById(req.params.id, function (err, user) {
			  if (err) res.send(err);
				user.name = req.body.name;  // set the users name (comes from the request)
			  user.nick_name = req.body.nick_name;
				if(req.body.password){
					user.password = req.body.password;
				}
				if(req.body.perfil){
					user.perfil = req.body.perfil;
				}
				console.log(user);
			  user.save(function (err) {
			    ErrorHelper.errorHandler(err, res);
			    res.json(user);
			  });
			})
		})

		.options(function(req, res) {
				console.log("OPTIONS");
				res.json("");
			});

}
module.exports = {
	init : init
}
