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

appInstance.csvConverter = new converter();
appInstance.csvConverter.from(appInstance.csvFileName);
appInstance.ee = new eventEmitter();

/**/
//Converter Class
//var Converter = require("csvtojson").core.Converter;

//CSV File Path or CSV String or Readable Stream Object
//var csvFileName = "./raw.csv";

//new converter instance
//appInstance.csvConverter = new Converter();

//end_parsed will be emitted once parsing finished
appInstance.csvConverter.on("end_parsed", function(jsonObj){
	"use strict"; // linter ;_; 

	appInstance.dataObj = jsonObj;
	appInstance.ee.emit("end_parsed");
	//console.log(appInstance);
    //console.log(jsonObj); //here is your result json object
    //this.dataObj = jsonObj;

});


appInstance.ee.on('end_parsed', function(){
	appInstance.expressApp.get('/data', function(req, res){
		res.send(appInstance.dataObj);
	});
	/*appInstance.expressApp.get('/', function(req, res){
		res.send(index.html);
	});*/
	var port = process.env.PORT || 8008;
	appInstance.expressApp.listen(port);

});

/*
appInstance.expressApp.get('/', function(req, res){
	res.send("boz");
});

appInstance.expressApp.listen(8008);
*/


/*
app.get('/', function(req, res){
	res.send(this.dataObj);
});

app.listen(8008);
*/

//read from file
//appInstance.csvConverter.from(csvFileName);





/**
 * @see http://www.senchalabs.org/connect/
 */
 /*
var connect = require('connect');
var app = connect()
	.use(connect.basicAuth('username', 'password'))
	.use(connect.static('www'))
	.listen(process.env.PORT || 8080)
*/