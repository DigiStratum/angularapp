(function() {

'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute',
	'myApp.about',
	'myApp.help',
	'myApp.home',
	'myApp.login',
	'myApp.register',
	'myApp.version',
	'gettext'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/home'});
}]);

angular.module('myApp').run(function (gettextCatalog) {
	//console.log('Setting language to: ' + appConfig.lang);
	gettextCatalog.setCurrentLanguage(appConfig.lang);
});

})();
