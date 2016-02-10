angular.module('vbiApp').service('widgetManager', ['$http', function($http) {
	
	this.getWidget = function() {
		    return $http({
				 method: 'GET',
						url: '/widgetsMdx'
					}).then(function(res) {
					  return (res.data);
			 });
   };
	
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
