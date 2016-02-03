angular.module('vbiApp')
    .controller('homeController', ['$rootScope', '$scope', 'userManager', '$location', '$cookies','$timeout', '$uibModal', 'chartRenderer', function($rootScope, $scope, userManager, $location, $cookies, $timeout, $uibModal, chartRenderer) {
     $scope.user = $rootScope.loggedInUser;
		 $scope.isLoading = false;
		 $scope.tabs = [];
		 $scope.showMenu = true;
		 //data for every widget will put here. It is required to give more functionality like
		 // line, bar or area chart in mdx grid
		 $scope.widgetData = {};

		 userManager.getDashboard()
			 .then(function(dashboards) {
			// Make additional dashboard. Assuming that there is only one dashboard now
			if(dashboards && dashboards.length > 0) {
				var dashboard = dashboards[0];
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
							widgetId: widget._id
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
    $scope.createTab = function() {
      var tabCount = $scope.tabs.length;
      var tabId = "tab" + (tabCount + 1);

      var newTab = {
        'tabId' : tabId,
        'tabTitle' : "newtab",
        'rows'  : [{
            'columns' : [{
                'colWidth': 12
            }]
        }]
      };
      $scope.tabs[tabCount] = newTab;
    }

    $scope.createRow = function(tabId) {
      angular.forEach($scope.tabs, function(tab, key) {
        if(tab.tabId == tabId) {
          var newRow = {
              'columns' : [{
                  'colWidth': 12
              }]
          };
          tab.rows.push(newRow);
        }
      });
    }
}]);
