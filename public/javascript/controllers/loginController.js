/*
    * Copyright 2016 NIIT Ltd, Wipro Ltd.
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *    http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    *
    * Contributors:
    *
    * 1. Ashok Kumar
    * 2. Partha Mukharjee
    * 3. Nabila Rafi
    * 4. Venkatakrishnan
    * 5. Arun Karthic
    * 6. Hari Prasad Timmapathini
	 * 7. Yogesh Goyal
 */
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
		 //reset the message if when a user login
		  $rootScope.registerUserMessage = "";
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

	})
}])
