angular.module('vbiApp').controller('chartModalController', function($rootScope,$scope,$http,$httpParamSerializer,$uibModalInstance, chartInfo) {
    
    $scope.postComment=function(){
        console.log('Posting comment -> '+$scope.userComment);
        
        var parameters={userid:'ashok',
                        comment:$scope.userComment,
                        widgetid:'568df7978aaf007e56689718'
                 };
        
        console.log($scope);
        console.log($http);
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
            //console.log(response);
        });
    };

    $scope.chartInfo = chartInfo;
	$scope.hide = function () {
    $uibModalInstance.dismiss('cancel');
  	};
});