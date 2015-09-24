'use strict';

angular.module('Authentication', [ ])

/**
 * A Authenticationeton module factory
 */
.factory('Authentication', [ '$rootScope', 'SampleV1Api', 'Session',
	function ($rootScope, SampleV1Api, Session) {

		// ---------------------------------------------------------------------------------
		// PUBLIC: (use the methods of this class wherever you want...)
		// ---------------------------------------------------------------------------------

		var Authentication = {

			// Attempt to authenticate with the supplied credentials for this session
			authenticate: function (username, password) {
				SampleV1Api.sampleGet(

					// Request data
					{
						username: username,
						password: password
					},

					// Completion Function
					function (ok, response) {
						if (ok) {
							console.log('Authentication.authenticate() pass!');
							Session.set('sessionId', response.data.sessionId);
							// Signal authentication change to interested modules
							$rootScope.$broadcast('authenticationChange', true);
						} else {
							Authentication.unauthenticate();
						}
					}
				);
			},

			// Drop the user authentication for this session
			unauthenticate: function () {
				Session.del('sessionId');
				// Signal authentication change to interested modules
				$rootScope.$broadcast('authenticationChange', false);

			},

			// Check whether there is an autenticated user for this session
			isAuthenticated: function () {
				return Session.has('sessionId');
			}
		};

                // ---------------------------------------------------------------------------------
                // PRIVATE: (everything that follows is NOT accessible outside this class)
                // ---------------------------------------------------------------------------------

		return Authentication; 
	}
]);

