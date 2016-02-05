angular.module('vbiApp')
    .controller('shareDashboardController', ['$rootScope','$scope','$uibModal','userManager','$http', '$uibModalInstance','sharedDashboards',
    function($rootScope, $scope, $uibModal, userManager, $http, $uibModalInstance, sharedDashboards){
      $scope.validUserNames = []; $scope.tags = [];
      $scope.tagAdded = function(tag) {
          userManager.getUserId(tag.username,$rootScope.currentDashboard,$scope.permission)
          .then(function(result){
            if(result == true)
              // {$scope.validUserNames.push(tag.username);
              $scope.shareErrMessage = "can be shared";
            else {
              $scope.shareErrMessage = result;
            }
          })
      };

      sharedDashboards.forEach(function(userObj){
        $scope.validUserNames.push(userObj.username);
      });


      //remove loop assaign usernames directly to scope
      $scope.shareDashboard = function(){
        $scope.userNames = $scope.tags;
        userManager.shareDashboard($scope.userNames,$rootScope.currentDashboard,$scope.permission)
        .then(function(userId){

        })
      }
      $scope.loadEmails = function($query) {
        return userManager.loadEmails($query)
               .then(function(data){
                 return data;
               })
      }

      $scope.closeModal = function() {
        $uibModalInstance.close();
      };

      $scope.containers = [{
            name: 'Can Edit'
          }, {
            name: 'Can Comment'
          }, {
            name: 'Can View'
          }];
      $scope.changedPermission = function(permission) {
      $scope.permission = permission.name;
      };

    }]);
