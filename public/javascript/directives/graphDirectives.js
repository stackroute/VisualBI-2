

//Directive for modal Bar Graph
angular.module("vbiApp").directive("modalbarGraph", function(GraphService) {
	return {
		restrict : "AE",
		scope : {
			index : "=indexPassed",
			graphArray : "=graphArray"
		},
		link : function(scope,element,attr) {
			var index = scope.index;
			var graphArray = scope.graphArray;
			GraphService.renderModalBarGraph(graphArray[index],element[0]);
		}
	}

});

//Directive for mini Bar Graph
angular.module("vbiApp").directive("minibarGraph", function(GraphService,$compile){
	return {
		restrict : "E",
		scope : {
			data: "=mySet",
			index : "=indexPassed"
		},
		link : function(scope,element,attr) {
			var idx = parseInt(scope.index);
			var dataset = scope.data;
			GraphService.renderMiniBarGraph(dataset[idx],element[0],idx);
			$compile(element.find('div'))(scope.$parent);
		}
	}
});

//Directive for mini Line chart
angular.module("vbiApp").directive("minilineGraph", function(GraphService,$compile){
	return {
		restrict : "E",
		scope : {
			data: "=mySet",
			index : "=indexPassed"
		},
		link : function(scope,element,attr) {
			var idx = parseInt(scope.index);
			var dataset = scope.data;
			GraphService.renderMiniLineGraph(dataset[idx],element[0],idx);
			$compile(element.find('div'))(scope.$parent);
		}
	}
});

//Directive for Modal Line Graph
angular.module("vbiApp").directive("modallineGraph", function(GraphService,$compile){
	return {
		restrict : "AE",
		scope : {
			index : "=indexPassed",
			graphArray : "=graphArray"
		},
		link : function(scope,element,attr) {
			var index = scope.index;
			var graphArray = scope.graphArray;
			GraphService.renderModalLineGraph(graphArray[index],element[0]);
		}
	}
});

//Directive for Mini Area Graph
angular.module("vbiApp").directive("miniareaGraph", function(GraphService,$compile){
	return {
		restrict : "E",
		scope : {
			data : "=mySet",
			index : "=indexPassed"
		},
		link : function(scope,element,attr) {
			var idx = parseInt(scope.index);
			var dataset = scope.data;
			GraphService.renderMiniAreaGraph(dataset[idx],element[0],idx);
			$compile(element.find('div'))(scope.$parent);
		}
	}
});

//Directive for Modal Area Graph
angular.module("vbiApp").directive("modalareaGraph",function(GraphService,$compile){
	return {
		restrict : "AE",
		scope : {
			index : "=indexPassed",
			graphArray : "=graphArray"
		},
		link : function(scope,element,attr) {
			var index = scope.index;
			var graphArray = scope.graphArray;
			GraphService.renderModalAreaGraph(graphArray[index],element[0]);
		}
	}
});

//Directive for mini Pie Graph
angular.module("vbiApp").directive("minipieGraph", function(GraphService,$compile){
	return {
		restrict : "E",
		scope : {
			data : "=mySet",
			index : "=indexPassed"
		},
		link : function(scope,element,attr) {
			var idx = parseInt(scope.index);
			var dataset = scope.data;
			GraphService.renderMiniPieGraph(dataset[idx],element[0],idx);
			$compile(element.find('div'))(scope.$parent);
		}
	}
});

//Directive for Modal Pie Graph
angular.module("vbiApp").directive("modalpieGraph",function(GraphService,$compile){
	return {
		restrict : "AE",
		scope : {
			index : "=indexPassed",
			graphArray : "=graphArray"
		},
		link : function(scope,element,attr) {
			var index = scope.index;
			var graphArray = scope.graphArray;
			GraphService.renderModalPieGraph(graphArray[index],element[0]);
		}
	}
});