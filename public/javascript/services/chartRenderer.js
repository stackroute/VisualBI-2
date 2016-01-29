angular.module('vbiApp')
	.factory('chartRenderer', ['gdpPerCapitaBarChart', 'gdpStackedBarChart', 'plotContinentChart', 'plotNorthEast', 'executeQueryService', function(gdpPerCapitaBarChart, gdpStackedBarChart, plotContinentChart, plotNorthEast, executeQueryService){
		
		this.plotChart = function(serviceName, chartContainer, parameter) {
			return new Promise(function(resolve, reject) {
				var chartRendererMethod = serviceName + '.render(chartContainer, parameter)';
				//console.log(chartRendererMethod);
                //console.log(chartContainer);
                //console.log(parameter);
				eval(chartRendererMethod);
			});
		};
		
		return this;

}]);