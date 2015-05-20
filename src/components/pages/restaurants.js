mangr.controller('restaurantController', ['$scope', '$modal', function($scope, $modal) {
    $scope.selectedRestaurant = undefined;

    $scope.open = function () {
        $modal.open({
            animation: true,
            templateUrl: 'components/modals/restaurants/restaurantDetails.tpl.html',
            controller: 'restaurantDetailsController',
            size: "sm"
        });
    };
}]);