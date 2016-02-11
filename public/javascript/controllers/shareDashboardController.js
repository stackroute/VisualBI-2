angular.module('vbiApp')
    .controller('shareDashboardController', ['$rootScope', '$scope', '$uibModal', 'userManager', '$http', '$uibModalInstance', 'sharedDashboards', '$timeout',
        function($rootScope, $scope, $uibModal, userManager, $http, $uibModalInstance, sharedDashboards, $timeout) {

            $scope.validUserNames = [];
            $scope.tags = [];
            $rootScope.dashboardAlert = "";$scope.userNames=[];

            sharedDashboards.forEach(function(userObj) {
              $scope.validUserNames.push(userObj.displayname);
            });

            $scope.tagAdded = function(tag) {
              $scope.userNames.push(tag.username);
              if(~$.inArray(tag.username, $scope.validUserNames)){
                $scope.shareErrMessage = tag.username+"user already exists";
              }else{
                $scope.shareErrMessage = "can share";
              }
            };

            $scope.tagRemoved = function(tag) {
                $scope.shareErrMessage = '';
                $scope.userNames.pop(tag.username);
            }


            //remove loop assaign usernames directly to scope
            $scope.shareDashboard = function() {
              console.log($scope.userNames);
                userManager.shareDashboard($scope.userNames, $scope.selectedPermisson.name)
                    .then(function(userid) {
                        $uibModalInstance.close();
                        var nUsers = $scope.userNames.length;
                        $rootScope.dashboardAlert = "Shared with " + nUsers + " users.";
                        userManager.timeoutDashboardAlert()
                            .then(function(result) {
                                $rootScope.dashboardAlert = "";
                            })
                    })
            };

            $scope.loadUserNames = function($query) {
                return userManager.loadUserNames($query)
                    .then(function(data) {
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
        }
    ]);
