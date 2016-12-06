/// </// <reference path="angular.min.js" />
/// </// <reference path="highcharts.js" />
var myApp = angular.module("Mainmodule", []);
var preUrl = "http://35.163.33.0";
var mainController = function ($scope, $http, $log, $window) {
    $scope.currView = "./home.html";
    $scope.init = function () {
        var data = $window.sessionStorage.getItem("PersonalInfo");
        if (data == "" || data == undefined)
        { $window.location.href = '../'; }
        $scope.personalInfo = JSON.parse(data)[0];
    }
    $scope.homeinit = function () {
        //Search Config
        $http.get("../data/companylist.json").success(function (response) {
            $scope.stocks = response
        });
        // Hider Config
        $scope.successhider = true;
        $scope.failhider = true;
    }
    $scope.stockinit = function () {
        // hide chart
        $scope.mychart = true;
        $http({
            url: preUrl + "/stock",
            method: "GET",
            params: { UserID: $scope.personalInfo.email }
        }).success(function (response) {
            $scope.mystocks = response;
            var qstock = "";
            for (i = 0; i < $scope.mystocks.length; i++) { qstock += $scope.mystocks[i]["Symbol"] + ","; }
            $http({
                url: "http://google-stocks.herokuapp.com/",
                method: "GET",
                params: { code: qstock },
                contentType: "application/json; charset=utf-8"
            }).success(function (response) {
                for (i = 0; i < $scope.mystocks.length; i++) {
                    $scope.mystocks[i]["price"] = response[i]["l"];
                    $scope.mystocks[i]["pcls"] = response[i]["pcls_fix"];
                    $scope.mystocks[i]["c_fix"] = response[i]["c_fix"];
                }
            });
        });
    }

    $scope.siminit = function () {
        $scope.newuser = true;
        $scope.olduser = true;
        $scope.buyform = true;
        $http({
            url: preUrl + "/balance",
            method: "GET",
            params: { UserID: $scope.personalInfo.email }
        }).success(function (response) {
            if (response == "") {
                $scope.newuser = false;
            }
            else {
                response.sort(function (a, b) {
                    var c = new Date(a.Time);
                    var d = new Date(b.Time);
                    return d - c;
                });
                $scope.balance = response;
                $scope.olduser = false;
            }
        });
        $http({
            url: preUrl + "/stocksim",
            method: "GET",
            params: { UserID: $scope.personalInfo.email }
        }).success(function (response) {
            response.sort(function (a, b) {
                var c = new Date(a.Time);
                var d = new Date(b.Time);
                return d - c;
            });
            $scope.purchasedstock = response;
            var qstock = "";
            for (i = 0; i < $scope.purchasedstock.length; i++) { qstock += $scope.purchasedstock[i]["Symbol"] + ","; }
            $http({
                url: "http://google-stocks.herokuapp.com/",
                method: "GET",
                params: { code: qstock },
                contentType: "application/json; charset=utf-8"
            }).success(function (response) {
                for (i = 0; i < $scope.purchasedstock.length; i++) {
                    $scope.purchasedstock[i]["price"] = response[i]["l"];
                }
            });
        });
    }

    $scope.addbalance = function (type) {
        var currdate = new Date();
        var balance = 0;
        if ($scope.balance != undefined) { balance = $scope.balance[0].Balance; }
        $http({
            url: preUrl + "/balance",
            method: "POST",
            data: { UserID: $scope.personalInfo.email, Balance: balance + $scope.newbalance, Time: currdate, Type: type }
        }).success(function (response) {
            $scope.balance.unshift(response);
            if (!$scope.newuser) {
                $scope.newuser = true;
                $scope.olduser = false;
            }
        });
    }

    $scope.deletebalance = function (datapack) {
        $http({
            url: preUrl + "/balance/",
            method: "DELETE",
            params: { Time: datapack.Time, Type: datapack.Type, UserID: datapack.UserID, Balance: datapack.Balance }
        }).success(function (response) {
            var index = $scope.balance.indexOf(datapack);
            $scope.balance.splice(index, 1);
        });
    }

    $scope.buycheck = function (datapack) {
        if ($scope.buyform == true || datapack != $scope.currstock) {
            $scope.currstock = datapack;
            $http({
                url: "http://google-stocks.herokuapp.com/",
                method: "GET",
                params: { code: $scope.currstock.Symbol },
                contentType: "application/json; charset=utf-8"
            }).success(function (response) {
                $scope.currstock["price"] = response[0]["l"];
                $scope.currstock["pcls"] = response[0]["pcls_fix"];
                $scope.currstock["c_fix"] = response[0]["c_fix"];
            });
            $scope.failhider = true;
            $scope.buyform = false;
        }
        else {
            $scope.buyform = true;
        }
    }

    $scope.buystock = function () {
        var currdate = new Date();
        var balance = 0;
        if ($scope.balance != undefined) { balance = $scope.balance[0].Balance; }
        if (balance - $scope.stocknum * $scope.currstock.price < 0) {
            $scope.failhider = false;
        }
        else {
            $http({
                url: preUrl + "/balance",
                method: "POST",
                data: { UserID: $scope.personalInfo.email, Balance: balance - $scope.stocknum * $scope.currstock.price, Time: currdate, Type: "Buy Stock" }
            }).success(function (response) {
                $scope.balance.unshift(response);
            });
            $scope.buyform = true;
            $http({
                url: preUrl + "/stocksim",
                method: "POST",
                data: {
                    UserID: $scope.personalInfo.email, Name: $scope.currstock.Name, Buy: $scope.stocknum,
                    Buyprice: parseFloat($scope.currstock.price), Time: currdate, Symbol: $scope.currstock.Symbol
                }
            }).success(function (response) {
                var result = response
                $http({
                    url: "http://google-stocks.herokuapp.com/",
                    method: "GET",
                    params: { code: response.Symbol },
                    contentType: "application/json; charset=utf-8"
                }).success(function (response) {
                    result["price"] = response[0]["l"];
                    $scope.purchasedstock.unshift(result);
                });
            });
        }
    }

    $scope.sellstock = function (datapack) {
        var currdate = new Date();
        var balance = 0;
        if ($scope.balance != undefined) { balance = $scope.balance[0].Balance; }
        $http({
            url: preUrl + "/balance",
            method: "POST",
            data: { UserID: $scope.personalInfo.email, Balance: balance + datapack.Buy * datapack.price, Time: currdate, Type: "Sell Stock" }
        }).success(function (response) {
            $scope.balance.unshift(response);
        });
         $http({
                url: preUrl + "/stocksim/",
                method: "DELETE",
                data: {
                    UserID: $scope.personalInfo.email, Name: datapack.Name, Buy: datapack.Buy,
                    Buyprice: datapack.Buyprice, Time: datapack.Time, Symbol: datapack.Symbol
                }
            }).success(function (response) {
                var index = $scope.purchasedstock.indexOf(datapack);
                $scope.purchasedstock.splice(index, 1);
            });
    }

    $scope.addstock = function (datapack) {
        $http({
            url: preUrl + "/stock",
            method: "GET",
            params: { Symbol: datapack.Symbol, UserID: $scope.personalInfo.email }
        }).success(function (response) {
            if (response == "") {
                datapack["UserID"] = $scope.personalInfo.email;
                $http({
                    url: preUrl + "/stock",
                    method: "POST",
                    data: datapack
                });
                $scope.successhider = false;
                $scope.failhider = true
            }
            else {
                $log.debug("Done");
                $scope.failhider = false;
                $scope.successhider = true;
            }
        });
    }

    $scope.checkstock = function (datapack) {
        $scope.mychart = false;
        var endDate = new Date().getTime();
        var startDate = endDate - 2629746000;
        var startDate = new Date(startDate).toJSON().slice(0, 10);
        var endDate = new Date(endDate).toJSON().slice(0, 10);
        var sql = 'select * from yahoo.finance.historicaldata where symbol in (\"' + datapack.Symbol + '\") and startDate = "' + startDate + '" and endDate = "' + endDate + '"';
        $http({
            url: 'http://query.yahooapis.com/v1/public/yql',
            method: "GET",
            params: { q: sql, env: 'http://datatables.org/alltables.env', format: "json" }
        }).success(function (response) {
            response = response["query"]["results"]["quote"];
            var x_label = [];
            var y_label = [];
            for (i = 0; i < response.length; i++) {
                x_label.unshift(response[i]["Date"].substring(8));
                y_label.unshift(parseFloat(response[i]["Open"]));
            }
            Highcharts.chart('datachart', {
                title: {
                    text: datapack.Name + " From " + startDate + " to " + endDate
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

    $scope.deletestock = function (datapack) {
        $http({
            url: preUrl + "/stock/",
            method: "DELETE",
            params: { UserID: datapack.UserID, Symbol: datapack.Symbol }
        }).success(function (response) {
            var index = $scope.mystocks.indexOf(datapack);
            $scope.mystocks.splice(index, 1);
        });
    }
    $scope.logout = function () {
        $window.sessionStorage.setItem("PersonalInfo", "");
        $window.location.href = '../';
    }

}

myApp.controller("MainController", mainController);
