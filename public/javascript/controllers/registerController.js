(function () {
    'use strict';
 
    angular.module('vbiApp').controller('RegisterController', RegisterController);
 
    RegisterController.$inject = ['UserService','Upload','$window','$location', '$rootScope','$scope'];
    
    function RegisterController(UserService,Upload,$window,$location, $rootScope, $scope) {
       
        var vm = this;
        console.log(vm.form);
        
        vm.submit = function(){ //function to call on form submit
            if (vm.file) { //check if from is valid
                vm.upload(vm.file); //call upload function
            }
        };
        
        vm.upload = function (file) {
            Upload.upload({
                url: 'http://localhost:8080/upload', //webAPI exposed to upload the file
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
				console.log('Register controller');//expectedchanges
				console.log(resp.data);
                if(resp.data.error_code === 0){ //validate success
                    $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                } else {
                    $window.alert('an error occured');
                }
            }, function (resp) { //catch error
                console.log('Error status: ' + resp.status);
                $window.alert('Error status: ' + resp.status);
            }, function (evt) { 
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
        };
        
        vm.register = function () {
            console.log("inside register");
            vm.dataLoading = true;
            UserService.register(vm.user)
            .then(function (response) {
                        console.log('Registration successful for user & Data in user', response);
                     });
        };
        
  
    }
})();