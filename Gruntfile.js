
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
						expand: true,
						cwd: 'public/javascript',
						src: ['**/*.js', '!lib/*'],
						dest: 'build/public/javascript',
						ext: '.min.js',
						extDot: 'first'
					}
				]
			}
		}
		
	});
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['uglify', 'mochaTest']);
};