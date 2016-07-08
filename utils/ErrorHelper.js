function errorHandler (err, res){
	if (err){
	console.log(err);
	res.send(500, err);

	}
}

module.exports = {
	errorHandler : errorHandler
}