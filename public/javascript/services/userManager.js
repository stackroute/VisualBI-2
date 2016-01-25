angular.module('vbiApp')
    .service('userManager', ['$http', function($http) {
        return {
			  login: function(user, done) {
				  $http.post('/login', {username:user.email, password:user.password})
				  	.success(function (data, status, headers, config) {
					  done(null, data);
					  
				  }).error(function (data, status, header, config) {
					  error = "Invalid User name or passpord!"
					  done(error, data);
					  
				  });
			  },
			  
			  logout: function(user, done) {
				  return $http.get('/logout');
			  },
			  
           getDashboard: function(userid) {
				  return $http({
					  method: 'GET',
					  url: '/dashboard/' + userid
						}).then(function(res) {
						  return (res.data);
						});
           }
        };
        
    }]);