//twtitter.js
//CS 326 Spring 2014

//Christopher Scott

//Twitter Setup
var util = require('util'),
twitter = require('twitter');
var twit = new twitter({
	consumer_key: '5fBdLw6wzZL9S5AKbfaVfZnGn',
	consumer_secret: 'SGyNotse02dMUP8C6ehYJ1zGmj1vV95TV53N3cMvGopEUdHFm5',
	access_token_key: '2437602979-m8kAsy58Sezf5UJ7T18BUndgcyTKhu9gZCJYrda',
	access_token_secret: '3mHJ98q7stLjSUvY1Wp8aBIa5mqSkpkQZCINXwLqo3Si3'
});

//Pull search term from command line
function userQuery(){
	//Take input from the command line
	var readline = require('readline');

	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.question("What would you like to search for? ", function(term) {
		twit.search(term, function(data) {
			console.log(data);
		});
		console.log("Querying WordCloud for", term);
		rl.close();
	});
}

function printTweets(term){
	twit.search(term, function(data) {
		for (i=0; i<data.statuses.length; i++){
			console.log(data.statuses[i].text);
		}
	});
}

var wordArray = {}
function tokenizer(term){
	twit.search(term, function(that) {
		var data = that;
		console.log(data);
		for (var i=0; i<data.statuses.length; i++){
			var text = data.statuses[i].text;
			var res = text.split(" ");
			for (var j=0; j<res.length; j++){

				if (wordArray.res[j] === null){
					wordArray.res[j] = 1;
					//console.log(wordArray.res[j]);
				} else {
					wordArray.res[j]++;
				}
			}
		}
	});
}



//userQuery();
tokenizer("tinder");
for (var i=0; i<wordArray.length; i++){
	console.log(wordArray[i][0]);
}