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


//Take input from the command line
var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

//Pull search term from command line
function userQuery(){
	rl.question("What would you like to search for? ", function(term) {
		var res = search(term);
		console.log("Querying WordCloud for", term);
		console.log(res);
		rl.close();
	});
}

//
function search(term){
	twit.search(term, function(data) {
		return data;
	}
}

function printTweets(data){
	for (i=0; i<data.statuses.length; i++){
	console.log(data.statuses[i].text);
}

//printTweets(search("Tinder"));

//Still have to add function that parses results to a list of words (tokens)