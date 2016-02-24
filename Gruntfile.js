
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
		execute: {
			dev: {
				src: './bin/server.js'
			},
			prod: {
				src: './dist/server/bin/server.js'
			},
			test : {
				src: './bin/server.js'
			}
		},
		env: {
			dev: {
				NODE_ENV: 'development',
				PORT: 8080
			},
			prod: {
				NODE_ENV: 'production',
				PORT: 2000
			}
		},
		jshint: {
			all: ['./public/javascript/services/*.js']
		}
		
	});
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-execute');
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-replace');
	grunt.registerTask('replace', function() {
		var data = grunt.file.readJSON('./package.json');
		data.scripts.start = "NODE_ENV=production PORT=2000 forever start server/bin/server.js";
		var content = JSON.stringify(data);
		grunt.file.write('./dist/package.json', content);
	})
	grunt.registerTask('dist', 'Copy the required files to dist folder', ['clean', 'copy', 'replace']);
	grunt.registerTask('default', ['env:dev', 'mochaTest', 'clean', 'copy', 'replace']);
};