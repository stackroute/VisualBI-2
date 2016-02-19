
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		cssmin: {
			target: {
				files: {
					'build/VisualBI-2/public/stylesheets/styles.css': 'public/stylesheets/styles.css'
				}
			}
		},
		
		mochaTest: {
			all: {src: 'test/testcases.js'},
			options:{run: true}
		},
		uglify: {
			option: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				files: [
					{
						 expand: true,     // Enable dynamic expansion.
						 cwd: './',      // Src matches are relative to this path.
						 src: ['**/*.js', '!node_modules/*'], // Actual pattern(s) to match.
						 dest: 'build/VisualBI-2/',   // Destination path prefix.
						 ext: '.min.js',   // Dest filepaths will have this extension.
						 extDot: 'first'   // Extensions in filenames begin after the first dot
					}
				]
			}
		},
		copy: {
			package: {
				src: './package.json',
				dest: './dist/',
			},
			client: {
				expand: true,
				cwd: './public',
				src:['**/*'],
				dest:'./dist/public',
				extDot: 'first'
			},
			server: {
				cwd: './',
				src: ['./app.js', './bin/*', './config/*', './lib/*', './model/*', './routes/*', './views/*', '!**/node_modules', '!**/test'],
				dest: './dist/server/',
			}
		},
		clean: ['./dist'],
		serve: {
			dev: {},
			prod: {}
		}
		
	});
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
//	grunt.registerTask('copy file', 'Copies all the required files to distibution folder', ['copy']);
//	grunt.registerTask('default', ['uglify', 'cssmin', 'mochaTest']);
	grunt.registerTask('default', ['mochaTest', 'clean', 'copy']);
};