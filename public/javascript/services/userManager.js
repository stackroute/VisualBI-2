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
           getDashboard: function(userid, dashboardId) {
				  return $http({
					  method: 'GET',
					  url: '/dashboard/' + userid + '/' + dashboardId
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

           getUserId: function(userName,currentDashboard,permission){
                     var parms = JSON.stringify({type:"user", userName:userName, currentDashboard:currentDashboard, permission:permission || "Access"});
                   return $http.post('/getUserId', parms)
                   .then(function(res){
                   return (res.data);
                     });
            },

            shareDashboard: function(userNames,currentDashboard,permission){
              console.log(permission || "Access");
              var parms = JSON.stringify({type:"user", userNames:userNames, currentDashboard:currentDashboard, permission:permission || "Access"});
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
								console.log('Comment posted');
								resolve(data);
								//console.log(data);
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
				},
			getCommenters :	function(widgetId){

						return new Promise (function(resolve, reject){


						//POST request to Mongo to write the comment to the database, with parameters object as payload
						$http.get('/addcomment/'+widgetId).then(function successCallback(data, status) {
							resolve(data);
						}, function errorCallback(err) {
							reject(err);
						}); //http ends here
					}); // Promise ends here

			   },
			insertNewCommenterInfo : function(widgetId,userid){
									 return new Promise(function(resolve,reject){
										//POST request to Mongo to write the comment to the database, with parameters object as payload
										$http({
											url: "/addcomment/updateCommenterInfo",
											method: "POST",
											data: {widgetId:widgetId,userid:userid},
											headers : {
												'Content-Type': 'application/json'
											}
										}).success(function successCallback(data, status) {
											if(data.resp=='success'){
												resolve(data.user);
											}
											else
												{
													reject("Error posting to Mongo...")
												}

										}, function errorCallback(err) {

										});

									 },function(err){
										 return(err);
									 });
			}

		};
	}]);
