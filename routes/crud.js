var express = require('express');
var router = express.Router();
var fs = require('fs');

var url = require("url");
var apiclient = require("omdb-api-client");


	router.get('/crud/addMovie', function(req, res) {
		var requestedPath = req.url;
		console.log("inside addMovie");
		var jsoncontent = fs.readFileSync('data/Movies.json');
		if (requestedPath.indexOf("title") != -1) {
			requestedPath = req.url;
			console.log(requestedPath);
			//  var title =  requestedPath.substring(requestedPath.indexOf("Title")+6).trim() ;
			var title = req.query.title;
			console.log(title);
			omdb(title, function(err, data) {
				if (err) {
					return console.error(err);
				}
				console.log("in");
				if (data.length < 1) {
					res.writeHead(200, {
						'Content-Type': 'text/html'
					});
					res.end(data, 'utf-8');
					res.end();
					console.log("Not Found");
				} else {
					var jsonFile = fs.readFileSync('data/Movies.json');
					var json = JSON.parse(jsonFile);
					json.push(data);
					var addedJSON = JSON.stringify(json);
					fs.writeFileSync('data/Movies.json', addedJSON);
					res.render('crud');
				}
			});
		}
	});
	router.get('/deleteMovie', function (req, res) {
	//console.log("Got a DELETE request");
	requestedPath=req.url;
	console.log(requestedPath);
	if(requestedPath.indexOf("titlename") !=-1){
	 var movieID =  requestedPath.substring(requestedPath.indexOf("titlename")+10).trim();
	 console.log(movieID);
	var jsonFile = fs.readFileSync('data/Movies.json');
	var json = JSON.parse(jsonFile);
	for(var i=0;i<json.length;i++)
	{
		if(json[i].title==movieID)
		{
			console.log(json[i]);
			json.splice(i,1);
					var x=JSON.stringify(json);
			fs.writeFileSync('data/Movies.json',x);
		}
	}
	}
	});
