/*
    * Copyright 2016 NIIT Ltd, Wipro Ltd.
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *    http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    *
    * Contributors:
    *
    * 1. Ashok Kumar
    * 2. Partha Mukharjee
    * 3. Nabila Rafi
    * 4. Venkatakrishnan
    * 5. Arun Karthic
    * 6. Hari Prasad Timmapathini
	 * 7. Yogesh Goyal
 */
angular.module('vbiApp').controller('chartModalController',['userManager','$scope','$http','$uibModalInstance','chartInfo','$route','widgetManager','$rootScope', function(userManager,$scope,$http,$uibModalInstance,chartInfo,$route,widgetManager,$rootScope){
		
    //	set the default comment icon as check icon and color to blue(info)
    var commentType = 'glyphicon-check',
        commentCategory = 'primary',
		loggedInUser = '',
		deleteIndc=false,
		commentsCollection=[];
		$scope.commentsVisibility = true;
		$scope.chartInfo = chartInfo;
	
		widgetManager.getComment(chartInfo.widgetId)
			.then(function(widgetData){
				
				//console.log(widgetData.data.comments);
			
				var userComments = widgetData.data.comments;
				
				var imgSrc="";
			
				angular.forEach(userComments, function(comment, key){
						
					imgSrc='url("../'+comment.userImage.substring(6)+'")';

					
						console.log(comment.userImage);

						commentsCollection.push({
							userid: comment.userid,
							comment: comment.comment,
							badgeClass: comment.badgeClass,
							badgeIconClass: comment.badgeIconClass,
							commenterThumb: {'background-image': imgSrc,
											'background-size': '50px 50px'},
							commenterDpPath : comment.userImage,
							when: Date()
					});
				});
				$scope.comments = commentsCollection;
				console.log($scope.comments);
		});
	
		//	function to set the comment icon class and color
		$scope.registerCommentType=function(icon){
			commentType='glyphicon-'+icon;
			}
	
		//	function to write to comment entered by the user to the database and to add the comment to modal view

	
		$scope.ShowHide = function () {
			$scope.commentsVisibility= $scope.commentsVisibility ? false : true;
		}
		
    $scope.postComment = function(updateCommentsModel) {

        var newComment = $scope.userComment;
        //the payload for POST request to the server
		var parameters = {
				comment:newComment,
				widgetid:chartInfo.widgetId,
				commentType:commentType,
				commentCategory:commentCategory
			  };
		
		console.log('Logged in User -> ');
		console.log($rootScope.loggedInUser);
		
		widgetManager.saveComment(parameters).then(function(data) {
			
		
			var imgSrc='url("../'+data.image.substring(6)+'")';

			var commentThumbStyle = {'background-image': imgSrc,
				'background-size': '50px 50px'};

			$scope.comments.push({
                userid: $rootScope.loggedInUser, 
                badgeClass: commentCategory,
                badgeIconClass: commentType,
                comment: newComment,
				commenterThumb:commentThumbStyle,
                when: Date()
            });

            $scope.userComment = '';
            commentType = 'glyphicon-check', commentCategory = 'primary';
            $scope.$apply();

        });

    };

    

    $scope.hide = function() {
        $uibModalInstance.dismiss('cancel');
    };
	
	$scope.deleteComment=function(array,index){
		array.splice(index,1);
		deleteIndc=true;
	}
}]);