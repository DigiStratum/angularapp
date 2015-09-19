'use strict';

angular.module('Skel', [ 'ngResource' ])

/**
 * A Skeleton module factory
 */
.factory('Skel', [
	function () {

		// ---------------------------------------------------------------------------------
		// PUBLIC: (use the methods of this class wherever you want...)
		// ---------------------------------------------------------------------------------

		var Skel = {

			// Get the value of the data associated with the named key
			get: function (key) {
				return data[key];
			},

			// Set the value of the data associated with the named key
			set: function (key, value) {
				data[key] = value;
				return this;
			}
		};

                // ---------------------------------------------------------------------------------
                // PRIVATE: (everything that follows is NOT accessible outside this class)
                // ---------------------------------------------------------------------------------

		var data = {};

		return Skel; 
	}
]);

