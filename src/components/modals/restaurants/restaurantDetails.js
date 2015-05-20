mangr.controller('restaurantDetailsController', ['$scope', '$modalInstance', function($scope, $modalInstance) {
    $scope.rating = 3;
    $scope.dbTags = [ 'korean', 'japanese', 'quick' ];
    $scope.tags = undefined;

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.newTag = function(newItem) {
        return newItem;
    }
}]);
