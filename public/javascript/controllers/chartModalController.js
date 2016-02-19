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
    * 4. Venkatakrishnan U
    * 5. Arun Karthic R
    * 6. Hari Prasad Timmapathini
	* 7. Yogesh Goyal
 	*/
angular.module('vbiApp').controller('chartModalController',['userManager','$scope','$http','$uibModalInstance','chartInfo','$route','widgetManager','$rootScope', function(userManager,$scope,$http,$uibModalInstance,chartInfo,$route,widgetManager,$rootScope){
		
    //	set the default comment icon as check icon and color to blue(info)
    var commentType = 'glyphicon-check',
        commentCategory = 'primary',
		commentsCollection=[];
		$scope.commentsVisibility = false;
		$scope.showCommentEditor=false;
		$scope.chartInfo = chartInfo;
		$scope.updatedComment; 	
	
		widgetManager.getComment(chartInfo.widgetId)
			.then(function(widgetData){
				var userComments = widgetData.data.comments;
				$scope.showHideVisibility= (widgetData.data.commenters.length>0) ? true : false;
				$scope.commentsVisibility= (widgetData.data.commenters.length>0) ? true : false;

				angular.forEach(userComments, function(comment, key){
					commentsCollection.push({
					commentId : comment._id,
					displayName: comment.displayName,
					comment: comment.comment,
					badgeClass: comment.badgeClass,
					badgeIconClass: comment.badgeIconClass,
					commenterThumb: {'background-image': 'url("../'+comment.userImage.substring(6)+'")','background-size': '50px 50px'},
					when: comment.datetime
					});
				});
				$scope.comments = commentsCollection;
		});
	
		//	function to set the comment icon class and color
		$scope.registerCommentType=function(icon){
			commentType='glyphicon-'+icon;
			}
		$scope.showEditView=function(index){
			$scope.activeCommentIndex=index;
		}
		$scope.isShowingEditView=function(index){
			return $scope.activeCommentIndex===index;
		}
		
		$scope.cancelEditView=function(index){
			$scope.activeCommentIndex=-1;
			//alert($scope.comment.commentId
		}
		
		$scope.saveEditedComment=function(commentIndex){
			//console.log('Comment Id '+commentId+' will be updated soon');
			console.log($scope.comments[commentIndex]);
	
			var parameters={
				commentId:$scope.comments[commentIndex].commentId,
				comment: $scope.comments[commentIndex].comment,
				bageClass:  $scope.comments[commentIndex].badgeClass,
				bageIconClass:  $scope.comments[commentIndex].badgeIconClass,
			}
			
			widgetManager.updateComment(parameters).then(function(data){
				console.log('Updated succcessfully');
			})
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
		
	
		widgetManager.saveComment(parameters).then(function(data) {
			
			var commentThumbStyle = {'background-image': 'url("../'+$rootScope.loggedInUser.imagePath.substring(6)+'")',
				'background-size': '50px 50px'};

			$scope.comments.push({
                displayName: $rootScope.loggedInUser.displayName, 
                badgeClass: commentCategory,
                badgeIconClass: commentType,
                comment: newComment,
				commenterThumb:commentThumbStyle,
                when: Date()
            });

            $scope.userComment = '';
            commentType = 'glyphicon-check', commentCategory = 'primary';
	
			if($scope.showHideVisibility == false){
				$scope.commentsVisibility = true;
				$scope.showHideVisibility = true;
			}
        });

    };

    

    $scope.hide = function() {
        $uibModalInstance.dismiss('cancel');
    };
	
}]);