var UserModel          = require('../models/UserModel');

function init (router){
	router.route('/users')
		.post(function(req, res) {
			
			var user = new UserModel();      // create a new instance of the user model
			user.name = req.body.name;  // set the users name (comes from the request)
		
			// save the user and check for errors
			user.save(function(err, result) {
				if (err)
					res.send(err);
				res.json(result);
			});
			
		}).get(function(req, res) {
			UserModel.find(function (err, users) {
				if (err)
					res.send(err);
				res.json(users);
			})
		});
}
	
module.exports = {
	init : init
}