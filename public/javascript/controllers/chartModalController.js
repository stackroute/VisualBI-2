angular.module('vbiApp').controller('chartModalController', function($rootScope,$scope,$http,$uibModalInstance, chartInfo) {
    //	set the default comment icon as check icon and color to blue(info)
	var commentType='glyphicon-check',commentCategory='info'; 
	
	//	function to set the comment icon class and color
	$scope.registerCommentType=function(icon){
		console.log('Comment type selection : '+icon);
		commentType='glyphicon-'+icon;
		
		//other than glyphicon-check, set the comment icon color to blue
		if(icon=='flag'||icon=='exclamation-sign'){	
			commentCategory='primary';
		}
		else{
			commentCategory='success';
		}
	}
	
//	function to write to comment entered by the user to the database and to add the comment to modal view
            $scope.IsNotVisible = true;
            $scope.ShowHide = function () {
                $scope.IsVisible = $scope.IsVisible ? false : true;
                $scope.IsNotVisible = $scope.IsVisible ?false : true;
                
            }
    $scope.postComment=function(){

//		the payload for POST request to the server
		var parameters={userid:'ashok', //expectedchanges
                        comment:$scope.userComment,
                        widgetid:chartInfo.widgetId,
						commentType:commentType,
						commentCategory:commentCategory
                 };
		
		console.log(parameters);
        
		//POST request to Mongo to write the comment to the database, with parameters object as payload
		$http({
            url: "/addcomment",
            method: "POST",
            data: parameters,
            headers : {
                'Content-Type': 'application/json'
            }
        }).success(function successCallback(data, status) {
            //console.log('Comment post request successful');
            //console.log(data);
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