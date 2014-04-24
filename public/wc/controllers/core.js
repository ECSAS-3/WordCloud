'use strict';

var showWC = false;
var listWords = ["Hi"];
var listWordSize = ["100"];
var listNumWords = "1";

angular.module('wordCloudApp', ['d3', 'nvd3ChartDirectives']);


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


function pieChartCtrl($scope){
    $scope.exampleData = [
    {
        key: "One",
        y: 10
    },
    {
        key: "Two",
        y: 10
    },
    {
        key: "Three",
        y: 10
    },
    {
        key: "Four",
        y: 20
    }
    ];

    $scope.xFunction = function(){
        return function(d) {
            return d.key;
        };
    }
    $scope.yFunction = function(){
        return function(d) {
            return d.y;
        };
    }

    $scope.descriptionFunction = function(){
        return function(d){
            return d.key;
        }
    }
}