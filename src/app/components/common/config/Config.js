'use strict';

angular.module('Config', [ ])

/**
 * A Config module factory
 *
 * This module allows us to centralize config data/access through a common interface.
 */
.factory('Config', [
	function () {

		// ---------------------------------------------------------------------------------
		// PUBLIC: (use the methods of this class wherever you want...)
		// ---------------------------------------------------------------------------------

		var Config = {

			// Get the value of the data associated with the named key
			/**
			 * Get the configuration data for the supplied key
			 *
			 * @param string key is a dotted notation identifier ex: 'a.b.c'
			 *
			 * @return the requested configuration data or unedfined if it is not defined
			 */
			get: function (key) {
				var root = data;
				var keyParts = key.split('.');
				for (var keyPart in keyParts) {
					if (typeof root[keyPart] === 'undefined') {
						return undefined;
					}
					root = root[keyPart];
				}
				return root;
			},

			/**
			 * Set the configuration data for the supplied key to the value
			 *
			 * @param string key is a dotted notation identifier ex: 'a.b.c'
			 * @param mixed value is any value
			 *
			 * @return this for chaining
			 */
			set: function (key, value) {
				var root = data;
				var keyParts = key.split('.');
				for (var keyPart in keyParts) {
					if (typeof root[keyPart] === 'undefined') {
						root[keyPart] = {};
					}
					root = root[keyPart];
				}
				root = value;
				return this;
			},

			/**
			 * Recursively add the properties of the supplied object as config data
			 *
			 * @param object obj The object whose properties we want to add to configs
			 * @param string base The base of the dotted notation path where we want
			 * this config data to accumulate (defaults to '' to start at the root)
			 *
			 * @return this for chaining
			 */
			add: function (obj, base) {
				// Base is either empty or trails with a '.' to take next node
				base = (arguments.length === 1) ? '' : base + '.';

				for (var prop in obj) {
					if (typeof obj[prop] === 'function') {
						// we don't capture functions
						continue;
					}
					if (typeof obj[prop] === 'object') {
						// recurse for nested objects
						this.add(obj[prop], base + prop);
					}
					else {
						// capture value for anything else
						this.set(base + prop, obj[prop]);
					}
				}
				return this;
			}
		};

                // ---------------------------------------------------------------------------------
                // PRIVATE: (everything that follows is NOT accessible outside this class)
                // ---------------------------------------------------------------------------------

		var data = {};

		return Config; 
	}
]);

