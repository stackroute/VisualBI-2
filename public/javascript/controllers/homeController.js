angular.module('vbiApp')
    .controller('homeController', ['$rootScope', '$scope', 'userManager', '$location', '$cookies','$timeout', '$uibModal', 'chartRenderer', '$log', 'editManager', '$http', '$mdDialog', '$route', function($rootScope, $scope, userManager, $location, $cookies, $timeout, $uibModal, chartRenderer, $log, editManager, $http, $mdDialog, $route) {
     $scope.user = $rootScope.loggedInUser;
		 $scope.canShare = true;
		 $scope.canShare = true;
		 $scope.canEdit = true;
		 $scope.tabs = [];
		 $scope.showMenu = true;
		 //data for every widget will put here. It is required to give more functionality like
		 // line, bar or area chart in mdx grid
		 $scope.widgetData = {};
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


		$scope.logout = function() {
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
			if($scope.currentUserData && $scope.currentUserData.dashboards.length > 0) {
				var dashboard = $scope.currentUserData.dashboards[0];
				$rootScope.currentDashboard = dashboard._id;
				$scope.tabs = dashboard.tabs;
				$scope.canShare = true;
				$scope.canEdit = true;
			}
		};

		$scope.showSharedDashboard = function(userid, dashboardId){
			userManager.getDashboard(userid, dashboardId)
				.then(function(sharedDashboard) {
					if(sharedDashboard) {
						$scope.tabs = sharedDashboard.tabs;
						$scope.canShare = false;
						$scope.canEdit = false;
					}
			});
		};

        /*share Dashboard Modal*/
    $scope.shareModalClick = function() {
      var shareConfig ={
        templateUrl: 'shareModal',
        controller: function($scope, $uibModalInstance) {
    $scope.closeModal = function() {
      $uibModalInstance.close();
              };
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
                        var userComments=[];

                        angular.forEach(widget.comments, function(comment, key){

                            userComments.push({
                                userid: comment.userid,
                                comment: comment.comment,
                                badgeClass: comment.badgeClass,
                                badgeIconClass: comment.badgeIconClass,
                                when: Date()
                            });
                        });

						return {
							chartRendererMethod: widget.chartRenderer,
							parameters: widget.parameters,
							title: widget.title,
							comments: userComments,
							widgetId: widget._id,
							canComment: $scope.canEdit
						};
					}
				}
			};
			$uibModal.open(modalConfig);

		}

		$scope.showGraphColumn = function(redererService, containerId, graphMethod) {
			chartRenderer.executeMethod(redererService, graphMethod, [containerId, $scope]);
		}

		//Show Modal Bar Graph in Modal Window
		$scope.openModalBarGraph = function(indexPassed, widgetUid) {
		  var modalInstance = $uibModal.open({
			 templateUrl : 'modalBarGraph.html',
			 controller : 'ModalGraphController',
			 indexPassed : indexPassed,
			 resolve : {
				graphData : function() {
				  return $scope.widgetData[widgetUid];
				},

				index : function() {
				  return indexPassed;
				}
			 }
		  });
		};

		 //Show Line Modal Graph
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
      editManager.setTabDetails(tabs, index);
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

      $http({
          url: "/user/savetab",
          method: "POST",
          data: params,
          headers : {
              'Content-Type': 'application/json'
          }
      }).success(function successCallback(data, status) {
          console.log('Post successful');
          $location.url('/');

      }, function errorCallback(response) {
          console.log('Post failed');
      });
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
;

angular.module('vbiApp')
    .controller('titleController', ['$scope','$controller','$uibModalInstance', 'tabTitle', function($scope, $controller, $uibModalInstance, tabTitle) {
      var homeCtrl = $scope.$new();
      $controller('homeController',{$scope:homeCtrl});

      $scope.setTabTitle = function(title) {
        $uibModalInstance.close();
        if(tabTitle.setType == 1) {
          homeCtrl.createTab(title);
        } else {
          homeCtrl.renameTab(title, tabTitle.tabIndex)
        }
      }

      $scope.closeModal = function() {
        $uibModalInstance.close();
      }
    }]);
