(function() {

'use strict';

// Declare app level module which depends on views, and components
angular.module('angularApp', [
	'ngRoute',
	'angularApp.about',
	'angularApp.help',
	'angularApp.home',
	'angularApp.login',
	'angularApp.register',
	'angularApp.version',
	'gettext'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/home'});
}]);

angular.module('angularApp').run(function (gettextCatalog) {
	//console.log('Setting language to: ' + appConfig.lang);
	gettextCatalog.setCurrentLanguage(appConfig.lang);
});

})();
