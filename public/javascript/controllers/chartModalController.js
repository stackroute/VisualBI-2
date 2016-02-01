angular.module('vbiApp').controller('chartModalController', function($rootScope,$scope,$http,$httpParamSerializer,$uibModalInstance, chartInfo) {
    
	var commentType='glyphicon-check',commentCategory="info";
	
	$scope.registerCommentTypeFlag=function(){
		console.log('Comment type selection : Flag');
		commentType='glyphicon-flag';
		commentCategory='danger';
	}
	
	$scope.registerCommentTypeApprove=function(){
			console.log('Comment type selection : Approve');
		commentType='glyphicon-check';
		commentCategory='info';
	}
	
	$scope.registerCommentTypeWarning=function(){
			console.log('Comment type selection : Warning');
		commentType='glyphicon-exclamation-sign';
		commentCategory='danger';
	}
		
            $scope.IsVisible = false;
            $scope.IsNotVisible = true;
            $scope.ShowHide = function () {
                $scope.IsVisible = $scope.IsVisible ? false : true;
                $scope.IsNotVisible = $scope.IsVisible ?false : true;
                
            }
    $scope.postComment=function(){
        console.log('Posting comment -> '+$scope.userComment+' '+commentType);
		console.log('Passed widget ID is '+chartInfo.widgetId);
        
        var parameters={userid:'ashok',
                        comment:$scope.userComment,
                        widgetid:chartInfo.widgetId,
						commentType:commentType,
						commentCategory:commentCategory
                 };
        
        console.log('Post section begins here!'+$rootScope.loggedInUser.authToken);
		
		$http({
            url: "/addcomment",
            method: "POST",
            data: parameters,
            headers : {
                'Content-Type': 'application/json'
            }
        }).success(function successCallback(data, status) {
            console.log('Post successful');
            console.log(data);
        }, function errorCallback(response) {
        });
        
        chartInfo.comments.push({userid:'ashok',
                            badgeClass:commentCategory,
                            badgeIconClass:commentType,
                            comment:$scope.userComment,
                            when:Date()
        });
        $scope.userComment='';
        commentType='glyphicon-check',commentCategory='info';
    };

    $scope.chartInfo = chartInfo;
	$scope.hide = function () {
    $uibModalInstance.dismiss('cancel');
  	};
});