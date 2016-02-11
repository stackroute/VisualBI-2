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
angular.module('vbiApp')
    .directive('chartPanel', ['chartRenderer', function(chartRenderer){
	  return {
		  
		  templateUrl: 'views/directiveTemplates/chart.html',
		  replace: true,
		  transclude: true,
		  scope: {
			  parameters: "@",
			  chartRendererMethod : "@",
			  columnWidth: "@",
			  chartId: "@",
			  widgetId: "@",
			  widgetData: "="
		  },
		  
		  link: function(scope, elements, attrs) {
//			  console.log(elements[0].childNodes[1]);
			  var params;
			  if(scope.parameters) {
				  params = JSON.parse(scope.parameters);
				  params.id = scope.chartId;
				  //Fixing bootstrap 1% = 8.33333333 as mentioned in css, so calculating the width accordingly
				  //code to be revisited if get the actual width at runtime.
				  if(scope.columnWidth)
				  		params.width = (8.33333333 * parseInt(scope.columnWidth) * (elements[0].clientWidth))/100
					else
						params.width = elements[0].clientWidth;
			  }
			  chartRenderer.plotChart(scope.chartRendererMethod, elements[0], params)
				  .then(function(data) {
				  		//sync data with controller scope. this data will help to make other behaviours
				  		if(scope.widgetData)
				  			scope.widgetData[scope.chartId] = data;
				  		
			  });
		  }
	  };
}]);