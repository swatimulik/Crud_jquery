const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));


const mongodb = require('mongodb').MongoClient;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}) );

var jokes=[{setup:"Our wedding was so beautiful,",punchline:"even the cake was in tiers", votes: 0},{setup:"I'm reading a book on the history of glue",punchline:"I just can't seem to put it down", votes: 0},{setup:"What do you call an Argentinian with a rubber toe?",punchline:"Roberto", votes: 0}];
var uri = "mongodb://swati:hello@ds145385.mlab.com:45385/jokesdb";


var coll;


	mongodb.connect(uri,function(err,db) {
			if(err) {return console.log(err);}
			coll = db.collection('jokes');
				app.listen(3000,function(){
				console.log('listening onport 3000');
				});
	});


	app.get('/', function(req, res){
	res.sendFile(__dirname+'/index.html');
	
	});


	app.post('/jokes',function(req,res) {
	
		coll.save(req.body,function(err,result){
			if(err) {
			return console.log(err);
			}
		coll.find().toArray( function(err, results){		
			res.send(results);
		});
		});
});


	app.delete('/jokes', function(req, res) {
		coll.findOneAndDelete({setup: req.body.setup}, function(err, result)  {
			if (err) return res.send(500, err);
		});
		coll.find().toArray( function(err, results){		
			res.send(results);
		
		});
		
});

	app.put('/jokes', function(req, res) {
		coll.findOneAndUpdate(
			{setup: req.body.setup},
				{$set:
					{setup:req.body.setup1,
					punchline: req.body.punchline1
					}
				});
			coll.find().toArray( function(err, results){		
			res.send(results);
		
			});
	});
