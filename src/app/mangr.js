angular.module('mangr', [
    'ngRoute',
    'templates-main'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/roll', {
            templateUrl: "components/pages/roll.tpl.html"
        }).
        when('/restaurants', {
            template: "restauranten"
        }).
        when('/postmanger', {
            template: "postmanger"
        }).
        otherwise({redirectTo: '/roll'});
}]);