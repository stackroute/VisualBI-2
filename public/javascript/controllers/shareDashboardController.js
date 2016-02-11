/*
    * Copyright 2016 NIIT Ltd, Wipro Ltd.
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *    http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    *
    * Contributors:
    *
    * 1. Ashok Kumar
    * 2. Partha Mukharjee
    * 3. Nabila Rafi
    * 4. Venkatakrishnan
    * 5. Arun Karthic
    * 6. Hari Prasad Timmapathini
	 * 7. Yogesh Goyal
 */
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
