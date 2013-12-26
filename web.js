var appInstance = {
	expressApp : null,
	dataObj : null,
	ee : null,
	csvConverter : null,
	csvFileName : "./raw.csv"
};

var express = require('express');
var converter = require("csvtojson").core.Converter;
var eventEmitter = require('events').EventEmitter;


appInstance.expressApp = express();
appInstance.expressApp.use(express.static(__dirname + '/www/dist'));
appInstance.expressApp.use(express.bodyParser());
appInstance.expressApp.use(express.methodOverride());
appInstance.expressApp.use(express.logger());
appInstance.expressApp.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
}));



appInstance.csvConverter = new converter();
appInstance.csvConverter.from(appInstance.csvFileName);
appInstance.ee = new eventEmitter();

//end_parsed will be emitted once parsing finished
appInstance.csvConverter.on("end_parsed", function(jsonObj){
	"use strict"; // linter ;_; 

	appInstance.dataObj = jsonObj;
	appInstance.ee.emit("end_parsed");

});


appInstance.ee.on('end_parsed', function(){
	appInstance.expressApp.get('/data', function(req, res){
		res.send(appInstance.dataObj);
	});
	
	appInstance.expressApp.get('/', function(req, res){
		res.redirect("/index.html");
		//res.send(index.html);
	});

	var port = process.env.PORT || 8081;
	appInstance.expressApp.listen(port);

});
