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
            UserService.register(vm.user,function(){})
//            .then(function (response) {
//                    if (response.success) {
//                        console.log('Registration successful & Data in user', user.password);
//                        //$location.path('/login');
//                    } else {
//                        console.log("Error");
//                        vm.dataLoading = false;
//                    }
//                });
        }
    }
 
})();