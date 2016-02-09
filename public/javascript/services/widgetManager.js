angular.module('vbiApp').service('widgetManager', ['$http', function($http) {
  return {
	   getWidget: function() {
		    return $http({
          method: 'GET',
					url: '/widgetsMdx'
				}).then(function(res) {
				  return (res.data);
		    });
     },

     getAllWidgets: function() {
		    return $http({
          method: 'GET',
					url: '/widgets'
				}).then(function(res) {
				  return (res.data);
		    });
     }
  };
}]);
