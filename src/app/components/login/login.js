(function() {

'use strict';

angular.module('angularApp.login', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'app/components/login/login.html',
    controller: 'LoginCtrl'
  });
}])
.controller('LoginCtrl', [function() {

}]);

})();
