/// </// <reference path="angular.min.js" />
var myApp = angular.module("Mainmodule",[]);

var mainController = function($scope,$http,$log,$window){
    $scope.init = function(){
        var data = $window.sessionStorage.getItem("PersonalInfo");
        if(data == "" || data == undefined)
        {$window.location.href = '../index.html';}
        $scope.personalInfo = JSON.parse(data);
        $scope.currView="./home.html";
    }
    $scope.logout = function(){
        $window.sessionStorage.setItem("PersonalInfo","");
        $window.location.href = '../index.html';
    }

}

myApp.controller("MainController",mainController);