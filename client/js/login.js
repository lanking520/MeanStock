/// </// <reference path="angular.min.js" />
var myApp = angular.module("Mainmodule",[]);
var preUrl = "http://localhost:8008";
var mainController = function($scope,$http,$log,$window){
  $scope.failhider = true;
  // Login Logic
  $scope.login = function(){
    if($scope.myEmail != undefined && $scope.myPassword != undefined){
    $http({
            url: preUrl+"/user", 
            method: "GET",
            params: {email: $scope.myEmail, password:$scope.myPassword}
    }).success(function(response) {
      if (response == ""){$scope.failhider = false;}
      else{
        $window.sessionStorage.setItem("PersonalInfo", JSON.stringify(response));
        $window.location.href = '/main/main.html';
      }
    });
    }
  };
  // Register Logic
  $scope.register = function(){
    if($scope.myName != undefined && $scope.myEmail != undefined && $scope.myPassword != undefined){
    $http({
            url: preUrl+"/user", 
            method: "POST",
            data: {email: $scope.myEmail, password:$scope.myPassword, name:$scope.myName}
    }).success(function(response) {
      if (response == ""){$scope.failhider = false;}
      else{
        $scope.currView = "login/logintable.html";
      }
    });
    }
  };
  $scope.currView = "login/logintable.html";
  $scope.goreg = function(){$scope.currView = "login/registertable.html";$scope.failhider = true;}
  $scope.backhome= function(){$scope.currView = "login/logintable.html";$scope.failhider = true;}
};

myApp.controller("MainController",mainController);
