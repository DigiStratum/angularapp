(function() {

'use strict';

angular.module('angularApp.help', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/help', {
    templateUrl: 'app/components/help/help.html',
    controller: 'HelpCtrl'
  });
}])
.controller('HelpCtrl', [function() {

}]);

})();
