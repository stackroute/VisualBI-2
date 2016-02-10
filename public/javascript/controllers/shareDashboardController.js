angular.module('vbiApp')
    .controller('shareDashboardController', ['$rootScope', '$scope', '$uibModal', 'userManager', '$http', '$uibModalInstance', 'sharedDashboards', '$timeout',
        function($rootScope, $scope, $uibModal, userManager, $http, $uibModalInstance, sharedDashboards, $timeout) {

            $scope.validUserNames = [];
            $scope.tags = [];
            $rootScope.dashboardAlert = "";
			  //TODO: currentDashboard id has to be removed
			  //TODO: need to fetch only matching users
            $scope.tagAdded = function(tag) {
                userManager.getUserId(tag.username, $rootScope.currentDashboard, $scope.selectedPermisson.name)
                    .then(function(result) {
                        $scope.shareErrMessage = result;
                    })
            };

            $scope.tagRemoved = function() {
                $scope.shareErrMessage = '';
            }

            sharedDashboards.forEach(function(userObj) {
                $scope.validUserNames.push(userObj.username);
            });


            //remove loop assaign usernames directly to scope
            $scope.shareDashboard = function() {
                $scope.userNames = $scope.tags;
                userManager.shareDashboard($scope.userNames, $rootScope.currentDashboard, $scope.selectedPermisson.name)
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
