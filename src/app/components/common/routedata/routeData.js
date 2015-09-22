'use strict';

// ref: http://stackoverflow.com/questions/22656847/changing-body-background-color-with-angularjs
angular.module('RouteData', [])

.provider('RouteData',
	function () {
		var settings = {};
		var hookToRootScope = false;

		this.applyConfig = function (newSettings) {
			settings = newSettings;
		};

		this.hookToRootScope = function (enableRootScopeHook) {
			hookToRootScope = enableRootScopeHook;
		};

		function RouteData() {

			this.set = function (index, value) {
				settings[index] = value;
			};

			this.get = function (index) {
				if (settings.hasOwnProperty(index)) {
					return settings[index];
				}
				return '';
			};

			this.isHookedToRootScope = function () {
				return hookToRootScope;
			};
		}

		this.$get = function () {
			return new RouteData();
		};
	}
)

.run(['$location', '$rootScope', 'RouteData',
	function($location, $rootScope, RouteData) {
		if (RouteData.isHookedToRootScope()) {
			$rootScope.RouteData = RouteData;
		}

		$rootScope.$on('$routeChangeStart',
			function (event, current, previous) {
				/*jshint unused:false */
				var route = current.$$route;
				if ((typeof(route) !== 'undefined') && (typeof(route.RouteData) !== 'undefined')) {
					var data = route.RouteData;
					for (var index in data) {
						RouteData.set(index, data[index]);
					}
				} 
			}
		);
	}
]);

