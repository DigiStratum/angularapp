'use strict';

angular.module('AngularApp', [
	'ngRoute',
	'ngMessages',
	'ui.router',
	'RouteData',
	'gettext',
	'Config',
	'Modal',
	'Session',
	'RestApi',
	'SampleV1Api',
	'home',
	'header'
])

.config(['$routeProvider', '$httpProvider',
	function ($routeProvider, $httpProvider) {
		$routeProvider.otherwise({redirectTo: '/home'});

		// Magic follows: suppress authentication popups in Chrome
		// and the likes by clarifying that requests are AJAXy...
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	}
])

.run(['gettextCatalog', 'Config',
	function (gettextCatalog, Config) {

		// Apply translations
		gettextCatalog.setCurrentLanguage(appConfig.lang);

		// Pull in global scope configuration data
		Config.add(appConfig);
		Config.set('env.isIE', (navigator.appVersion.indexOf('MSIE') !== -1));
		Config.set('env.isSafari', (navigator.appVersion.indexOf('Safari') !== -1));
		Config.set('env.isFirefox', (navigator.userAgent.indexOf('Firefox') !== -1));
	}
]);

