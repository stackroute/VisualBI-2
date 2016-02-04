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
			  //returns the dashboard of a user
           getDashboard: function(userid) {
				  return $http({
					  method: 'GET',
					  url: '/dashboard/' + userid
						}).then(function(res) {
						  return (res.data);
						});
          },
			  //returns dashboard of current loggedin user
			 getData: function() {
				  return $http({
					  method: 'GET',
					  url: '/dashboard'
					}).then(function(res) {
						  return (res.data);
					});
          },

           getUserId: function(userName,currentDashboard){
                     var parms = JSON.stringify({type:"user", userName:userName, currentDashboard:currentDashboard});
                     return $http.post('/getUserId', parms)
                     .then(function(res){
                       return (res.data);
                     });
            },

            shareDashboard: function(userNames,currentDashboard){
              var parms = JSON.stringify({type:"user", userNames:userNames, currentDashboard:currentDashboard});
                      return $http.post(' /getUserId/shareDashboard', parms)
                      .then(function(res){
                        return (res);
                      });
             },

             loadEmails: function($query) {
                 return $http.post('/getUserList', { cache: true}).then(function(response) {
                   var emails = response.data;
                   return emails.filter(function(email) {
                     return email.username.toLowerCase().indexOf($query.toLowerCase()) != -1;
                   });
                 });
               }
        };

    }]);
