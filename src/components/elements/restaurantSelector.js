mangr.directive('restaurantSelector', [function() {
    return {
        restrict: 'E',
        scope: {
            selectedModel: '='
        },
        templateUrl: 'components/elements/restaurantSelector.tpl.html',
        controller: function($scope) {
            $scope.restaurants = [ 'Arisun', 'Chur', 'Encasa', 'Pepper Lunch', 'Crappy Mall Thai' ];
        }
    };
}]);