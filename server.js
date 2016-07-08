var express    = require('express');        // call express
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');

var app        = express();                 // define our app using express
var cors = require('cors');
var port       = process.env.PORT || 3000;        // set our port
var router     = express.Router();              // get an instance of the express Router
var db         = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
mongoose.connect('mongodb://localhost/bosch'); // connect to our database

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var UserController     = require('./controllers/UserController');

//Agrego controllers
UserController.init(router);

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// all of our routes will be prefixed with /api
app.use('/', router);
app.listen(port);
console.log('Start on port ' + port);
