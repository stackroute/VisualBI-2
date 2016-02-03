angular.module('vbiApp')
    .controller('homeController', ['$rootScope', '$scope', 'userManager', '$location', '$cookies','$timeout', '$uibModal', '$log', function($rootScope, $scope, userManager, $location, $cookies, $timeout, $uibModal, $log) {
		 $scope.user = $rootScope.loggedInUser;
		 $scope.isLoading = false;
		 $scope.tabs = [];
		 $scope.showMenu = true;
		 userManager.getDashboard($rootScope.loggedInUser.authToken)
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

		$scope.fullScreen = function(chartRenderer, parameters, title, comments) {
			var modalConfig = {
				templateUrl: 'chartModal',
				controller: 'chartModalController',
				size: 'lg',
				resolve: {
					chartInfo: function(){
                        var userComments=[];

                        angular.forEach(comments, function(comment, key){

                            userComments.push({
                                userid: comment.userid,
                                comment: comment.comment,
                                badgeClass: 'danger',
                                badgeIconClass: 'glyphicon-user',
                                when: Date()
                            });
                        });

						return {
							chartRendererMethod: chartRenderer,
							parameters: parameters,
							title: title,
							comments: userComments
						};
					}
				}
			};
			$uibModal.open(modalConfig);
		}

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
