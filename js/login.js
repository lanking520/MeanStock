/// </// <reference path="angular.min.js" />
var myApp = angular.module("Mainmodule",[]);
var currentview = "login/logintable.html"
var mainController = function($scope,$http){
  $scope.login = function(){
    if($scope.myEmail != undefined && $scope.myPassword != undefined){
      $http.get("http://date.jsontest.com/")
      .success(function(response) {$scope.result = response;});
    }
  }
  $scope.currView = "login/logintable.html";
  $scope.goreg = function(){$scope.currView = "login/registertable.html"}
  $scope.backhome= function(){$scope.currView = "login/logintable.html"}
};

myApp.controller("MainController",mainController);
