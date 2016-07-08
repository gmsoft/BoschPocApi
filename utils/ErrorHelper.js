function errorHandler (err, res){
	if (err){
	console.log(err);
	res.send(err);
	}
}

module.exports = {
	errorHandler : errorHandler
}