angular.module('vbiApp').service('UserService', ['$timeout', '$filter', '$q', '$http', function($timeout, $filter, $q, $http) {

	this.register = function register(user) {
		return $http
			.post('/register', {
				  username:user.username,
				  password:user.password,
				  firstName: user.firstName,
				  lastName: user.lastName,
				  imagePath: user.imagePath,
				  email: user.email
			  }).success(function (data, status, headers, config) {
					return(data);
			  }).error(function (data, status, header, config) {
				  return(data);
			  });

        };
		 
	return this;
}]);