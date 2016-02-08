angular.module('vbiApp')
    .controller('loginController', ['$rootScope', '$location', 'userManager', '$cookies', '$scope', function($rootScope, $location, userManager, $cookies, $scope) {
	 $scope.registerUserMessage = $rootScope.registerUserMessage;
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
        
    this.newUser = function(){
        $rootScope.showRegisterPage=true;
    };
	
	$scope.$watch(function() {
		return self.user.password;}, function(newValue) {
		self.errorMessage = "";
//		$scope.registerUserMessage = $rootScope.registerUserMessage = "";
	})
}])
