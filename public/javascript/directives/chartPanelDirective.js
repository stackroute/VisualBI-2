angular.module('vbiApp')
    .directive('chartPanel', ['chartRenderer', function(chartRenderer){
	  return {
		  
		  templateUrl: 'views/directiveTemplates/chart.html',
		  replace: true,
		  transclude: true,
		  scope: {
			  parameters: "@",
			  chartRendererMethod : "@",
		  },
		  
		  link: function(scope, elements, attrs) {
//			  console.log(elements[0].childNodes[1]);
			  var params;
			  if(scope.parameters) {
				  params = JSON.parse(scope.parameters);
			  }
			  chartRenderer.plotChart(scope.chartRendererMethod, elements[0].childNodes[1], params);
			  
//			  var watchMethod = scope.$watch(function() {
//				  		return elements[0].clientWidth;
//			 		}, function(value) {
//				  			if(value > 0 ) {
//								chartRenderer.plotChart(scope.chartRendererMethod, elements[0].childNodes[1], params)
//									.then(function(){watchMethod()});
//							}
//			  		});
		  }
	  };
}]);