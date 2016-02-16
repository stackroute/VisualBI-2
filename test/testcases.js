var assert = require('chai').assert,
	 supertest = require('supertest'),
	 app = require('../bin/server.js');

var server = supertest.agent("http://localhost:8080")

describe('Test cases for non-authnticated routers', function() {
	it('index page check', function(done) {
		server.get('/')
		.expect(200, done);
	});
	
	it('validates login route', function(done) {
		server.post('/login')
			.send({ username: 'ashokruhela', password: 'abc@1234' })
			.expect(200).end(function(err, res){
				if (err) return done(err);
					console.log('logged out from login check');
					return done();
		});
	});
})

describe('Test cases for all authenticated routes', function(){
	before(loginUser());
	
//	/widgets/56bd852fca641709098d88b8
	it('get comments check', function(done) {
		server.get('/comment/56bd852fca641709098d88b8')
			.expect(200, done);
	})
	
	after(logoutUser());
})



function loginUser() {
    return function(done) {
        server
            .post('/login')
            .send({ username: 'ashokruhela', password: 'abc@1234' })
            .expect(200)
            .end(function (err, res) {
			  		if (err) return done(err);
			  			console.log('logged in to make user available to all routes');
			  			return done();
        })
    };
}

function logoutUser() {
	return function(done) {
		server.get('/logout')
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
					console.log('logged out the user to destroy the current session');
					return done();
		})
	}
}
	
