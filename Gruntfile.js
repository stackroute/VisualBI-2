
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		cssmin: {
			target: {
				files: {
					'build/public/stylesheets/styles.css': 'public/stylesheets/styles.css'
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
			dynamic_mappings: {
				files: [
					{
						 expand: true,     // Enable dynamic expansion.
						 cwd: 'public/javascript/',      // Src matches are relative to this path.
						 src: ['**/*.js', '!lib/*'], // Actual pattern(s) to match.
						 dest: '../build/VisualBI-2/public/javascript',   // Destination path prefix.
						 ext: '.min.js',   // Dest filepaths will have this extension.
						 extDot: 'first'   // Extensions in filenames begin after the first dot
					}
				]
			}
		}
		
	});
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('default', ['cssmin', 'uglify', 'mochaTest']);
};