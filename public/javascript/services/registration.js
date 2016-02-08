(function () {
    'use strict';
angular.module('vbiApp').factory('UserService', UserService);
 
    UserService.$inject = ['$timeout', '$filter', '$q', '$http'];
    function UserService($timeout, $filter, $q, $http) {
 
        var service = {};
        
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.register = register;
        
        return service;
        
        function GetAll() {
            var deferred = $q.defer();
            deferred.resolve(getUsers());
            return deferred.promise;
        }
 
        function GetById(id) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { id: id });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }
 
        function GetByUsername(username) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { username: username });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }
 
        
        function getUsers() {
            if(!localStorage.users){
                localStorage.users = JSON.stringify([]);
            }
 
            return JSON.parse(localStorage.users);
        }
 
        function setUsers(users) {
            localStorage.users = JSON.stringify(users);
        }
        
          function register(user) {
           return new Promise (function(resolve, reject){
				  $http.post('/register', {
					  username:user.username, 
					  password:user.password,
					  firstName: user.firstName,
					  lastName: user.lastName,
					  imagePath: user.imagePath
				  }).success(function (data, status, headers, config) {
                      
					 	resolve(user);

				  }).error(function (data, status, header, config) {
					  reject(data.error);
				  });
               
                   
			  },function(err){
               reject(err);
           });
                               
 
 
        }
    }
    
})();