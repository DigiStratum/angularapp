'use strict';

angular.module('Modal', [ 'ngRoute' ])

/**
 * Modal content interface
 */
.factory('Modal', [
        function () {

                // ---------------------------------------------------------------------------------
                // PUBLIC: (use the methods of this class wherever you want...)
                // ---------------------------------------------------------------------------------

                var Modal = {

			/**
			 * Show an error message
			 */
			showError: function (message) {
				doShowMessage('error', message);
			},

			/**
			 * Show a notice message
			 */
			showNotice: function (message) {
				doShowMessage('notice', message);
			},

			/**
			 * Show a warning message
			 */
			showWarning: function (message) {
				doShowMessage('warning', message);
			},

			/**
			 * Show a success message
			 */
			showSuccess: function (message) {
				doShowMessage('success', message);
			},

			/**
			 * Get the currernt modal message data
			 */
			getData: function() {
				return data;
			}
                };

                // ---------------------------------------------------------------------------------
                // PRIVATE: (everything that follows is NOT accessible outside this class)
                // ---------------------------------------------------------------------------------

                var data = {
			type: 'notice',
                        message: 'default message'
                };

		// Note: String translation for the message happens in the HTML template,
		// so arbitrary message text being passed in is not good...
		function doShowMessage(type, message) {
			data.type = type;
			data.message = message;

			// Show the modal
			// ref: http://foundation.zurb.com/docs/components/reveal.html
			$('#generalModal').foundation('reveal', 'open');
		}

		return Modal;
	}
])

.directive('modal', [ 'Modal', 
	function (Modal) {
		return {
			restrict: 'E',
			templateUrl: 'app/components/modal/modal.html',
			require: [ ],
			scope: {
				name: '@',
				label: '@',
				type: '@'
			},
			controller: function() { },
			link: function (scope, elem, attrs, ctrl) {
				/*jshint unused:false */

				scope.model = {
					data: Modal.getData()
				};
			}
		};
	}
])

.controller('ModalCtrl', [
	function() {
	}
]);

