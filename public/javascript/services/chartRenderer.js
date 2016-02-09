angular.module('vbiApp')
	.factory('chartRenderer', ['gdpPerCapitaBarChart', 'gdpStackedBarChart', 'plotContinentChart', 'plotNorthEast', 'executeQueryService', 'GraphService', function(gdpPerCapitaBarChart, gdpStackedBarChart, plotContinentChart, plotNorthEast, executeQueryService, GraphService){
		
		this.plotChart = function(serviceName, chartContainer, parameter) {
			var chartRendererMethod = serviceName + '.render(chartContainer, parameter)';
			return eval(chartRendererMethod);
		};
		
		//Call the method from any dependent services
		this.executeMethod = function(serviceName, method, parameters) {
			var paramString = "";
			for(i in parameters) {
				paramString += 'parameters[' + i + ']';
				if(i < parameters.length - 1)
					paramString += ', ';
			}
			
			var methodToExecute = serviceName + '.'+ method +'(' + paramString + ')';
			eval(methodToExecute);
		};
		
		return this;

}]);