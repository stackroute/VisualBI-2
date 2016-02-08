angular.module('vbiApp').controller('chartModalController', ['userManager', '$scope', '$http', '$uibModalInstance', 'chartInfo', '$route', function(userManager, $scope, $http, $uibModalInstance, chartInfo, $route) {
    //	set the default comment icon as check icon and color to blue(info)
    var commentType = 'glyphicon-check',
        commentCategory = 'primary',
		loggedInUser = '';

    //	function to set the comment icon class and color
    $scope.registerCommentType = function(icon) {
        commentType = 'glyphicon-' + icon;
    }

    //	function to write to comment entered by the user to the database and to add the comment to modal view
    $scope.IsNotVisible = true;
    $scope.ShowHide = function() {
        $scope.IsVisible = $scope.IsVisible ? false : true;
        $scope.IsNotVisible = $scope.IsVisible ? false : true;

    }

    $scope.postComment = function(updateCommentsModel) {

        var newComment = $scope.userComment;
        //the payload for POST request to the server
        var parameters = {
            comment: newComment,
            widgetid: chartInfo.widgetId,
            commentType: commentType,
            commentCategory: commentCategory
        };

		
        userManager.pushComment(parameters).then(function(data) {
			
			var imgSrc='url("../'+data.image.substring(6)+'")';
		
			
            loggedInUser = data.user;
			
			if(data.image!='')
				imgSrc='url("'+data.image.substring(6)+'")';
			else
				imgSrc='url("../images/login-page.png")';

			var commentThumbStyle = {'background-image': imgSrc,
				'background-size': '50px 50px'};
			
            chartInfo.comments.push({
                userid: loggedInUser, 
                badgeClass: commentCategory,
                badgeIconClass: commentType,
                comment: newComment,
				commenterThumb:commentThumbStyle,
                when: Date()
            });

            $scope.userComment = '';
            commentType = 'glyphicon-check', commentCategory = 'primary';
            $scope.$apply();

            userManager.getCommenters(chartInfo.widgetId).then(function(data) {

                var insertIndc;
                angular.forEach(data.data[0].commenters, function(commenter, key) {
                    if (loggedInUser == commenter.commenter) {
                        insertIndc = false;
                    }
                });

                if (insertIndc!==false) {
				       userManager.insertNewCommenterInfo(chartInfo.widgetId, loggedInUser).then(function(data) {insertIndc=false});
                }
						$scope.$apply();
						$route.reload(); //refreshes the background page
            });

        });

    };

    $scope.chartInfo = chartInfo;

    $scope.hide = function() {
        $uibModalInstance.dismiss('cancel');
    };
}]);