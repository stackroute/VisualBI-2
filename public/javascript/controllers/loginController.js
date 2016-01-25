angular.module('vbiApp')
    .controller('loginController', ['$rootScope', '$scope', '$location', 'userManager', '$cookies', function($rootScope, $scope, $location, userManager, $cookies) {
	 $rootScope.loggedInUser = {};
    $scope.user = {
        email: "",
        password: ""
    };
                                    
    $scope.errorMessage = "";
    $scope.login = function() {
		  userManager.login($scope.user, function(err, data) {
				if(!err) {
					
					 //logged in successfully. load the dashboard
					$rootScope.loggedInUser = data;
					$cookies.put($rootScope.authToken, JSON.stringify($rootScope.loggedInUser));
					 var url = $location.url();
					 $location.url(url + 'home');
				} else {
					 $scope.errorMessage = err;
				}
				
		  });
    };
                                    
    
}]);