var UserModel          = require('../models/UserModel');
var cors = require('cors');

function init (router){
	router.route('/users')
		.post(function(req, res) {

			var user = new UserModel();      // create a new instance of the user model
			user.name = req.body.name;  // set the users name (comes from the request)
		  user.nick_name = req.body.nick_name;
			// save the user and check for errors
			user.save(cors(),function(err, result) {
				if (err)
					res.send(err);
				res.json(result);
			});

		}).get(cors(),function(req, res) {
			UserModel.find(function (err, users) {
				if (err)
					res.send(err);
				res.json(users);
			})
		});
	router.route('/users/:id')
		.get(cors(),function(req, res) {
			UserModel.findById(req.params.id, function (err, user) {
				if (err)
					res.send(err);
				res.json(user);
			})
		}).put(cors(),function(req, res) {
			UserModel.findById(req.params.id, function (err, user) {
			  if (err) res.send(err);
				user.name = req.body.name;  // set the users name (comes from the request)
			  user.nick_name = req.body.nick_name;
				console.log(user);
			  user.save(function (err) {
			    if (err){
						console.log(err);
						res.json(err);

					}
			    res.json(user);
			  });
			})
		}).options(cors(),function(req, res) {
				console.log("OPTIONS");
				res.json("");
			});

}
module.exports = {
	init : init
}
