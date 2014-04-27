'use strict';

//wordcloud init
var showWC = false;
var listWords = ["Hi"];
var listWordSize = ["100"];
var listNumWords = "1";


angular.module('wordCloudApp', ['d3', 'nvd3ChartDirectives']);


//twitter init
//(make sure below angular.module!)
var twitter = require('twitter');
var twit = new twitter({
	consumer_key: '5fBdLw6wzZL9S5AKbfaVfZnGn',
	consumer_secret: 'SGyNotse02dMUP8C6ehYJ1zGmj1vV95TV53N3cMvGopEUdHFm5',
	access_token_key: '2437602979-m8kAsy58Sezf5UJ7T18BUndgcyTKhu9gZCJYrda',
	access_token_secret: '3mHJ98q7stLjSUvY1Wp8aBIa5mqSkpkQZCINXwLqo3Si3'
});


/*---------------------BACK-END----------------*/
/*
 *TWITTER
 */
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

function tokenizer(term, callback){
	twit.search(term, count=50, function(data) {
		var wordArray = {};
		var len = data.statuses.length;
		//console.log(len);
		for (var i=0; i<len; i++){
			//console.log(data.statuses[i]);
			var text = data.statuses[i].text;
			var res = text.split(" ");
			//console.log(res);
			for (var j=0; j<res.length; j++){
				if (res[j].toLowerCase() in wordArray){
					wordArray[res[j]]++;
					//console.log(wordArray.res[j]);
				} else {
					wordArray[res[j].toLowerCase()] = 1;
				}
			}
		}callback(wordArray);
	});
}

//userQuery();
tokenizer("tinder", function(w){
	//console.log(w);
	for (word in w){
		if(w[word]>1){
			console.log("%s - %d", word, w[word]);
		}
	}
});

/*---------------------FRONT-END----------------*/
/*
 * Search Bar
 */
function searchCtrl($scope) {
     $scope.searchData = "";

     $scope.search = function() {
        console.log($scope.searchData);
        $scope.searchData = "";

        listWords.push("Test");
        //console.log(listWords);
        listWordSize.push("200");
        listNumWords = (parseInt(listNumWords)+1).toString();

        showWC = !showWC;

     };
};

/*
 * Visualizations
 */
function wordCloudCtrl($scope) {
    $scope.showWC = function () {
      return showWC;
  };
    //console.log($scope);
    $scope.wordsIn = listWords;

    //describes size of word matching scope.wordsIn by index
    $scope.wordSize = listWordSize;
    $scope.numWords = listNumWords;

    $scope.$watch("wordsIn", function(){
        $scope.wordsIn = listWords;
        $scope.wordSize = listWordSize;
        $scope.numWords = listNumWords;
    }, true);

};

