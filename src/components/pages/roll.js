mangr.controller('rollController', function($scope, $http) {
    $scope.roll = function () {
        $http.get('/api/eat').
            success(function (data, status, headers, config) {
                $scope.restaurants = data;
            }).
            error(function (data, status, headers, config) {

            });
    };
});