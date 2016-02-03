angular.module('vbiApp')
    .controller('shareDashboardController',['$rootScope','$scope','userManager','$http',function($rootScope,$scope,userManager,$http){

      $scope.tags = [];
      $scope.tagAdded = function(tag) {
          console.log('Tag added: ', tag.username);
          userManager.getUserId(tag.username,$rootScope.currentDashboard)
          .then(function(result){
            console.log(result);
          })
      };


      //remove loop assaign usernames directly to scope
      $scope.shareDashboard = function(){
        $scope.userNames = $scope.tags;
        console.log($scope.userNames);
        userManager.shareDashboard($scope.userNames,$rootScope.currentDashboard)
        .then(function(userId){
          console.log(userId);
        })
      }

      // $scope.sharedDashboard =function(){
      //   userManager.sharedDashboard().
      //   then(function(res){
      //     console.log(res);
      //   })
      // }
      //
      // $scope.userList = function(){
      //   console.log($scope.shareWithUsername);
      //   userManager.getUserList($scope.shareWithUsername)
      //   .then(function(users){
      //     console.log(users);
      //   })
      // }
      //
      $scope.loadEmails = function($query) {
        return userManager.loadEmails($query)
               .then(function(data){
                 return data;
               })
      }
    }]);
