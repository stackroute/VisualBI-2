angular.module('vbiApp').controller('chartModalController', function($rootScope,$scope,$http,$uibModalInstance, chartInfo) {
    //	set the default comment icon as check icon and color to blue(info)
	var commentType='glyphicon-check',commentCategory='primary'; 
	
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

    $scope.postComment=function(){
			
		var loggedInUser='',comment=$scope.userComment;
		//		the payload for POST request to the server
		var parameters={comment:comment,
                        widgetid:chartInfo.widgetId,
						commentType:commentType,
						commentCategory:commentCategory
                 };
		
		//POST request to Mongo to write the comment to the database, with parameters object as payload
		$http({
            url: "/addcomment",
            method: "POST",
            data: parameters,
            headers : {
                'Content-Type': 'application/json'
            }
        }).success(function successCallback(data, status) {

			if(data.resp=='success'){
			
				loggedInUser=data.user;
				
				chartInfo.comments.push({userid:loggedInUser,
				badgeClass:commentCategory,
				badgeIconClass:commentType,
				comment:comment,
				when:Date()});
								
				$scope.userComment='';
				commentType='glyphicon-check',commentCategory='primary';
        	}
			else
			alert(data.resp+' comment was not posted. Please log out and log in again.');

        }, function errorCallback(response) {
        });
		

    };

    $scope.chartInfo = chartInfo;
	
	$scope.hide = function () {
    	$uibModalInstance.dismiss('cancel');
  		};
});