/// </// <reference path="angular.min.js" />
var myApp = angular.module("Mainmodule",[]);
var preUrl = "http://localhost:8008";
var mainController = function($scope,$http,$log,$window){
    $scope.currView="./home.html";
    $scope.init = function(){
        var data = $window.sessionStorage.getItem("PersonalInfo");
        if(data == "" || data == undefined)
        {$window.location.href = '../index.html';}
        $scope.personalInfo = JSON.parse(data)[0];
    }
    $scope.homeinit = function(){
        //Search Config
        $http.get("../data/companylist.json").success(function(response){
        $scope.stocks = response});
        // Hider Config
        $scope.successhider = true;
        $scope.failhider = true;
    }
    $scope.stockinit = function(){
        $http({
            url: preUrl+"/stock", 
            method: "GET",
            params: {UserID : $scope.personalInfo.email}
        }).success(function(response) {
            $scope.mystocks = response;
        });
    }
    $scope.addstock = function(datapack){
        $http({
            url: preUrl+"/stock", 
            method: "GET",
            params: {Symbol: datapack.Symbol, UserID : $scope.personalInfo.email}
        }).success(function(response) {
            if(response == "")
            {
                datapack["UserID"] = $scope.personalInfo.email;
                $http({
                    url: preUrl+"/stock", 
                    method: "POST",
                    data: datapack
                });
                $scope.successhider = false;
                $scope.failhider = true
            }
            else
            {
                $log.debug("Done");
                $scope.failhider = false;
                $scope.successhider = true;
            }
        });
    }
    $scope.logout = function(){
        $window.sessionStorage.setItem("PersonalInfo","");
        $window.location.href = '../index.html';
    }

}

myApp.controller("MainController",mainController);