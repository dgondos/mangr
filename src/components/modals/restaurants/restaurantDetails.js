mangr.controller('restaurantDetailsController', function($scope, $modalInstance, $http, isAdd, editRestaurant) {
    $scope.rating = 3;
    $scope.dbTags = [ 'korean', 'japanese', 'quick' ];
    $scope.tags = undefined;
    $scope.isAdd = isAdd;
    $scope.editRestaurant = editRestaurant;
    $scope.input = {};

    if (!$scope.isAdd) {
        $http.post('/api/restaurant', JSON.stringify({ name: $scope.editRestaurant })).
            success(function(data, status, headers, config) {
                $scope.input.name = data.restaurant.name;
                $scope.input.tags = data.restaurant.tags;
                $scope.rating = data.restaurant.rating;
            }).
            error(function(data, status, headers, config) {

            });
    }

    $scope.ok = function () {
        $http.post('/api/upsert', JSON.stringify($scope.input)).
            success(function(data, status, headers, config) {
                $modalInstance.close();
            }).
            error(function(data, status, headers, config) {

            });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.newTag = function(newItem) {
        return newItem;
    }
});
