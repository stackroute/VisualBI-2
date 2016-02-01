angular.module('vbiApp')
    .controller('shareDashboardController',['$scope','userManager',function($scope,userManager){
      $scope.insertSharedDashboard = function(){
        console.log("insertSharedDashboard getting called "+$scope.shareWithUsername);
        userManager.getUserId($scope.shareWithUsername);
      }
    }]);
