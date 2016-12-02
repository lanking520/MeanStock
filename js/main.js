/// </// <reference path="angular.min.js" />
/// </// <reference path="highcharts.js" />
var myApp = angular.module("Mainmodule",[]);
var preUrl = "http://35.163.33.0";
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
        // hide chart
        $scope.mychart = true;
        $http({
            url: preUrl+"/stock", 
            method: "GET",
            params: {UserID : $scope.personalInfo.email}
        }).success(function(response) {
            $scope.mystocks = response;
            var qstock = "";
            for(i=0;i < $scope.mystocks.length;i++){qstock += $scope.mystocks[i]["Symbol"] + ",";}
            $http({
                url: "https://www.google.com/finance/info", 
                method: "GET",
                params: {client:"ig",q : qstock}
                }).success(function(response) {
                    response = response.substring(3);
                    response = JSON.parse(response);
                    for(i=0;i < $scope.mystocks.length;i++){
                        $scope.mystocks[i]["price"] = response[i]["l"];
                        $scope.mystocks[i]["pcls"] = response[i]["pcls_fix"];
                        $scope.mystocks[i]["c_fix"] = response[i]["c_fix"];
                    }
                });
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
    
    $scope.checkstock = function(datapack){
        $scope.mychart = false;
        var endDate = new Date().getTime();
        var startDate = endDate-2629746000;
        var startDate = new Date(startDate).toJSON().slice(0,10);
        var endDate = new Date(endDate).toJSON().slice(0,10);
        var sql = 'select * from yahoo.finance.historicaldata where symbol in (\"'+datapack.Symbol+'\") and startDate = "' + startDate + '" and endDate = "' + endDate + '"';
        $http({
            url: 'http://query.yahooapis.com/v1/public/yql', 
            method: "GET",
            params: {q:sql, env : 'http://datatables.org/alltables.env', format:"json"}
        }).success(function(response){
            response = response["query"]["results"]["quote"];
            var x_label = [];
            var y_label = [];
            for(i=0;i< response.length;i++){
                x_label.unshift(response[i]["Date"].substring(8));
                y_label.unshift(parseFloat(response[i]["Open"]));
            }
            Highcharts.chart('datachart', {
            title: {
                text: datapack.Name+" From " +startDate+" to "+endDate
            },
            xAxis: {
            categories: x_label
            },
            series: [{
                data: y_label
            }]
    });
        });
    }

    $scope.deletestock = function(datapack){
        $http({
            url: preUrl+"/stock/", 
            method: "DELETE",
            params:{UserID:datapack.UserID,Symbol:datapack.Symbol}
             }).success(function(response) {
                 var index = $scope.mystocks.indexOf(datapack);
                 $scope.mystocks.splice(index,1);
             });
    }
    $scope.logout = function(){
        $window.sessionStorage.setItem("PersonalInfo","");
        $window.location.href = '../index.html';
    }

}

myApp.controller("MainController",mainController);