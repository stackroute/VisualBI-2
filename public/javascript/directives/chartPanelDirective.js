angular.module('vbiApp')
    .directive('chartPanel', ['chartRenderer', function(chartRenderer){
	  return {
		  
		  templateUrl: 'views/directiveTemplates/chart.html',
		  replace: true,
		  transclude: true,
		  scope: {
			  parameters: "@",
			  chartRendererMethod : "@",
			  columnWidth: "@"
		  },
		  
		  link: function(scope, elements, attrs) {
//			  console.log(elements[0].childNodes[1]);
			  var params;
			  if(scope.parameters) {
				  params = JSON.parse(scope.parameters);
				  //Fixing bootstrap 1% = 8.33333333 as mentioned in css, so calculating the width accordingly
				  //code to be revisited if get the actual width at runtime.
				  if(scope.columnWidth)
				  		params.width = (8.33333333 * parseInt(scope.columnWidth) * (elements[0].clientWidth))/100
					else
						params.width = elements[0].clientWidth;
			  }
			  chartRenderer.plotChart(scope.chartRendererMethod, elements[0].childNodes[1], params);
		  }
	  };
}]);