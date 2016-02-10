(function () {
    'use strict';
angular.module('vbiApp').factory('UserService', UserService);

    UserService.$inject = ['$timeout', '$filter', '$q', '$http'];
    function UserService($timeout, $filter, $q, $http) {
        var service = {};
        service.register = register;
        return service;

          function register(user) {
           return $http.post('/register', {
            useremail:user.useremail,
					  username:user.username,
					  password:user.password,
					  firstName: user.firstName,
					  lastName: user.lastName,
					  imagePath: "test path"
				  }).success(function (data, status, headers, config) {
					 	return(data);
				  }).error(function (data, status, header, config) {
					  return(data);
				  });

        }
    }

})();
