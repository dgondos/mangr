mangr.directive('restaurantSelector', [function() {
    return {
        restrict: 'E',
        scope: {
            selectedModel: '='
        },
        templateUrl: 'components/elements/restaurantSelector.tpl.html',
        controller: function($scope, $http) {
            $scope.restaurants = [];
            $http.get('/api/restaurants').
                success(function(data, status, headers, config) {
                    $scope.restaurants = data.restaurants;
                }).
                error(function(data, status, headers, config) {

                });
        }
    };
}]);