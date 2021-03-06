var mangr = angular.module('mangr', [
    'ngRoute',
    'templates-main',
    'ui.bootstrap',
    'ui.select'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/roll', {
            templateUrl: "components/pages/roll.tpl.html",
            controller: 'rollController'
        }).
        when('/restaurants', {
            templateUrl: "components/pages/restaurants.tpl.html",
            controller: 'restaurantController'
        }).
        when('/postmanger', {
            templateUrl: "components/pages/postmanger.tpl.html",
            controller: 'postmangerController'
        }).
        otherwise({redirectTo: '/roll'});
}]);