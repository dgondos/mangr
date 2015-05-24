mangr.controller('restaurantController', function($scope, $modal) {
    $scope.selectedRestaurant = undefined;

    $scope.open = function(isAdd) {
        $modal.open({
            animation: true,
            templateUrl: 'components/modals/restaurants/restaurantDetails.tpl.html',
            controller: 'restaurantDetailsController',
            size: "sm",
            resolve: {
                isAdd: function() {
                    return isAdd;
                }
            }
        });
    };
});