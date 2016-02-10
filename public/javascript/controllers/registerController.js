(function () {
    'use strict';
 
    angular.module('vbiApp').controller('registerController', registerController);
 
    registerController.$inject = ['UserService','Upload','$window','$location', '$rootScope','$scope'];

    function registerController(UserService,Upload,$window,$location, $rootScope, $scope) {
       
        var regCtrl = this;
        regCtrl.errorMessage = "";
        regCtrl.submit = function(){ //function to call on form submit
            if (regCtrl.file) { //check if from is valid
                regCtrl.upload(regCtrl.file); //call upload function
            }
        };

        regCtrl.upload = function (file) {
            Upload.upload({
                url: 'http://localhost:8080/upload', //webAPI exposed to upload the file
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){ //validate success
                    $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
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
					$rootScope.registerUserMessage = 'New user registered successfully. SignIn to access dashboard'
					$location.path("/");
				}).catch(function(err){
//						alert('Failed to add user - ' + err.message);
						regCtrl.errorMessage = err.data.error.message;
					}
			)};

		 regCtrl.cancel = function(){
			 $location.path("/");
		 };
    }
})();
