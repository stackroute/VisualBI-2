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
    * 4. Venkatakrishnan U
    * 5. Arun Karthic R
    * 6. Hari Prasad Timmapathini
	 * 7. Yogesh Goyal
 */
angular.module('vbiApp')
    .controller('shareDashboardController', ['$rootScope', '$scope', '$uibModal', 'userManager', '$http', '$uibModalInstance', 'sharedDashboards', '$timeout',
        function($rootScope, $scope, $uibModal, userManager, $http, $uibModalInstance, sharedDashboards, $timeout) {

            $scope.validUserNames = [];
            $scope.tags = [];
            $rootScope.dashboardAlert = "";$scope.userNames=[];
			  //TODO: currentDashboard id has to be removed
			  //TODO: need to fetch only matching users
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
