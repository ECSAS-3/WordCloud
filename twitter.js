//twtitter.js
//CS 326 Spring 2014

//Christopher Scott

var util = require('util'),
twitter = require('twitter');
var twit = new twitter({
	consumer_key: '5fBdLw6wzZL9S5AKbfaVfZnGn',
	consumer_secret: 'SGyNotse02dMUP8C6ehYJ1zGmj1vV95TV53N3cMvGopEUdHFm5',
	access_token_key: '2437602979-m8kAsy58Sezf5UJ7T18BUndgcyTKhu9gZCJYrda',
	access_token_secret: '3mHJ98q7stLjSUvY1Wp8aBIa5mqSkpkQZCINXwLqo3Si3'
});

var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question("What would you like to search for? ", function(input) {
	twit.search(input, function(data) {
		for (i=0; i<data.statuses.length; i++){
			console.log(data.statuses[i].text);
		}
	});
	console.log("Querying WordCloud for", input);
	rl.close();
});