(function () {

'use strict';

angular.module('angularApp.about', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/about', {
    templateUrl: 'app/components/about/about.html',
    controller: 'AboutCtrl'
  });
}])
.controller('AboutCtrl', [function() {

}]);

})();
