angular.module('vbiApp')
    .directive('headerDirective', function(){
    return {
		 templateUrl: 'views/directiveTemplates/header.html'
    };
	
}).directive('chartPanel', ['plotContinentChart', 'gdpPerCapitaBarChart', 'gdpStackedBarChart', 'plotNorthEast', 'executeQueryService', function(plotContinentChart, gdpPerCapitaBarChart, gdpStackedBarChart, plotNorthEast, executeQueryService){
	  return {
		  
		  templateUrl: 'views/directiveTemplates/chart.html',
		  replace: true,
		  transclude: true,
		  scope: {
			  parameters: "@",
			  chartRendererMethod : "@",
			  isLoading: "="
		  },
		  
		  link: function(scope, elements, attrs) {
			  console.log(elements[0].childNodes[1]);
			  var watchMethod = scope.$watch(function() {
				  		return elements[0].clientWidth;
			 		}, function(value){
				  		if(value > 0) {
							var params;
							  if(scope.parameters) {
								  //parset to Object it not undefined.
								  params = JSON.parse(scope.parameters);
							  }
							var chartRenderer = scope.chartRendererMethod + '.render(elements[0].childNodes[1], params)';
							eval(chartRenderer)
								.then(function(data) {
								
								watchMethod();
								scope.$apply();
							});
						}
			 	});
		  }
	  };
}]);