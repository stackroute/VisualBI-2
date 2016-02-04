(function () {
    'use strict';
 
    angular
        .module('vbiApp')
        .controller('RegisterController', RegisterController);
 
    RegisterController.$inject = ['UserService', '$location', '$rootScope'];
    function RegisterController(UserService, $location, $rootScope) {
        var vm = this;
 
        vm.register = register;
 
        function register() {
            console.log("inside register");
            vm.dataLoading = true;
            UserService.register(vm.user)
            .then(function (response) {
                    
                        console.log('Registration successful for user & Data in user', response);
                        //$location.path('/login');
                     
                });
        }
    }
 
})();