 angular.module('vbiApp').controller('registerController',['UserService','Upload','$window','$location', '$rootScope','$scope',function(UserService,Upload,$window,$location, $rootScope, $scope) {
       
        var regCtrl = this;
	 	var imagePath='';
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
				imagePath=resp.data.destination+resp.data.file;
				
				if(resp.data.error_code === 0){ //validate success
                    $window.alert(resp.config.data.file.name + ' uploaded successfully');
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
			regCtrl.user.imagePath=imagePath;
			
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
	 
 }]);