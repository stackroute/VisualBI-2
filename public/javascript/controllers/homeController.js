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
    * 2. Partha Mukherjee
    * 3. Nabila Rafi
    * 4. Venkatakrishnan U
    * 5. Arun Karthic R
    * 6. Hari Prasad Timmapathini
	 * 7. Yogesh Goyal
 */
angular.module('vbiApp')
    .controller('homeController', ['$rootScope', '$scope', 'userManager', '$location', '$cookies','$timeout', '$uibModal', 'chartRenderer', '$log', 'editManager', '$http', 'widgetManager', '$route', '$mdDialog', function($rootScope, $scope, userManager, $location, $cookies, $timeout, $uibModal, chartRenderer, $log, editManager, $http, widgetManager, $route, $mdDialog) {
		 //TODO: need to refactor permissions
	 $scope.canShare = true;
	 $scope.canEdit = true;
	 $scope.canComment = true;
	 $scope.tabs = [];
	 $scope.showMenu = true;
		 //TODO: dashboardid in rootscope is not required
    var sharedDashboardUserId;
	 $scope.keepPolling = false;
	 //data for every widget will put here. It is required to give more functionality like
	 // line, bar or area chart in mdx grid
	 $scope.widgetData = {}; // it has data for inline charts in mdx grid
	 $scope.currentUserData = {};

	 userManager.getData()
	 .then(function(userData) {
			$scope.currentUserData = userData;
			// Make additional dashboard. Assuming that there is only one dashboard now
			if($scope.currentUserData && $scope.currentUserData.dashboards.length > 0) {
				var dashboard = $scope.currentUserData.dashboards[0];
				$rootScope.currentDashboard = dashboard._id;
					 if(dashboard.tabs && dashboard.tabs.length > 0) {
								$scope.tabs = dashboard.tabs;
					 }
				}
		});

		 var pollForNewComments = function() {
        if($scope.keepPolling) {
			  $timeout(function() {
			  //update comments from server for current tab
            if($scope.tabs && $scope.tabs.length > 0) {
					$scope.tabs.forEach(function(tab, index, ar) {
						tab.rows.forEach(function(row, rIndex) {
							row.columns.forEach(function(col, cIndex) {
								if(col.widgetId && col.widgetId._id) {
									widgetManager.getComment(col.widgetId._id)
										.then(function(cm){
										var widget = cm.data;
										if(widget.comments && widget.comments.length > 0) {
											col.widgetId.comments = widget.comments;
											col.widgetId.commentsCounter = widget.commentsCounter;
											col.widgetId.lastCommentedBy = widget.lastCommentedBy;
											col.widgetId.commentersCounter = widget.commentersCounter;	
										}
										
								});
								}
							})
						})
					})
				}
			   pollForNewComments();
        }, 10000);
		  }
    	};
		 
		$scope.$watch($scope.keepPolling, pollForNewComments)
//		pollForNewComments();
		$scope.keepPolling = true; //start polling	 
		$scope.logout = function() {
			$scope.keepPolling = false;
			userManager.logout()
				.then(function() {
					$cookies.remove($rootScope.authToken);
					$location.url('/');
			}).catch(function(err) {
				//even if any error redirect to home
				$location.url('/');
			});

		};

		$scope.showCurrentUserDashboard = function(){
			userManager.getData().then(function(userData){ $scope.currentUserData = userData; });
			if($scope.currentUserData && $scope.currentUserData.dashboards.length > 0) {
				var dashboard = $scope.currentUserData.dashboards[0];
				$rootScope.currentDashboard = dashboard._id;
				$scope.tabs = dashboard.tabs;
				$scope.canShare = true;
				$scope.canEdit = true;
				$scope.canComment = true;
				$location.url('/');
			}
		};

		$scope.showSharedDashboard = function(userid, dashboardId, permission){

			userManager.getDashboard(userid, dashboardId)
				.then(function(sharedDashboard) {
					if(sharedDashboard) {
            sharedDashboardUserId = userid;
						$scope.tabs = sharedDashboard.tabs;
						$scope.canShare = false;
						$scope.canEdit = permission.toUpperCase() === "CAN EDIT";
						$scope.canComment = permission.toUpperCase() === "CAN EDIT" || permission.toUpperCase() === "CAN COMMENT";
						$location.url('/');
					}
			});
		};

        /*share Dashboard Modal*/
    	$scope.shareDashboardModal = function(currentUserData) {
      var shareConfig = {
        templateUrl: 'shareModal',
        controller: 'shareDashboardController',
        resolve: {
          sharedDashboards: function(){
            return currentUserData.dashboards[0].sharedWith; //assuming there is only one dashboard.
          }
        }
      };
      $uibModal.open(shareConfig);
  }

		$scope.fullScreen = function(widget) {
			
				var modalConfig = {
					templateUrl: 'chartModal',
					controller: 'chartModalController',
					size: 'lg',
					resolve: {
						chartInfo: function(){
							return {
								chartRendererMethod: widget.chartRenderer,
								parameters: widget.parameters,
								title: widget.title,
								widgetId: widget._id,
								canComment: $scope.canComment
							};
						}
					}
				}
				$uibModal.open(modalConfig);
		}
				
		$scope.showGraphColumn = function(redererService, containerId, graphMethod) {
			chartRenderer.executeMethod(redererService, graphMethod, [containerId, $scope]);
		}

		 //Show Modal Graph
		$scope.openModalGraph = function(template, indexPassed, widgetUid) {
		  var modalInstance = $uibModal.open({
			 templateUrl : template,
			 controller : "ModalGraphController",
			 indexPassed : indexPassed,
			 resolve : {
				graphData : function(){
				  return $scope.widgetData[widgetUid];
				},
				index : function() {
				  return indexPassed;
				}
			 }
		  });
		};

		 //TODO: required
		$scope.lastCommentBy = function(comments){
			return typeof comments !== 'undefined' && comments.length > 0 ? comments[comments.length - 1].userid : "";
		};

    $scope.createTab = function(tab) {
      var tabCount = $scope.tabs.length;
      var newCount = 0;
      if(tabCount > 0) {
        var curCount = tabCount - 1;
        newCount = $scope.tabs[curCount].tabId.toString().split('tab')[1];
      }
      var tabId = "tab" + (parseInt(newCount) + 1);
      var newTab = {
        'tabId' : tabId,
        'tabTitle' : tab,
        'rows'  : []
      };
      $scope.tabs[tabCount] = newTab;
      $scope.gotoEditPage($scope.tabs, tabCount);
    }

    $scope.renameTab = function(newTitle, tabIndex) {
      $scope.tabs[tabIndex].tabTitle = newTitle;
      saveTabsToServer();
      $route.reload();
    }

    $scope.gotoEditPage = function(tabs, index) {
      editManager.setTabDetails(tabs, index, sharedDashboardUserId);
      $location.url('/edittab');
    }

    $scope.titleModal = function(value, index) {
      var titleModalConfig = {
        templateUrl: 'customWidget',
        controller: 'titleController',
        resolve: {
					tabTitle: function(){
						return {
              setType: value,
              tabIndex: index
						};
					}
        }
      };
      $uibModal.open(titleModalConfig);
    }

    $scope.removeTab = function(tabId) {

      var confirm = $mdDialog.confirm()
            .title('Would you like to delete the tab?')
            .ariaLabel('Tab Confirmation')
            .targetEvent(event)
            .ok('Yes')
            .cancel('No');
      $mdDialog.show(confirm).then(function() {
        var len = $scope.tabs.length;
        while(len--) {
          if(tabId == $scope.tabs[len].tabId) {
            $scope.tabs.splice(len, 1);
            break;
          }
        }

        saveTabsToServer();

      }, function() {
      });
    }



    saveTabsToServer = function() {
      var params={
                  tabs: $scope.tabs
               };

               userManager.saveTab(params);

      // $http({
      //     url: "/user/savetab",
      //     method: "POST",
      //     data: params,
      //     headers : {
      //         'Content-Type': 'application/json'
      //     }
      // }).success(function successCallback(data, status) {
      //     $location.url('/');
      //
      // }, function errorCallback(response) {
      // });
    }
}]).directive('showonhoverparent',
   function() {
      return {
         link : function(scope, element, attrs) {
            element.parent().bind('mouseenter', function() {
                element.show();
            });
            element.parent().bind('mouseleave', function() {
                 element.hide();
            });
       }
   };
});

