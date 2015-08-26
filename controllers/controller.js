/**
 * Angular.js controller
 */

var orderApp = angular.module('orderApp', ['checklist-model']);

orderApp.controller ('displayCtrl', ['$scope', '$http', function ($scope, $http) {
    console.log("displayCtrl is listening...");

    $scope.criteria = [
        'City',
        'Pizza Type',
        'Completed',
        'Order Date'
    ];

    $scope.query = {
        criteria : []
    };

    var refresh = function () {
        $http.get('/allOrders').success(function (response) {
            console.log("Retrieved orders");
            $scope.orderlist = response;
        });
    };
    refresh();

    $scope.fillTable = function () {
        console.log("Where are my queries?");
        console.log($scope.query.criteria)
    };

    $scope.reload = function () {
        console.log("Reloading page");
        refresh();
    };
}]);