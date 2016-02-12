/*
    * Copyright 2016 NIIT Ltd, Wipro Ltd.
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *    http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    *
    * Contributors:
    *
    * 1. Ashok Kumar
    * 2. Partha Mukherjee
    * 3. Nabila Rafi
    * 4. Venkatakrishnan U
    * 5. Arun Karthic R
    * 6. Hari Prasad Timmapathini
	 * 7. Yogesh Goyal
 */

//Directive for modal Bar Graph
angular.module("vbiApp").directive("modalbarGraph", ['GraphService' ,function(GraphService) {
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

}]);

//Directive for mini Bar Graph
angular.module("vbiApp").directive("minibarGraph", ['GraphService', '$compile' ,function(GraphService,$compile){
	return {
		restrict : "E",
		scope : {
			widgetUid: "@widgetUid",
			index : "=indexPassed"
			
		},
		link : function(scope,element,attr) {
			var idx = parseInt(scope.index);
			var dataset = scope.$parent.widgetData[scope.widgetUid];
			GraphService.renderMiniBarGraph(dataset[idx],element[0],idx, scope.widgetUid);
			$compile(element.find('div'))(scope.$parent);
		}
	}
}]);

//Directive for mini Line chart
angular.module("vbiApp").directive("minilineGraph", ['GraphService', '$compile' ,function(GraphService, $compile){
	return {
		restrict : "E",
		scope : {
			widgetUid: "@widgetUid",
			index : "=indexPassed"
		},
		link : function(scope,element,attr) {
			var idx = parseInt(scope.index);
			var dataset = scope.$parent.widgetData[scope.widgetUid];
			GraphService.renderMiniLineGraph(dataset[idx],element[0],idx, scope.widgetUid);
			$compile(element.find('div'))(scope.$parent);
		}
	}
}]);

//Directive for Modal Line Graph
angular.module("vbiApp").directive("modallineGraph", ['GraphService', '$compile', function(GraphService, $compile){
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
}]);

//Directive for Mini Area Graph
angular.module("vbiApp").directive("miniareaGraph", function(GraphService,$compile){
	return {
		restrict : "E",
		scope : {
			widgetUid: "@widgetUid",
			index : "=indexPassed"
		},
		link : function(scope,element,attr) {
			var idx = parseInt(scope.index);
			var dataset = scope.$parent.widgetData[scope.widgetUid];
			GraphService.renderMiniAreaGraph(dataset[idx],element[0],idx, scope.widgetUid);
			$compile(element.find('div'))(scope.$parent);
		}
	}
});

//Directive for Modal Area Graph
angular.module("vbiApp").directive("modalareaGraph",['GraphService', '$compile', function(GraphService, $compile){
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
}]);

//Directive for mini Pie Graph
angular.module("vbiApp").directive("minipieGraph", ['GraphService', '$compile', function(GraphService,$compile){
	return {
		restrict : "E",
		scope : {
			widgetUid: "@widgetUid",
			index : "=indexPassed",
		},
		link : function(scope,element,attr) {
			var idx = parseInt(scope.index);
			var dataset = scope.$parent.widgetData[scope.widgetUid];
			GraphService.renderMiniPieGraph(dataset[idx],element[0],idx, scope.widgetUid);
			$compile(element.find('div'))(scope.$parent);
		}
	}
}]);

//Directive for Modal Pie Graph
angular.module("vbiApp").directive("modalpieGraph",['GraphService', '$compile', function(GraphService,$compile){
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
}]);