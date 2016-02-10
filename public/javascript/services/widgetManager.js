angular.module('vbiApp').service('widgetManager', ['$http', '$location',function($http, $location) {

	this.getWidget = function() {
		    return $http({
				 method: 'GET',
						url: '/widgetsMdx'
					}).then(function(res) {
					  return (res.data);
			 });
     },

  this.getAllWidgets = function() {
		    return $http({
          method: 'GET',
					url: '/widgets'
				}).then(function(res) {
				  return (res.data);
		    });
   },

	 this.renameTitle = function(widgetId, title) {

		 	var data = {
				widgetId: widgetId,
				title: title
			};

 		    return $http({
           method: 'POST',
 					 url: '/widgets/renameTitle',
					 data: data

 				}).then(function(res) {
 				  return (res);
 		    });
    },

		this.getNewWidgetId = function() {
			return $http({
				 url: "/widgets/getNewWidgetId",
				 method: "GET",
				 headers : {
					 'Content-Type': 'application/json'
				 }
			}).success(function successCallback(data, status) {
					return (data);
			}, function errorCallback(response) {
			});
		},

		this.saveWidget = function(allparams){

		return $http({
			 url: "/widgets/saveWidget",
			 method: "POST",
			 data: allparams,
			 headers : {
				 'Content-Type': 'application/json'
			 }
		}).success(function successCallback(data, status) {
			$location.url('/');
		}, function errorCallback(response) {
		});
	},

	this.getComment = function(widgetId) {
		return $http.get('/comment/' + widgetId)
			.success(function (data, status, headers, config) {
					return(data);
			  }).error(function (data, status, header, config) {
				  return(data);
			  }); 
	};

	return this;
}]);
