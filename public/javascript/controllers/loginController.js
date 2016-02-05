angular.module('vbiApp')
    .controller('loginController', ['$rootScope', '$location', 'userManager', '$cookies', '$scope', function($rootScope, $location, userManager, $cookies, $scope) {
	 $rootScope.loggedInUser = {};
    this.user = {
        email: "",
        password: ""
    };
	
	 var self = this;
    this.errorMessage = "";
    this.login = function() {
		  userManager.login(this.user, function(err, data) {
				if(!err) {
					$rootScope.loggedInUser = JSON.parse($cookies.get($rootScope.authToken));
					$location.url($location.url() + 'home');
				} else {
					 self.errorMessage = err;
				}

		  });
	 };
	
	$scope.$watch(function() {
		return self.user.password;}, function(newValue) {
		self.errorMessage = "";
	})
}])