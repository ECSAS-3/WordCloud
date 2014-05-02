// var jquery = require('jquery');
// var $ = jquery.create();
$(function(){
	var firstString = "a hair's breath";
	var secondString = "a hare's breadth";

	var other = "windshield";
	var others = "windchill";

	var slaw = "cold slaw";
	var slaw2 = "cole slaw";

	var q=calculateVal(firstString);
	var p =calculateVal(secondString);
	//r= padZeros(q,p);
	//console.log("q: "+q+ "p: "+p+"r: "+r);

	console.log(getSoundex(firstString, secondString));

	console.log(damerauLevenshteinDistance(firstString, secondString));

	console.log("Windchill eggcorn:"+editex(other, others));
	console.log("Windchill  sound:" +getSoundex(other, others));

	console.log("Slaw eggcorn:"+getSoundex(slaw, slaw2));
	console.log("Slaw edit:" +editex(slaw, slaw2));
});



function damerauLevenshteinDistance(s, t) {
  // Determine the Damerau-Levenshtein distance between s and t
  if (!s || !t) {
    return 99;
  }
  var m = s.length;
  var n = t.length;      
  var charDictionary = new Object();

  /* For all i and j, d[i][j] holds the Damerau-Levenshtein distance
   * between the first i characters of s and the first j characters of t.
   * Note that the array has (m+1)x(n+1) values.
   */
  var d = new Array();
  for (var i = 0; i <= m; i++) {
    d[i] = new Array();
    d[i][0] = i;
  }
  for (var j = 0; j <= n; j++) {
    d[0][j] = j;
  }

  // Populate a dictionary with the alphabet of the two strings
  for (var i = 0; i < m; i++) {
    charDictionary[s.charAt(i)] = 0;
  }
  for (var j = 0; j < n; j++) {
    charDictionary[t.charAt(j)] = 0;
  }

  // Determine substring distances
  for (var i = 1; i <= m; i++) {
    var db = 0;
    for (var j = 1; j <= n; j++) {
      var i1 = charDictionary[t.charAt(j-1)];
      var j1 = db;
      var cost = 0;

      if (s.charAt(i-1) == t.charAt(j-1)) { // Subtract one to start at strings' index zero instead of index one
        db = j;
      } else {
        cost = 1;
      }
      d[i][j] = Math.min(d[i][j-1] + 1,                 // insertion
                         Math.min(d[i-1][j] + 1,        // deletion
                                  d[i-1][j-1] + cost)); // substitution
      if(i1 > 0 && j1 > 0) {
        d[i][j] = Math.min(d[i][j], d[i1-1][j1-1] + (i-i1-1) + (j-j1-1) + 1); //transposition
      }
    }
    charDictionary[s.charAt(i-1)] = i;
  }

  // Return the strings' distance
  return d[m][n];
}


//Soundex Algorithm

var toDelete = new Array("a", "e", "i", "o", "u", "y", "h", "w");
var labial = new Array("b", "f", "p", "v");
var weirdSounds = new Array("c", "g", "j", "k", "q", "s", "x", "z");
var alveolarStops = new Array("t", "d");
var liquids = new Array("l");
var nasals = new Array("m", "n");
var rhotics = new Array("r");

function calculateVal(a){		//used to change spelling to sound values
	a = a.split("");
	var nA = "";
	var j;
	var i;
	nA += a[0].toUpperCase();
	for(i=1; i<a.length; i++){
		if($.inArray(a[i], toDelete) !== -1){
			nA+=0;
		}
		if($.inArray(a[i], labial) !== -1){		//inArray finds the index and returns -1 if it doesn't exist
			nA += 1;
		}
		else if ($.inArray(a[i], weirdSounds) !==-1){
			nA += 2;
		}
		else if ($.inArray(a[i], alveolarStops) !== -1){
			nA += 3;
		}
		else if ($.inArray(a[i], liquids) !== -1){
			nA += 4;
		}
		
		else if ($.inArray(a[i], nasals) !== -1){
			nA += 5;
		}
		
		else if ($.inArray(a[i], rhotics) !== -1){
			nA += 6;
		}
		else{  //anything not in the preceding categories can be ignored
			continue;
		}
		
	}
	
	var j;
	for(j=0; j<nA.length; j++){
		if(nA.charAt(j) === nA.charAt(j+1)){
			nA = nA.substring(0, j)+nA.substring(j+1, nA.length);
		}
	}
	return nA;
}

function getSoundex(a, b){
	//calculate the Soundex distance between two strings
	var soundA = calculateVal(a);
	var soundB = calculateVal(b);
	
	if ( soundA.length !== soundB.length){
		if(soundB.length < soundA.length){
			//soundB = addZeros(soundB, soundA);
			soundA = soundA.substring(0, soundB.length-1);
		}
		else{
			//soundA = addZeros(soundA, soundB);
			soundB = soundB.substring(0, soundA.length-1);
			
		}
	}
	return (damerauLevenshteinDistance(soundA, soundB));
}


//Editex Algorithm

//Classes

var vow = new Array("a", "e", "i", "o", "u", "y");	//vowels; heaven help us
var bilab = new Array("b", "p");						//bilabial stops
var velar = new Array("c", "k", "q");					//velar stops
var alveolar = new Array("d", "t");						//alveolar stops
var approx = new Array("l", "r");						//laterals and rhotics (always classed together in phonetic analyses. Lemme know if you want to know more)
var nas = new Array("m", "n");							//nasals
var alvfric = new Array("g", "j");						//postalveolar voiced fricative
var bilabfric = new Array("f", "p", "v");				//bilabial fricative (voiced and unvoiced placed together?)
var esy = new Array("s", "x", "z");					//alveolar fricatives
var shy = new Array("c", "s", "z");						//postalveolar unvoiced fricative

//index will be used as rating system
var masterClass = new Array(vow, bilab, velar, alveolar, approx, nas, alvfric, bilabfric, esy, shy);

function checkChar(a, b){
	if( a=== b){
		return 0;
	}
	else{
		for(entry = 0; entry<masterClass.length; entry++){
			if($.inArray(a, masterClass[entry]) !== -1){
				if($.inArray(b, masterClass[entry])!== -1){
					return 1;
				}
			}
		}		//make sure this works!
	}
	return 2;
}

function editex(stringA, stringB){
	//initialize the matrix
	var board = new Array(stringA.length);
	var g;
	for (g = 0; g< stringA.length; g++){
		board[g] = new Array(stringB.length);
	}
	
	var i;
	var j;
	board[0][0] = 0;
	for(i=1; i<stringA.length; i++){																		//initializing values
		board[i][0] = board[i-1][0]+checkChar(stringA.charAt(i-1), stringA.charAt(i)); //checks for matching letters within the string	
	}
	for(i=1; i<stringB.length; i++){
		board[0][i] = board[0][i-1]+checkChar(stringB.charAt(i-1), stringB.charAt(i));
	}
	
	for(i=1; i<stringA.length; i++){
		for(j = 1; j<stringB.length; j++){
			board[i][j] = Math.min( board[i-1][j] + checkChar(stringA.charAt(i-1), stringA.charAt(i)),
											board[i][j-1] + checkChar(stringB.charAt(j-1), stringB.charAt(j)),
											board[i-1][j-1] + checkChar(stringA.charAt(i), stringB.charAt(j)));
			
		}
	}
	
	return board[stringA.length-1][stringB.length-1];
}
