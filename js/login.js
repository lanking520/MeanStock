/// </// <reference path="angular.min.js" />
var myApp = angular.module("Mainmodule",[]);
var currentview = "login/logintable.html"
var mainController = function($scope){
  $scope.login = function(){
    if($scope.myEmail != undefined && $scope.myPassword != undefined){
      $scope.lalara = "Success!";
    }
    else{
      $scope.lalara = "";
    }
  }
  $scope.currView = "login/logintable.html";
  $scope.goreg = function(){$scope.currView = "login/registertable.html"}
};

myApp.controller("MainController",mainController);
