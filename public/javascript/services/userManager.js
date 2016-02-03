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
          },

           getUserId: function(username){
                     return $http({
                       method: 'GET',
                       url: '/getUserId/' +username
                     }).then(function(res){
                       return (res);
                     });
            },
			pushComment: function(parameters) {
						
						return new Promise (function(resolve, reject){
						
						var currentUser='';

								//POST request to Mongo to write the comment to the database, with parameters object as payload
								$http({
									url: "/addcomment",
									method: "POST",
									data: parameters,
									headers : {
										'Content-Type': 'application/json'
									}
								}).success(function successCallback(data, status) {
									if(data.resp=='success'){
										resolve(data.user);
									}
									else
										{
											alert(data.resp+' could not post the comment. Please log out and log in again.');
											reject("Error. comment not posted")
										}

								}, function errorCallback(err) {

								});

						},function(err){
							reject(err);
						});
			}
		}
        }]);
