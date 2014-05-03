'use strict';

//wordcloud init
var showWC = false;
var listWords = [];
var listWordSize = [];
var listNumWords = "1";

angular.module('wordCloudApp', ['d3', 'nvd3ChartDirectives']);
//module.exports

/*---------------------FRONT-END----------------*/
/*
 * Search Bar
 */
 function searchCtrl($scope) {
   $scope.searchData = "";

   $scope.search = function() {
    console.log($scope.searchData);

        // take user input, split string into array
        var words = ($scope.searchData).split(" ").sort();
        for (var i = 0; i < words.length; i++) {
            listWords.push(words[i]);
        }
        $scope.searchData = "";

        //console.log(listWords);
        listWordSize.push("50");
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

$.getScript("./javascripts/twitter.js", function(){
    tokenizer("doge", function(w){
        for (word in w){
            if(w[word]>0){
                console.log("%s - %d", word, w[word]*2);
            }
        }
    });
});
