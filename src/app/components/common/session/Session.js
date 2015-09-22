'use strict';

angular.module('Session', [ 'ngResource' ])

/**
 * A simple place to collect session data
 */
.factory('Session', [
	function () {

		// ---------------------------------------------------------------------------------
		// PUBLIC: (use the methods of this class wherever you want...)
		// ---------------------------------------------------------------------------------

		var Session = {

			// Reset all the session data to nothingness
			reset: function () {
				data = {};
				return this;
			},

			// Get the value of the session data associated with the named key
			get: function (key) {
				return data[key];
			},

			// Set the value of the session data associated with the named key
			set: function (key, value) {
				data[key] = value;
				return this;
			},

			// Check if there is session data associated with the named key
			has: function (key) {
				return (data[key] === undefined) ? false : true;
			},

			// Delete the session data associated with the named key (if it exists)
			del: function (key) {
				if (Session.has(key)) {
					delete data[key];
				}
				return this;
			}
		};

                // ---------------------------------------------------------------------------------
                // PRIVATE: (everything that follows is NOT accessible outside this class)
                // ---------------------------------------------------------------------------------

		var data = {};

		return Session; 
	}
]);

