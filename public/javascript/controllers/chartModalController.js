angular.module('vbiApp').controller('chartModalController', function($rootScope,$scope,$http,$uibModalInstance, chartInfo) {
    
	var commentType='glyphicon-check',commentCategory='info';
	
	$scope.registerCommentType=function(icon){
		console.log('Comment type selection : '+icon);
		commentType='glyphicon-'+icon;
		
		if(icon=='flag'||icon=='exclamation-sign'){	
			commentCategory='danger';
		}
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
            console.log('Comment post request successful');
            console.log(data);
        }, function errorCallback(response) {
        });
    };

    $scope.chartInfo = chartInfo;
	$scope.hide = function () {
    $uibModalInstance.dismiss('cancel');
  	};
});