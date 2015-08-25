/**
 * Angular.js controller
 */
var orderApp = angular.module('orderApp', []);

orderApp.controller ('displayCtrl', ['$scope', '$http', function ($scope, $http) {
    console.log("displayCtrl is listening...");

    var refresh = function () {
        $http.get('/allOrders').success(function (response) {
            console.log("Retrieved orders");
            console.log(response[0].customerName);
            $scope.orderlist = response;
            console.log($scope.orderlist[0].customerAddress);
        });
    }
    refresh();

    $scope.fillTable = function () {
        console.log("Where are my queries?");
    }

    $scope.reload = function () {
        console.log("Reloading page");
        refresh();
    }
}]);