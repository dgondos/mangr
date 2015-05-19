var mangr = angular.module('mangr', [
    'ngRoute',
    'templates-main',
    'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/roll', {
            templateUrl: "components/pages/roll.tpl.html"
        }).
        when('/restaurants', {
            templateUrl: "components/pages/restaurants.tpl.html"
        }).
        when('/postmanger', {
            templateUrl: "components/pages/postmanger.tpl.html",
            controller: 'postmangerController'
        }).
        otherwise({redirectTo: '/roll'});
}]);