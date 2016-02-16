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
	
	it('get comments check', function(done) {
		var widgetId = '56bd852fca641709098d88b8';
		server.get('/comment/' + widgetId)
			.expect(200).end(function(err, res) {
				if(err) return done(err);
					assert.equal(res.body._id, widgetId);
					done();
		});
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
	
