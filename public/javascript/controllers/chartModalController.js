angular.module('vbiApp').controller('chartModalController',['userManager','$scope','$http','$uibModalInstance','chartInfo','$route', function(userManager,$scope,$http,$uibModalInstance,chartInfo,$route){
		//	set the default comment icon as check icon and color to blue(info)
		var commentType='glyphicon-check',commentCategory='primary',loggedInUser=''; 
		$scope.commentThumbStyle={};

		//	function to set the comment icon class and color
		$scope.registerCommentType=function(icon){
			commentType='glyphicon-'+icon;
			}
	
		//	function to write to comment entered by the user to the database and to add the comment to modal view
		$scope.IsNotVisible = true;
		$scope.ShowHide = function () {
			$scope.IsVisible = $scope.IsVisible ? false : true;
			$scope.IsNotVisible = $scope.IsVisible ?false : true;

		}

        $scope.postComment=function(updateCommentsModel){
		
		var newComment=$scope.userComment;
		commentThumbStyle={'background-color':'blue'};
		//the payload for POST request to the server
		var parameters={
                        comment:newComment,
                        widgetid:chartInfo.widgetId,
						commentType:commentType,
						commentCategory:commentCategory
                 };
		userManager.pushComment(parameters).then(function(data){
				
				loggedInUser=data.user;
				
				chartInfo.comments.push({userid:loggedInUser,//expectedchanges
					badgeClass:commentCategory,
					badgeIconClass:commentType,
					comment:newComment,
					when:Date()
				});
				console.log('Image path in controller is '+data.image);
			
				$scope.userComment='';
			    commentType='glyphicon-check',commentCategory='primary';
				$scope.$digest();
				
				userManager.getCommenters(chartInfo.widgetId).then(function(data){
					
					var insertIndc=true;
						angular.forEach(data.data[0].commenters,function(commenter,key){
								if(loggedInUser==commenter.commenter){
									insertIndc=false;									
								}
							});
					if(insertIndc){
                        	userManager.insertNewCommenterInfo(chartInfo.widgetId,data.user).then(function(data){
						});
					}
				});
			
		});
		  $route.reload(); //refreshes the background page
 };
			
    $scope.chartInfo = chartInfo;
	
	$scope.hide = function () {
    	$uibModalInstance.dismiss('cancel');
  		};
}]);