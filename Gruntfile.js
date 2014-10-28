// ref: http://gruntjs.com/getting-started
// ref: http://gruntjs.com/sample-gruntfile
// ref: http://gruntjs.com/configuring-tasks#globbing-patterns
module.exports = function(grunt) {

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// CHECKING / TESTING

		// JS code style/consistency checking
		// ref: https://github.com/gruntjs/grunt-contrib-jshint
		jshint: {
			// define the files to lint
			files: [
				'gruntfile.js',
				'src/config.js',
				'src/app/**/*.js',
				'!src/app/**/*test.js',
			],
			// configure JSHint (documented at http://www.jshint.com/docs/)
			options: {
				// more options here if you want to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			}
		},

		// ref: https://github.com/gruntjs/grunt-contrib-watch
		watch: {
			// Watch the jshint (javascript source) files and fire the code analysis tasks on change
			code: {
				files: ['<%= jshint.files %>'],
				tasks: [
					'jshint'
				]
			},
			// Watch the *test.js files and fire the testing tasks on change
			test: {
				files: ['src/app/**/*test.js'],
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

		// Compile the po/??.po files into translations.js
		nggettext_compile: {
			all: {
				files: {
					'src/assets/js/generated/translations.js': ['po/*.po']
				}
			},
		},

		// Concatenate a pile of JS files into one, giant JS file
		// ref: https://github.com/gruntjs/grunt-contrib-concat
		concat: {
			options: {
				// define a string to put between each file in the concatenated output
				separator: ';'
			},
			build: {
				// The files to concatenate
				src: [
					'src/app/**/*.js',
					'!src/app/**/*test.js',
					'src/assets/**/*.js'
				],
				// the location of the resulting JS file
				dest: 'build/assets/js/<%= pkg.name %>.js'
			}
		},

		// Minify and obfuscate the javascript code for distribution
		// ref: https://github.com/gruntjs/grunt-contrib-uglify
		uglify: {
			options: {
				// the banner is inserted at the top of the output
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			build: {
				files: {
					'dist/<%= pkg.name %>/assets/js/<%= pkg.name %>.js': [
						'<%= concat.build.dest %>'
					]
				}
			}
		},

		// Copies the list of files/directories
		// ref: https://github.com/gruntjs/grunt-contrib-copy
		// ref: http://stackoverflow.com/questions/22697919/how-to-get-grunt-contrib-copy-to-copy-files-directories-relative-to-given-source
		// Note the 'cwd' change for src/app/components to copy the whole tree correctly
		copy: {
			build: {
				files: [
					{ src: ['assets/css/*'], dest: 'build/assets/css/', cwd: 'src', flatten: true, expand: true },
					{ src: ['assets/img/*'], dest: 'build/assets/img/', cwd: 'src', flatten: true, expand: true },
					{ src: ['index.php'], dest: 'build/', cwd: 'src', flatten: true, expand: true },
					{ src: ['config.js'], dest: 'build/', cwd: 'src', flatten: true, expand: true },
					{ src: ['**/*'], dest: 'build/bower_components', cwd: 'bower_components', flatten: false, expand: true },
					{ src: ['**/*.html'], dest: 'build/app/components', cwd: 'src/app/components', flatten: false, expand: true },
					{ src: ['**/*.html'], dest: 'build/app/shared', cwd: 'src/app/shared', flatten: false, expand: true }
				]
			},
			dist: {
				files: [
					{ src: ['**/*'], dest: 'dist/<%= pkg.name %>', cwd: 'build', flatten: false, expand: true }
				]
			}
		},

		// Cleans up the list of files/directories
		// ref: https://github.com/gruntjs/grunt-contrib-clean
		clean: {
			dist: {
				src: [
					'dist/*',
					'!.gitignore'
				]
			},
			postdist: {
				src: [
					'dist/<%= pkg.name %>'
				]
			},
			build: {
				src: [
					'build/*',
					'!.gitignore'
				]
			},
			test: {
				src: [
					'test/results/*',
					'!.gitignore'
				]
			}
		},

		// Make a ZIP file for distribution from the contents of dist/angular-app
		// ref: https://github.com/gruntjs/grunt-contrib-compress
		compress: {
			main: {
				options: {
					archive: 'dist/<%= pkg.name %>.zip'
				},
				files: [
					{ src: ['<%= pkg.name %>/**'], cwd: 'dist', flatten: false, expand: true }
				]
			}
		}
	});

	// Translation text extraction
	// ref: https://angular-gettext.rocketeer.be/dev-guide/extract/
	grunt.loadNpmTasks('grunt-angular-gettext');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('translate', [
		'nggettext_extract',
		'nggettext_compile'
	]);

	// Run some tests...
	grunt.registerTask('test', [
		'clean:test',
		'jshint',
		'karma'
	]);

	grunt.registerTask('build', [
		'clean:build',
		'clean:dist',
		'translate',
		'concat',
		'copy:build'
	]);

	grunt.registerTask('dist', [
		'build',
		'copy:dist',
		'uglify',
		'compress',
		'clean:postdist'
	]);

	grunt.registerTask('default', [
		'test',
		'dist'
	]);
};

