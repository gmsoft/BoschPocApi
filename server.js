var express    = require('express');        // call express
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var SessionModel = require('./models/SessionModel');
var ErrorHelper = require('./utils/ErrorHelper');
var timeout = require('connect-timeout');

var app        = express();                 // define our app using express
var cors = require('cors');
var port       = process.env.PORT || 3000;        // set our port
var router     = express.Router();              // get an instance of the express Router
var db         = mongoose.connection;

app.use(timeout('5s'));
app.use(haltOnTimedout);
app.use(morgan('dev'));
db.on('error', console.error.bind(console, 'connection error:'));
mongoose.connect('mongodb://demobosch.eastus2.cloudapp.azure.com/bosch');
//mongoose.connect('mongodb://localhost/bosch'); // connect to our database

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var UserController     = require('./controllers/UserController');
var PerfilController     = require('./controllers/PerfilController');
var TallerController     = require('./controllers/TallerController');
var SolicitudServicioController = require('./controllers/SolicitudServicioController');
var SolicitudCotizacionController = require('./controllers/SolicitudCotizacionController');
var SessionController = require('./controllers/SessionController');

SessionController.init(router);//lo defino antes del middleware
app.all("*", cors());
// middleware to use for all requests
router.use(function(req, res, next) {

    if(req.method!="OPTIONS"){
      console.log(req.headers);
      if(req.headers.authorization==undefined){
      	console.log("sin header authorization");
        res.json(403, "forbidden 1");
      }else{

      SessionModel.find({token: req.headers.authorization}).exec(function(err, session ){
      	ErrorHelper.errorHandler(err, res);
      	console.log(session);
      	if(session.length>0){
      		next();

      	}else{
      		res.json(403, "forbidden 2");
      	}
      });
    }
  }else{
    next();
  }
     // make sure we go to the next routes and don't stop here
});
//Agrego controllers
UserController.init(router);
TallerController.init(router);
SolicitudServicioController.init(router);
SolicitudCotizacionController.init(router);
PerfilController.init(router);

function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

// all of our routes will be prefixed with /api
app.use('/', router);
app.listen(port);
console.log('Start on port ' + port);
