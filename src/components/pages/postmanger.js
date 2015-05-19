mangr.controller('postmangerController', ['$scope', function($scope) {
    $scope.selectedRestaurant = undefined;
    $scope.currentRating = 3;

    $scope.restaurants = [ 'Arisun', 'Chur', 'Encasa', 'Pepper Lunch', 'Crappy Mall Thai' ];
}]);