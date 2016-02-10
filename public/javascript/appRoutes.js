angular.module('vbiApp')
    .config(['$routeProvider', function($routeProvider) {

        $routeProvider

        .when('/', {
            templateUrl: 'views/login.html',
            controller: 'loginController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'registerController'
        })

        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })
        .when('/edittab', {
          templateUrl: 'views/edittab.html',
          controller: 'editController'
        })
	    .when('/settings', {
            templateUrl: 'views/settings.html',
            controller: 'SettingsController'
        })
        .otherwise({
        		redirectTo: '/home'
        });



}]).run(['$rootScope','$location', '$cookies', function($rootScope, $location, $cookies) {
		//cookie name which will store authentication token
		$rootScope.authToken = "authToken";

	  $rootScope.$on('$routeChangeStart', function(event, next, current) {
		  var authToken = $cookies.get($rootScope.authToken);
		  var currentUrl = $location.url();

		  if(authToken) {
			  $rootScope.loggedInUser= JSON.parse(authToken);
			  if(currentUrl == '/') {

				  $location.path("/home");
        		}
		  }
		  else if(currentUrl == '/home') {
			  $location.path("/");
		  }
	  });
}]);
