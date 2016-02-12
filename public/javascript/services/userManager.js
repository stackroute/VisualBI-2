angular.module('vbiApp')
    .service('userManager', ['$http', '$timeout', '$location', function($http, $timeout,$location) {
        return {
            login: function(user, done) {
                $http.post('/login', {
                        username: user.username,
                        password: user.password
                    })
                    .success(function(data, status, headers, config) {
                        done(null, data);

                    }).error(function(data, status, header, config) {
                        error = "Invalid User name or password!"
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
                    url: '/dashboard/getDashboard/' + userid
                }).then(function(res) {
                    return (res.data);
                });
            },
            //returns dashboard of current loggedin user
            getData: function() {
                return $http({
                    method: 'GET',
                    url: '/dashboard/userData'
                }).then(function(res) {
                    return (res.data);
                });
            },

					//TODO: Need to change it to get request
            timeoutDashboardAlert: function() {
                return $timeout(function() {}, 5000).then(function() {
                    return (true);
                });
            },

            shareDashboard: function(userNames, permission) {
                var parms = JSON.stringify({
                    userNames: userNames,
                    permission: permission
                });
                return $http.post('/dashboard/shareDashboard', parms)
                    .then(function(res) {
                        return (res);
                    });
            },

            loadUserNames: function($query) {
              return $http({
                  method: 'GET',
                  url: '/dashboard/userList/' + $query
              }).then(function(res) {
                    var userNames = res.data;
                    return userNames.filter(function(userNameObj) {
                        return true;//ngtagsinput plugin expects true value by comparing $query with list of users in data.
                      });
                  });
            },
            
              saveTab : function(params){

              $http({
                  url: "/user/savetab",
                  method: "POST",
                  data: params,
                  headers : {
                      'Content-Type': 'application/json'
                  }
              }).success(function successCallback(data, status) {
                  $location.url('/');

              }, function errorCallback(response) {
              });
            },

            getCommenters: function(widgetId) {

                return new Promise(function(resolve, reject) {


                    //POST request to Mongo to write the comment to the database, with parameters object as payload
						$http.get('/comment/commenters/'+widgetId).then(function successCallback(data, status) {
                        resolve(data);
                    }, function errorCallback(err) {
                        reject(err);
                    }); //http ends here
                }); // Promise ends here

            },
			   getDashboardsSharedWithMe: function() {
					return $http.get('/user/dashboard/sharedWithMe')
					.success(function(data) {
						return data.sharedDashboards;
					})
					.error(function(error){
						return error;
					});
        		}
        };
    }]);
