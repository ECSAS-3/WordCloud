'use strict';

//wordcloud init
var showWC = false;
var listWords = ["Hi"];
var listWordSize = ["100"];
var listNumWords = "1";

angular.module('wordCloudApp', ['d3', 'nvd3ChartDirectives']);
module.exports

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

