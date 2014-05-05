//twtitter.js
//CS 326 Spring 2014

//NLP Setup
var natural = require('natural');
var jaro_winkler = natural.JaroWinklerDistance;		//handling the strings that are close together
var metaphone = natural.DoubleMetaphone;					//handling what words sound closer together

//Stripping formatting

testData = {"yellow": 5, "green": 6, "cold":4, "cole":3, "grumpy": 18, "halcion": 2, "halcyon":9, "tootsie":4, "totsie":1, "trollop": 6, "hexagon":8, "phantom": 10, "tryst":2, "@trixr4kids": 3}

function findHashTags(theDictionary, symb){
	var hashTagTable = {};
	for(word in theDictionary){
		if(word.charAt(0) === symb){
			hashTagTable[word.toLowerCase()] = theDictionary[word.toLowerCase()]*2;
		}
	}
	return hashTagTable;
}
//Pass in the entire dictionary of words to find which ones could be condensed and which ones might be eggcorns
function testSimilarities(data){
	//console.log("IT FUCKING GOT TO THE METHOD");
	//console.log("What is the length?", data.length);
	for(var i in data){
		//console.log("IT FUCKING GOT TO THE FIRST BLOCK");
		for(var j in data){
			//console.log("IS IT EVEN FUCKING GETTING HERE?");
			//console.log("first word: ", i);
			//console.log("second word: ", j);
			//console.log(natural.JaroWinklerDistance(i,j));
			if(i !== j){
				if (natural.JaroWinklerDistance(i, j)>.85){ 		//check to see if the strings are remotely close together
					console.log("word1: ", i, " word2: ", j);
					console.log(natural.JaroWinklerDistance(i,j));
					if(Math.min(data[i],data[j])/Math.max(data[i],data[j])<.3){	//if one word has significantly higher numbers than the other
						console.log("One of these things is not a word");
						if(data[i]>data[j]){									//merge the words
							data[i]+=data[j];
							delete data[j];
						}
						else{
							data[j]+=data[i];
							delete data[i];
						}
					}
					else if(metaphone.compare(i, j)){						//if they're close in ratings, they might be eggcorns		
						console.log("These might be eggcorns"); //not sure what to do here.
						console.log("First: ", data[i]);
						console.log("Second: ", data[j]);
						data[j]+=data[i]
						data[i]+=data[j]

					}
				}
			}
		}
		
	}
	return data;
}
//myHash = findHashTags(globalArray, "#");
var q =testSimilarities(testData);
console.log(q);

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

