'use strict';

angular.module('header', [ ])

.directive('icraHeader', [
	function () {
		return {
			restrict: 'E',
			templateUrl: 'app/components/header/header.html',
			require: [ ],
			scope: {
				name: '@',
				label: '@',
				type: '@'
			},

			link: function (scope, elem, attrs, ctrl) {
				/*jshint unused: false*/
			}
		};
	}
]);

