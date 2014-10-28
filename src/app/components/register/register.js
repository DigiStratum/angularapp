(function() {

'use strict';

angular.module('angularApp.register', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'app/components/register/register.html',
    controller: 'RegisterCtrl'
  });
}])
.controller('RegisterCtrl', [function() {

}]);

})();
