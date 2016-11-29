/// </// <reference path="angular.min.js" />
var myApp = angular.module("Mainmodule",[]);
var currentview = "login/logintable.html"
var mainController = function($scope,$http,$log){
  $scope.login = function(){
    if($scope.myEmail != undefined && $scope.myPassword != undefined){
      $http({
    url: user.details_path, 
    method: "GET",
    params: {email: $myEmail, password:$myPassword}
    }).success(function(response) {$scope.result = response;});
    }
  }
  $scope.currView = "login/logintable.html";
  $scope.goreg = function(){$scope.currView = "login/registertable.html"}
  $scope.backhome= function(){$scope.currView = "login/logintable.html"}
};

myApp.controller("MainController",mainController);
