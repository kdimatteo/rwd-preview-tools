module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		useref: {
			// specify which files contain the build blocks
			html: 'output/**/*.html',
			// explicitly specify the temp directory you are working in
			// this is the the base of your links ( "/" )
			temp: 'output'
		},	

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				files : {
					'../dist/app.min.js' : 
					[
						'../js/vendor/jquery-2.0.3.js',
						'../js/vendor/lodash.js',
						'../js/app.js'
					]
				}
				//src: '../js/<%= pkg.name %>.js',
				//dest: 'dist/app.min.js'
			}
		},

		less: {
			/*development: {
				options: {
					paths: ["assets/css"]
				},
				files: {
					"../dist/css/main.css": "../less/main.less"
				}
			},*/
			production: {
				options: {
					paths: ["assets/css"],
					cleancss: true
				},
				files: {
					"../dist/css/main.css": "../less/main.less"
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-useref');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');


	grunt.registerTask('default', ['cp', 'useref', 'uglify', 'less']);

};

