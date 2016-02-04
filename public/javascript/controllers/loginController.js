angular.module('vbiApp')
    .controller('loginController', ['$rootScope', '$location', 'userManager', '$cookies', function($rootScope, $location, userManager, $cookies) {
	 $rootScope.loggedInUser = {};
    this.user = {
        email: "",
        password: ""
    };

    this.errorMessage = "";
    this.login = function() {
		  userManager.login(this.user, function(err, data) {
				if(!err) {
					$rootScope.loggedInUser = JSON.parse($cookies.get($rootScope.authToken));
					$location.url($location.url() + 'home');
				} else {
					 this.errorMessage = err;
				}

		  });
    };
}]);
