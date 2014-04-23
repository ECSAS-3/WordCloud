'use strict';

angular.module('wordCloudApp', ['d3', 'nvd3ChartDirectives']);

function searchCtrl($scope) {
     $scope.searchData = "";

     $scope.search = function() {
        console.log($scope.searchData);
     };
};

function wordCloudCtrl($scope) {
    $scope.wordsIn =
        ["Hallo","Test","Lorem", "yo", "arg", "phone", "mac"];

    //describes size of word matching scope.wordsIn by index
    $scope.wordSize = ["30", "50", "100", "50", "100", "100", "200"];

    $scope.numWords = "7";
}
  // .controller('MainCtrl', ['$scope',function ($scope) {

  //       $scope.myOnClickFunction = function(element){
  //           console.log("click",element);
  //       }

  //       $scope.myOnHoverFunction = function(element){
  //           console.log("hover",element);
  //       }
  // }]);


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