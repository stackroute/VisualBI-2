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
    * 2. Partha Mukherjee
    * 3. Nabila Rafi
    * 4. Venkatakrishnan U
    * 5. Arun Karthic R
    * 6. Hari Prasad Timmapathini
	 * 7. Yogesh Goyal
 */
angular.module('vbiApp').controller('registerController',['UserService','Upload','$window','$location', '$rootScope','$scope',function(UserService,Upload,$window,$location, $rootScope, $scope){

        var regCtrl = this;
        regCtrl.errorMessage = "";
        regCtrl.submit = function(){ //function to call on form submit
            if (regCtrl.file) { //check if from is valid
                regCtrl.upload(regCtrl.file); //call upload function
            }
        };

        regCtrl.upload = function (file) {
            Upload.upload({
                url: '/upload', //webAPI exposed to upload the file
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){ //validate success
                    $window.alert('Success ' + resp.config.data.file.name + 'uploaded successfully ');
                } else {
                    $window.alert('an error occured');
                }
            }, function (resp) { //catch error

                $window.alert('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                regCtrl.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
        };



        regCtrl.register = function () {
            regCtrl.errorMessage = "";
            regCtrl.dataLoading = true;
            UserService.register(regCtrl.user)
            .then(function (response) {
          $rootScope.showRegisterPage=false;
          //console.log($rootScope.showRegisterPage);
					$rootScope.registerUserMessage = 'New user registered successfully. SignIn to access dashboard';
          //  regCtrl.errorMessage ="successfully registered"
          $location.path("/");
				}).catch(function(err){
//						alert('Failed to add user - ' + err.message);
						regCtrl.errorMessage = err.data.error.message;
					}
			)};

		 regCtrl.cancel = function(){
			 $location.path("/");
		 };
    }]);
