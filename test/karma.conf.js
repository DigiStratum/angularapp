// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-08-13 using
// generator-karma 0.8.3

module.exports = function(config) {
	'use strict';

	config.set({
		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// base path, that will be used to resolve files and exclude
		basePath: '../',

		// testing framework to use (jasmine/mocha/qunit/...)
		frameworks: ['jasmine'],

		// list of files / patterns to load in the browser
		files: [
			'bower_components/angular/angular.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'bower_components/angular-resource/angular-resource.js',
			'bower_components/angular-route/angular-route.js',
			'bower_components/js-base64/base64.js',
			'bower_components/sinon/lib/sinon.js',
			'bower_components/sinon/lib/sinon/assert.js',
			'bower_components/sinon/lib/sinon/behavior.js',
			'bower_components/sinon/lib/sinon/call.js',
			'bower_components/sinon/lib/sinon/spy.js',
			'bower_components/sinon/lib/sinon/stub.js',
			'bower_components/sinon/lib/sinon/util/fake_timers.js',
			'src/app/**/*.js'
		],
		
		preprocessors: {
			'src/app/components/**/*.html': 'html2js',
			'src/app/components/**/*.js': 'coverage'
		},

		// list of files / patterns to exclude
		exclude: [],

		// web server port
		port: 8080,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: [
			'PhantomJS'
		],

		reporters: [ 'dots', 'junit', 'coverage' ],
		junitReporter: {
			outputFile: 'test/results/junit/junit.xml'
		},
		coverageReporter: {
			type: 'lcov',
			dir: 'test/results/coverage'
		},

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: false,

		colors: true,

		// level of logging
		// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel: config.LOG_INFO

		// Uncomment the following lines if you are using grunt's server to run the tests
		// proxies: {
		//	 '/': 'http://localhost:9000/'
		// },
		// URL root prevent conflicts with the site root
		// urlRoot: '_karma_'
	});
};
