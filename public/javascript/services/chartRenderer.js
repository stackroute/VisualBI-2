angular.module('vbiApp')
	.factory('chartRenderer', ['gdpPerCapitaBarChart', 'gdpStackedBarChart', 'plotContinentChart', 'plotNorthEast', 'executeQueryService', function(gdpPerCapitaBarChart, gdpStackedBarChart, plotContinentChart, plotNorthEast, executeQueryService){
		
		this.plotChart = function(serviceName, chartContainer, parameter) {
			return new Promise(function(resolve, reject) {
				var chartRendererMethod = serviceName + '.render(chartContainer, parameter)';
				eval(chartRendererMethod);
			});
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