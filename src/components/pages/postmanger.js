mangr.controller('postmangerController', function($scope, $http) {
    $scope.rating = 3;
    $scope.restaurant = undefined;

    $scope.review = function() {
        $http.post('/api/review', JSON.stringify($scope.input)).
            success(function(data, status, headers, config) {
            }).
            error(function(data, status, headers, config) {
            });
    };
});