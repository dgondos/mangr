mangr.controller('restaurantDetailsController', function($scope, $modalInstance, $http, isAdd) {
    $scope.rating = 3;
    $scope.dbTags = [ 'korean', 'japanese', 'quick' ];
    $scope.tags = undefined;
    $scope.isAdd = isAdd;
    $scope.input = {};
    $scope.input.name = "Arisun";
    $scope.input.tags = ['korean', 'quick'];

    $scope.ok = function () {
        var api = $scope.isAdd ? 'add' : 'update';
        $http.post('/api/' + api, JSON.stringify($scope.input)).
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
