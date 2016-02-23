var assert = require('chai').assert,
	 supertest = require('supertest'),
	 app = require('../app.js');

var server = supertest.agent(app);

//test data to run test cases
var username = 'ashokruhela',
	 password = 'test@1234',
	 widgetId = '56c9677ac4e209fd514df7ed',
	 userid = '56bdc6bba18adc9e51a79847';

describe('Test cases for non-authnticated routers', function() {
	it('index page check', function(done) {
		server.get('/')
		.expect(200, done);
	});
	
	it('validates login route', function(done) {
		this.timeout(10000);
		server.post('/login')
			.send({ username: username, password: password })
			.expect(200)
			.end(function(err, res){
				if (err) return done(err);
//					console.log('logged out from login check');
					return done();
		});
	});
});

describe('Test cases for all routes which requires authentication', function(){
	this.timeout(10000);
	before(loginUser());
	
	//commentsRouter test cases
	it('get comments check', function(done) {
		server.get('/comment/' + widgetId)
			.expect(200).end(function(err, res) {
				if(err) return done(err);
					assert.equal(res.body._id, widgetId);
					done();
		});
	});
	
	it('get commenters check', function(done) {
		server.get('/comment/commenters/' + widgetId)
			.expect(200, done);
	});
	
	//dashboard Router test cases
	
	it('testing userData route', function(done) {
		server.get('/dashboard/userData')
			.expect(200, done);
	});
	
	it('testing getSharedDashboards route', function(done) {
		server.get('/dashboard/userData')
			.expect(200, done);
	});
	
	it('testing getDashboard for user route', function(done) {
		server.get('/dashboard/getDashboard/'+ userid)
			.expect(200, done);
	});
	
	//user Router test cases
	it('test to get dashboard for loggedin user', function(done) {
		server.get('/user/dashboard')
			.expect(200, done);
	});
	
	it('test to get shared dashboard for loggedin user', function(done) {
		server.get('/user/dashboard/sharedWithMe')
			.expect(200, done);
	});
	
	//test cases for widgetRouter
	
	it('test to get all widgets', function(done) {
		server.get('/widgets')
			.expect(200, done);
	});
	
	it('test to get new widgetId', function(done) {
		server.get('/widgets/getNewWidgetId')
			.expect(200, done);
	});
	
	//test cases for widgetMdsRouter
	it('test to get all studio widgets', function(done) {
		server.get('/widgetsMdx')
			.expect(200, done);
	});
	
	after(logoutUser());
});



function loginUser() {
    return function(done) {
        server.post('/login')
            .send({ username: username, password: password })
            .expect(200)
			  .timeout(10000)
            .end(function (err, res) {
			  		if (err) return done(err);
			  			console.log('logged in to make user available to all routes');
			  			return done();
        });
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
		});
	};
}
	
