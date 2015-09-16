'use strict';

angular.module('AngularApp', [
	'ngRoute',
	'ngMessages',
	'ui.router',
	'gettext',
	'home',
	'header',
	'modal',
	'Session',
	'RestApi',
	'TreadstoneV1Api'
])

.config(['$routeProvider', '$httpProvider',
	function ($routeProvider, $httpProvider) {
		$routeProvider.otherwise({redirectTo: '/home'});

		// Magic follows: suppress authentication popups in Chrome
		// and the likes by clarifying that requests are AJAXy...
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	}
])

.run(['gettextCatalog',
	function (gettextCatalog) {

		// Apply translations
		gettextCatalog.setCurrentLanguage(appConfig.lang);
	}
]);

