/// </// <reference path="angular.min.js" />
var currentPage = "main.html";
var myApp = angular.module("Mainmodule",[]);

var mainController = function($scope){
  $scope.message = "Welcome to Mean Stock!";
  $scope.currView = currentPage;
};

myApp.controller("MainController",mainController);