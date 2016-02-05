angular.module('vbiApp').controller('chartModalController',['userManager','$scope','$http','$uibModalInstance','chartInfo', '$route', function(userManager,$scope,$http,$uibModalInstance,chartInfo,$route){
		//	set the default comment icon as check icon and color to blue(info)
		var commentType='glyphicon-check',commentCategory='primary',loggedInUser=''; 

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
		//the payload for POST request to the server
		var parameters={
                        comment:newComment,
                        widgetid:chartInfo.widgetId,
						commentType:commentType,
						commentCategory:commentCategory
                 };
		userManager.pushComment(parameters).then(function(user){
	
				chartInfo.comments.push({userid:user,//expectedchanges
					badgeClass:commentCategory,
					badgeIconClass:commentType,
					comment:newComment,
					when:Date()
				});
				
				$scope.userComment='';
			    commentType='glyphicon-check',commentCategory='primary';
				$scope.$digest();
				
				userManager.getCommenters(chartInfo.widgetId).then(function(data){
					console.log('Got the damn commenters');
					console.log(data);
					//console.log(data.data[0].commenters);
					var insertIndc=true;
						angular.forEach(data.data[0].commenters,function(commenter,key){
								if(user==commenter.commenter){
									insertIndc=false;									
								}
							});
					if(!insertIndc){
						console.log('User already present');
					}
					else{
							console.log('Inserting new commenter info');
						
							userManager.insertNewCommenterInfo(chartInfo.widgetId,user).then(function(data){
								console.log('Commenter details added successfully');
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