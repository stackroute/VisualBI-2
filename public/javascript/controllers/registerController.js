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
            imagePath= 'public/images/displayimages/default-user.png';
        regCtrl.errorMessage = "";
	
		$scope.higlightClass={
			'background' : '#5588ff',
			'color' : 	'#ffffff'
		};
		
		$scope.lowlightClass={
			'background' : '#337ab7',
			'color' : 'whitesmoke'
		};
		
        regCtrl.submit = function(){ //function to call on form submit
			$scope.imageUploadIndc=true;
			$scope.imageUploadedIndc=false;
            if (regCtrl.file) { //check if from is valid
                regCtrl.upload(regCtrl.file); //call upload function
            }
        };

        regCtrl.upload = function (file) {
            Upload.upload({
                url: '/upload', //webAPI exposed to upload the file
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){
                   //validate success
                    imagePath = resp.data.path;
                } else {
                    $window.alert('an error occured');
                }
            }, function (resp) { //catch error

                $window.alert('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                regCtrl.progress = progressPercentage; // capture upload progress
				if(regCtrl.progress==100){
					$scope.imageUploadIndc=false;
					$scope.imageUploadedIndc=true;
				}
	           });
        };



        regCtrl.register = function () {
            regCtrl.errorMessage = "";
            regCtrl.dataLoading = true;
            regCtrl.user.imagePath =imagePath;
            UserService.register(regCtrl.user)
            .then(function (response) {
          $rootScope.showRegisterPage=false;
					$rootScope.registerUserMessage = 'You are now registered with Slate. Sign In to access your dashboard';
          $location.path("/");
				}).catch(function(err){
						regCtrl.errorMessage = err.data.error.message;
					}
			)};

		 regCtrl.cancel = function(){
			 $location.path("/");
		 };
    }]);
