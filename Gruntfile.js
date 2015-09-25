
'use strict';

// ref: http://gruntjs.com/getting-started
// ref: http://gruntjs.com/sample-gruntfile
// ref: http://gruntjs.com/configuring-tasks#globbing-patterns
module.exports = function(grunt) {
	/*jshint camelcase: false */

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		vendorJs: 'build/assets/js/vendor.js',
		appJs: 'build/assets/js/app.js',

	// CHECKING / TESTING

		// JS code style/consistency checking
		// ref: https://github.com/gruntjs/grunt-contrib-jshint
		jshint: {
			// define the files to lint
			files: [
				'Gruntfile.js',
				'src/config.js.example',
				'src/app/**/*.js',
				'src/app/**/*test.js'
			],
			// configure JSHint (documented at http://www.jshint.com/docs/)
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// ref: https://github.com/gruntjs/grunt-contrib-watch
		watch: {
			// Watch the jshint (javascript source) files and fire the code analysis tasks on change
			code: {
				files: [
					'<%= jshint.files %>',
					'src/assets/scss/**/*.scss'
				],
				tasks: [
					'dosass'
				]
			},
			// Watch the *test.js files and fire the testing tasks on change
			test: {
				files: [ 'src/app/**/*test.js' ],
				tasks: [
					'karma'
				]
			}
		},

		// Karma test runner with a config file...
		// ref: https://github.com/karma-runner/karma
                karma: {
                        unit: {
                                configFile: 'test/karma.conf.js',
                                singleRun: true
                        }
                },


	// BUILD / DISTRIBUTION

		// Extract text from the 'translate' annotated HTML templates into extracted.pot
		nggettext_extract: {
			pot: {
				files: {
					'po/extracted.pot': [
						'src/app/components/**/*.html'
					]
				}
			}
		},

		// Compile the po/??.po files into build/assets/js/translations/*.js
		// re: https://github.com/rubenv/angular-gettext/issues/31
		nggettext_compile: {
			all: {
				files: [{
						expand: true,
						flatten: true,
						src: 'po/*.po',
						dest: 'build/assets/js/translations/',
						ext: '.js'
				}]
			}
		},

		// Renames files for browser caching purposes; translations are excluded because
		// they are programmatically/dynamically loaded, so filerev can't replace a script
		// tag with proper references to them.
		// ref: https://github.com/yeoman/grunt-filerev
		filerev: {
			options: {
				algorithm: 'md5',
				length: 8
			},
			build: {
				src: [
					'build/assets/js/*.js',
					'!build/assets/js/translations/*.js'
				]
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		// ref: https://github.com/yeoman/grunt-usemin
		useminPrepare: {
			html: 'build/index.html',
			options: {
				root: 'src',
				dest: 'build'
			}
		},

		// Performs rewrites based on filerev and the useminPrepare configuration
		usemin: {
			html: [ 'build/index.html' ],
			options: {
				assetsDirs: [
					'build',		// for index.html which lives here
					'build/assets/js'	// for app/vendor.js which live here
				]
			}
		},

		// Copies the list of files/directories
		// ref: https://github.com/gruntjs/grunt-contrib-copy
		// ref: http://stackoverflow.com/questions/22697919/how-to-get-grunt-contrib-copy-to-copy-files-directories-relative-to-given-source
		// Note the 'cwd' change for src/app/components to copy the whole tree correctly
		copy: {
			// All this stuff gets copied over to the build tree
			build: {
				files: [
					// Docroot files
					{ cwd: 'src', src: [ 'index.*', 'config.js' ], dest: 'build/', flatten: true, expand: true },
					// Image assets (js taken care of by usemin, scss by sass)
					{ cwd: 'src', src: [ 'assets/img/**/*' ], dest: 'build', flatten: false, expand: true }
				]
			},

			// SASS/SCSS stuffs
			sass: {
				files: [
					{ cwd: 'src', src: [ 'assets/scss/*' ], dest: 'build', flatten: false, expand: true }
				]
			},

			dist: {
				files: [
					{ cwd: 'build', src: [ '**/*' ], dest: 'dist/<%= pkg.name %>', flatten: false, expand: true }
				]
			}
		},

		// Cleans up the list of files/directories
		// ref: https://github.com/gruntjs/grunt-contrib-clean
		clean: {
			// Everything under dist/
			dist: {
				src: [ 'dist/*', '!.gitignore' ]
			},
			// The temporary dir made under dist that gets zipped up
			postdist: {
				src: [ 'dist/<%= pkg.name %>' ]
			},
			// Everything under build/
			build: {
				src: [ 'build/*', '!build/config.js' ]
			},
			// Everything needing cleanup after the build runs
			postbuild: {
				src: [ 'build/assets/scss', '.sass-cache' ]
			},
			// The temporary build/assets/js/vendor/ tree
			vendor: {
				src: [ 'build/assets/js/vendor' ]
			},
			// ALL of bower_components, including the directory
			bower: {
				src: [ 'src/bower_components' ]
			},
			// Everything under test/results/
			test: {
				src: [ 'test/results/*', '!.gitignore' ]
			}
		},

		// Make a ZIP file for distribution from the contents of dist/recipientapp-web
		// ref: https://github.com/gruntjs/grunt-contrib-compress
		compress: {
			main: {
				options: {
					archive: 'dist/<%= pkg.name %>.zip'
				},
				files: [
					{ src: [ '<%= pkg.name %>/**' ], cwd: 'dist', flatten: false, expand: true }
				]
			}
		},

		// Get bower dependencies
		// ref: https://www.npmjs.org/package/grunt-bower-task
		bower: {
			dist: {
				options: {
					// If we override targetDir, copy must be false, per the author
					targetDir: 'src/bower_components',
					copy: false,
					bowerOptions: {
						production: true
					}
				}
			},
			dev: {
				options: {
					// If we override targetDir, copy must be false, per the author
					targetDir: 'src/bower_components',
					copy: false,
					bowerOptions: {
						production: false
					}
				}
			}
		},

		// Compile SCSS into CSS with SASS tool
		sass: {
			options: {
				includePaths: [ 'src/bower_components/foundation/scss' ]
			},
			build: {
				files: {
					'build/assets/css/app.css': 'build/assets/scss/app.scss'
				}
			},
			dist: {
				options: {
					outputStyle: 'compressed' // removes extra white space
				},
				files: {
					'build/assets/css/app.css': 'build/assets/scss/app.scss'
				}
			}
		},

		// Inline angular templates
		// ref: https://www.npmjs.org/package/grunt-inline-angular-templates
		'inline_angular_templates': {
			build: {
				options: {
					base: 'src'
				},
				files: {
					'build/index.html': [
						'src/app/components/**/*.html',
						'src/app/shared/**/*.html'
					]
				}
			}
		}
	});

	// Filesystem Operations
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');

	// bower dependencies dev vs. dist
	// ref: https://www.npmjs.org/package/grunt-bower-task
	grunt.loadNpmTasks('grunt-bower-task');

	// Translation text extraction
	// ref: https://angular-gettext.rocketeer.be/dev-guide/extract/
	grunt.loadNpmTasks('grunt-angular-gettext');
	grunt.registerTask('translate', [
		'nggettext_extract',
		'nggettext_compile'
	]);

	// usemin stuffs
	// ref: http://gruntjs.com/creating-tasks
	grunt.registerTask('fixusemin', 'Fixing paths from useminPrepare...',
		function () {
			/*jshint eqeqeq: false */

			// Make the usemin paths work on the vendor.js file IN PLACE instead of in ./.tmp/
			// ref: http://gruntjs.com/api/grunt.config
			grunt.config.requires('vendorJs');
			var vendorJs = grunt.config('vendorJs');
			var appJs = grunt.config('appJs');
			grunt.log.writeln('Setting up vendor|app.js to build in-place at: ' + vendorJs + ' & ' + appJs);

			grunt.config.requires('uglify.generated');
			grunt.config.requires('concat.generated');

			// Make local copies of the generated files
			var uglifyGeneratedFiles = grunt.config('uglify.generated.files');
			var concatGeneratedFiles = grunt.config('concat.generated.files');

			// Find the uglify output target that is the final vendor script...
			var i;
			var vendorTmp = 'notfound';
			var appTmp = 'notfound';
			for (i = 0; i < uglifyGeneratedFiles.length; i++) {

				// If we found the vendorJs one, rewrite the source for it
				if (uglifyGeneratedFiles[i].dest == vendorJs) {
					vendorTmp = uglifyGeneratedFiles[i].src;
					uglifyGeneratedFiles[i].src = vendorJs;
					grunt.log.writeln('Rewrote uglify.generated.files[' + i + '].src as ' + vendorJs + '; was ' + vendorTmp);
				}
				// If we found the appJs one, rewrite the source for it
				else if (uglifyGeneratedFiles[i].dest == appJs) {
					appTmp = uglifyGeneratedFiles[i].src;
					uglifyGeneratedFiles[i].src = appJs;
					grunt.log.writeln('Rewrote uglify.generated.files[' + i + '].src as ' + appJs + '; was ' + appTmp);
				}
			}
			if (appTmp == 'notfound') {
				grunt.log.writeln('Failed to find the uglify source...');
			}
			else {

				// Find the concat output target that is the final vendor script...
				for (i = 0; i < concatGeneratedFiles.length; i++) {

					// If we found the vendorTmp one, rewrite the destination for it
					if (concatGeneratedFiles[i].dest == vendorTmp) {
						concatGeneratedFiles[i].dest = vendorJs;
						grunt.log.writeln('Rewrote concat.generated.files[' + i + '].dest as ' + vendorJs + '; was ' + vendorTmp);
					}
					// If we found the appTmp one, rewrite the destination for it
					else if (concatGeneratedFiles[i].dest == appTmp) {
						concatGeneratedFiles[i].dest = appJs;
						grunt.log.writeln('Rewrote concat.generated.files[' + i + '].dest as ' + appJs + '; was ' + appTmp);
					}
					else {
						grunt.log.writeln('NO MATCH ON: [' + concatGeneratedFiles[i].dest + '] vs "' + vendorTmp + '"/"' + appTmp +'"');
					}
				}
			}

			// Push our local copies back into the global space
			grunt.config('uglify.generated.files', uglifyGeneratedFiles);
			grunt.config('concat.generated.files', concatGeneratedFiles);
		}
	);

	// Helper to debug usemin generated data structures
	grunt.registerTask('debugusemin', 'whatever', function () {
		grunt.log.writeln('uglifyGeneratedFiles = ', grunt.config('uglify.generated.files'));
		grunt.log.writeln('concatGeneratedFiles = ', grunt.config('concat.generated.files'));
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-filerev');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.registerTask('dousemin', [
		'useminPrepare',
		//'debugusemin',	// enable if you want to see the effects of fixusemin
		'fixusemin',
		//'debugusemin',	// enable if you want to see the effects of fixusemin
		'concat:generated',
		'uglify:generated',	// disable if you want a readable version of *.js
		'filerev',		// disable if you want filename.js instead of filename.2354876.js for *.js
		'usemin'
	]);
	grunt.registerTask('douseminquick', [
		'useminPrepare',
		'fixusemin',
		'concat:generated',
		'usemin'
	]);

	// Clean up build tree before building
	grunt.registerTask('buildclean', [
		'clean:bower',
		'clean:build',
		'clean:dist'
	]);

	// SASS/SCSS (separately targetable)
	grunt.loadNpmTasks('grunt-sass');
	grunt.registerTask('dosass', [
		'copy:sass',
		'sass:build'
	]);

	// BUILD
	grunt.loadNpmTasks('grunt-inline-angular-templates');
	grunt.registerTask('build', [
		'translate',
		'copy:build',
		'dosass',
		'dousemin',
		'inline_angular_templates',
		'clean:postbuild'
	]);

	// TEST
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-karma');
	grunt.registerTask('test', [
		'buildclean',
		'bower:dev',
		'build',
		'clean:test',
		'jshint',
		'karma'
	]);

	// QUICK
	grunt.registerTask('quick', [
		'translate',
		'copy:build',
		'dosass',
		'douseminquick',
		'inline_angular_templates'
	]);

	// DIST
	grunt.registerTask('dist', [
		'quick',
		'copy:dist',
		'compress',
		'clean:postdist'
	]);

	grunt.registerTask('default', [
		'test',
		'dist'
	]);
};

