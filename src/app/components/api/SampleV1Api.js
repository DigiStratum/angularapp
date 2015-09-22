'use strict';

angular.module('SampleV1Api', [ 'ngResource' ])

.factory('SampleV1Api', [ 'restRequest', '$resource',
	function (restRequest, $resource) {

		// ---------------------------------------------------------------------------------
		// PUBLIC: (use the methods of this class wherever you want...)
		// ---------------------------------------------------------------------------------

		var SampleV1Api = {

			// Set the API root URL to which all defined endpoints are relative
			setApiRoot: function (apiRoot) {
				config.apiRoot = apiRoot;
			},

			// A sample API GET operation with a completion function
			sampleGet: function (completionFunction) {
				return restRequest(

					// Endpoint resource & method
					resourceSample().get,

					// Request Parameters
					null,

					completionFunction
				);
			},

			// A sample API POST operation with a completion function
			samplePost: function (completionFunction) {
				return restRequest(

					// Endpoint resource & method
					resourceSample().post,

					// Request Parameters
					{
						name: 'sample data name',
						desc: 'sample data description'
					},

					completionFunction
				);
			}
		}; // SampleV1Api

		// ---------------------------------------------------------------------------------
		// PRIVATE: (everything that follows is NOT accessible outside this class)
		// ---------------------------------------------------------------------------------

		var config = {
			apiRoot: ''
		};

		// ENDPOINT RESOURCE DEFINITIONS

		// /sample
		function resourceSample () {
			return $resource(
				config.apiRoot + '/sample',
				// No URL parameters are needed for this endpoint...
				{ },
				{
					get: {
						method: 'GET',

						// Request Headers
						headers: {
							'Accept': 'application/json'
						},

						// Prevent browser cache for the result (IE - Grr!)
						params: {
							'timestamp': new Date().getTime()
						}
					},

					post: {
						method: 'POST',

						// Request Headers
						headers: { },

						// Prevent browser cache for the result (IE - Grr!)
						params: {
							'timestamp': new Date().getTime()
						}
					}
				}
			);
		}

		return SampleV1Api;
	} // SampleV1Api constructor
]); // SampleV1Api factory

