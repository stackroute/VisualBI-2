angular.module('vbiApp')
    .controller('shareDashboardController', ['$rootScope','$scope','$uibModal','userManager','$http', '$uibModalInstance','sharedDashboards',
    function($rootScope, $scope, $uibModal, userManager, $http, $uibModalInstance, sharedDashboards){

      $scope.validUserNames = []; $scope.tags = [];

      $scope.tagAdded = function(tag) {
        console.log($scope.selectedPermisson);
        debugger;
          userManager.getUserId(tag.username,$rootScope.currentDashboard,$scope.selectedPermisson.name)
          .then(function(result){
              $scope.shareErrMessage = result;
          })
      };

      $scope.tagRemoved = function(){
        $scope.shareErrMessage='';
      }

      sharedDashboards.forEach(function(userObj){
        $scope.validUserNames.push(userObj.username);
      });


      //remove loop assaign usernames directly to scope
      $scope.shareDashboard = function(){
        $scope.userNames = $scope.tags;
        userManager.shareDashboard($scope.userNames,$rootScope.currentDashboard,$scope.selectedPermisson.name)
        .then(function(userid){
          $uibModalInstance.close();
          // console.log(userid);
          //$scope.validUserNames.push(userObj.username);
        })
      }
      $scope.loadUserNames = function($query) {
        return userManager.loadUserNames($query)
               .then(function(data){
                 return data;
               })

      }

      $scope.closeModal = function() {
        $uibModalInstance.close();
      };

      $scope.permissons = [{
            name: 'Can Edit'
          }, {
            name: 'Can Comment'
          }, {
            name: 'Can View'

          }];

      $scope.selectedPermisson = $scope.permissons[2];
    }]);
