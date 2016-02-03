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

					 //logged in successfully. load the dashboard
					$rootScope.loggedInUser = data;
					$cookies.put($rootScope.authToken, JSON.stringify($rootScope.loggedInUser));
					 var url = $location.url();
					 $location.url(url + 'home');
				} else {
					 this.errorMessage = err;
				}

		  });
    };
}]);
