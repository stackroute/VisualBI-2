angular.module('vbiApp')
    .controller('shareDashboardController', ['$rootScope','$scope','$uibModal','userManager','$http', '$uibModalInstance','sharedDashboards','$timeout',
    function($rootScope, $scope, $uibModal, userManager, $http, $uibModalInstance, sharedDashboards, $timeout){

      $scope.validUserNames = []; $scope.tags = [];$scope.dashboardAlert=true;

      $scope.tagAdded = function(tag) {
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
          // $uibModalInstance.close();
          $scope.dashboardAlert = false;
          userManager.toggleDashboardAlert()
          .then(function(result){
            $scope.dashboardAlert = result;
          })

          // $scope.toggleDashboardAlert();
          // console.log($scope.dashboardAlert);

      })};
      // $scope.toggleDashboardAlert = function () {
      //          $scope.dashboardAlert=false;
      //          console.log($scope.dashboardAlert);
      //          $timeout(function () {
      //            $scope.dashboardAlert = true;console.log($scope.dashboardAlert);
      //          }, 3000);
      // };

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
