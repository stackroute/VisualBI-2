
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		mochaTest: {
			all: {src: 'test/testcases.js'},
			options:{run: true}
		}
		
	});
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.registerTask('default', ['mochaTest']);
};