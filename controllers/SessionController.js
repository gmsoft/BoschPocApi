var UserModel          = require('../models/UserModel');
var SessionModel          = require('../models/SessionModel');
var md5 = require('md5');
var cors = require('cors');
var ErrorHelper = require('../utils/ErrorHelper');

function init (router){
	router.route('/session')
	.get(cors(), function(req, res){
		SessionModel.find().exec(function(err, session){
			ErrorHelper.errorHandler(err, session);
			res.json(session);
		})
	})
	.post(cors(), function(req, res){
		nick_name = req.body.nick_name;
		password = req.body.password;
		console.log(req.body);
		UserModel.find({$and: [{nick_name: nick_name}, {password: password}]}).exec(function(err, user){
			console.log(user);
			ErrorHelper.errorHandler(err, res);
			if(user.length>0){
				var token = md5(nick_name+password+Date.now());
				sessionModel = new SessionModel();
				sessionModel.token = token;
				sessionModel.user = user[0]._id;

				sessionModel.save(function(err, session){
					ErrorHelper.errorHandler(err, res);
					SessionModel.findById(session._id).populate("user").exec(function(error, session_true){
							ErrorHelper.errorHandler(err, res);
							res.json(session_true);
					});
				});
			}else{
				res.json(400, "bad request");
			}
		});
	})
	.options(cors(),function(req, res) {
			console.log("OPTIONS");
			res.json("");
		});
}

module.exports = {
	init:init
}
