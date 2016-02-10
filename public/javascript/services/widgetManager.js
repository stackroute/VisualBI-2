angular.module('vbiApp').service('widgetManager', ['$http', function($http) {

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

	this.getComment = function(widgetId) {
		return $http({
			method: 'GET',
			url: '/comment/' + widgetId
		}).then(function(res){ return(res.data)})
	};

	return this;
}]);
