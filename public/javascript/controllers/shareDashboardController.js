angular.module('vbiApp')
    .controller('shareDashboardController',['$rootScope','$scope','$uibModal','userManager','$http',function($rootScope,$scope,$uibModal,userManager,$http){


//       /*share Dashboard Modal*/
//  $scope.shareModalClick = function() {
//    var shareConfig ={
//      templateUrl: 'shareModal',
//      controller: function($scope, $uibModalInstance) {
//            $scope.closeModal = function() {
//              $uibModalInstance.close();
//            };
//          }
//        };
//    $uibModal.open(shareConfig);
//
// }

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
          alert(userId);

        })

      }
      $scope.loadEmails = function($query) {
        return userManager.loadEmails($query)
               .then(function(data){
                 return data;
               })
      }

      $scope.containers = [{
            name: 'Can Edit'
          }, {
            name: 'Can Comment'
          }, {
            name: 'Can View'
          }];

          $scope.select = function(container) {
          $scope.selectedItem = container;
        };
    }]);
    // angular.module("vbiApp").controller("shareCtrl",function($scope){
    //     $scope.containers = [{
    //           name: 'Can Edit'
    //         }, {
    //           name: 'Can Comment'
    //         }, {
    //           name: 'Can View'
    //         }];
    //
    //         $scope.select = function(container) {
    //         $scope.selectedItem = container;
    //       };
    // });
