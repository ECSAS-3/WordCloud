//twtitter.js
//CS 326 Spring 2014

//Christopher Scott

var globalArray = {};

function tokenizer(term, callback){
	//Twitter Setup
	var util = require('util'),
	twitter = require('twitter');
	var twit = new twitter({
		consumer_key: '5fBdLw6wzZL9S5AKbfaVfZnGn',
		consumer_secret: 'SGyNotse02dMUP8C6ehYJ1zGmj1vV95TV53N3cMvGopEUdHFm5',
		access_token_key: '2437602979-m8kAsy58Sezf5UJ7T18BUndgcyTKhu9gZCJYrda',
		access_token_secret: '3mHJ98q7stLjSUvY1Wp8aBIa5mqSkpkQZCINXwLqo3Si3'
	});

<<<<<<< HEAD
=======
function printTweets(term){
	twit.search(term, function(data) {
		for (i=0; i<data.statuses.length; i++){
			console.log(data.statuses[i].text);
		}
	});
}

var globalArray = {};
function tokenizer(term, callback){
>>>>>>> FETCH_HEAD
	twit.search(term, function(data) {
		console.log("data statuses is type", typeof(data.statuses));
		var wordArray = {};
		console.log("Hey baby ",data.statuses);
		var len = data.statuses.length;
		//console.log(len);
		for (var i=0; i<len; i++){
			//console.log(data.statuses[i]);
			var text = data.statuses[i].text;
			var res = text.split(" ");
			//console.log(res);
			for (var j=0; j<res.length; j++){
				var currWord = res[j].toLowerCase();
				currWord = currWord.replace(/[\.,-\/!$%\^&\*;:{}=\-_`~()]/g,"");
				if(isStopWord(currWord)){
					continue;
				}
				else if (currWord in wordArray){
					wordArray[currWord]++;
					//console.log(wordArray.res[j]);
				} else {
					wordArray[currWord] = 1;
				}
			}
		}
		globalArray = wordArray;
		callback(wordArray);
	});
}

tokenizer("doge", function(w){
	for (word in w){
		if(w[word]>0){
			console.log("%s - %d", word, w[word]*2);
		}
	}
});

//Stop Word Functions and Such
var stopWord = new Array("I","a","about","an","are","as","at","be","by","for","from","how","in","is","it","of","on","or","that","that's",
	"thats","the","this","to","too","was","what","what's","whats","when","when's","whens","where","where's","wheres",
	"who","who's","whos","whose","will","with","the");

function isStopWord(word){
	return stopWord.indexOf(word) >-1;
}

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