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

var app = angular.module('vbiApp');
app.factory('executeQueryService', ['$http', '$rootScope', '$compile',function($http, $rootScope, $compile) {
  return {
    render: function (containerDiv, parameters) {
     var container = angular.element(containerDiv);
//		 parameters = {
//			 	catalog: "SampleData",
//				connId: "56a217eca375b2ea99a9b11b",
//				dataSource: "Pentaho",
//				statement: "select non empty (({[Department].[Department].members} * {[Measures].[Actual]})) on columns, non empty ({[Region].[Region].members}) on rows from [Quadrant Analysis]"
//		 };
       var req = {
          method: 'POST',
          url: '/execute',
          data: parameters
        };
       return new Promise (function(resolve, reject){
         $http(req).then(function(data){
           var graphArray = renderData(container, data.data);
                  if(graphArray !== undefined){
                    resolve(graphArray);
                  }
                  else{
                    reject ("Error in rendering the table !!!");
                  }
			          });
              },
            function(err){
           reject(err);
         });
      //  });
    },
	  showPieGraphColumn: function(table_container, scope) {
		  var graphArray = scope.widgetData[table_container];
		  var tableContainer = angular.element(document.getElementById(table_container));

			 if((tableContainer.find("."+"miniPieGraph"+"").length) === 0){
				  tableContainer.find("#row0").prev().append("<td class="+"miniPieGraph"+"><span class='graphIcon'>"+"</span></td>");

				  for(var index in graphArray) {
					 if(parseInt(index) !== graphArray.length-1){
						  var dataset = graphArray;
						  tableContainer.find("#row"+index).append($compile("<td class="+"miniPieGraph"+"><minipie-graph index-passed="+index + " widget-uid=" + table_container +"></minipie-graph></td>")(scope));
					 }
				  }
				}
				else {
				  tableContainer.find("."+"miniPieGraph"+"").toggle();
				}
	  },
	  showAreaGraphColumn: function(table_container, scope) {
		  var graphArray = scope.widgetData[table_container];
		  var tableContainer = angular.element(document.getElementById(table_container));

		  if((tableContainer.find("."+"miniAreaGraph"+"").length) === 0){
				tableContainer.find("#row0").prev().append("<td class="+"miniAreaGraph"+"><span class='graphIcon'>"+"</span></td>");

				for(var index in graphArray) {
				  if(parseInt(index) !== graphArray.length-1) {
						var dataset = graphArray;
						tableContainer.find("#row"+index).append($compile("<td class="+"miniAreaGraph"+"><miniarea-graph index-passed="+index + " widget-uid=" + table_container +"></miniarea-graph></td>")(scope));
					}
			 	}
		  } else {
				tableContainer.find("."+"miniAreaGraph"+"").toggle();
		  }
	  },
	  showLineGraphColumn: function(table_container, scope) {
		  var graphArray = scope.widgetData[table_container];
		  var tableContainer = angular.element(document.getElementById(table_container));

		  if((tableContainer.find("."+"miniLineGraph"+"").length) === 0){
				tableContainer.find("#row0").prev().append("<td class="+"miniLineGraph"+"><span class='graphIcon'>"+"</span></td>");

				for(var index in graphArray) {
				  if(parseInt(index) !== graphArray.length-1) {
						tableContainer.find("#row"+index).append($compile("<td class="+"miniLineGraph"+"><miniline-graph index-passed="+ index + " widget-uid=" + table_container +"></miniline-graph></td>")(scope));
					}
			 	}
			 }
			 else {
				tableContainer.find("."+"miniLineGraph"+"").toggle();
			 }
	  },
	  showBarGraphColumn: function(table_container, scope) {
		  var graphArray = scope.widgetData[table_container];
		  var tableContainer = angular.element(document.getElementById(table_container));
		  if((tableContainer.find("."+"miniBarGraph"+"").length) === 0){
				tableContainer.find("#row0").prev().append("<td class="+"miniBarGraph"+"><span class='graphIcon'>"+"</span></td>");

				for(var index in graphArray) {
				  if(parseInt(index) !== graphArray.length-1) {
					  tableContainer.find("#row"+index).append($compile("<td class="+"miniBarGraph"+"><minibar-graph index-passed="+index+ " widget-uid=" + table_container +"></minibar-graph></td>")(scope));
					}
			 	}
			 }
			 else {
				tableContainer.find("."+"miniBarGraph"+"").toggle();
			 }
	  }
  };
}]);
var renderData =  function (container, data){
  // $('div.section_result').replaceWith('');
  container.children().replaceWith('');
  container.append('<div class="section_result">'+
    '<table id="dataTable">'+
      '<tbody id="dataTableBody">'+
        '<script id="axis0_insersion">'+
        '</script>'+
        '<script id="axis1_insersion">'+
        '</script>'+
      '</tbody>'+
    '</table>'+
  '</div>');
  container.find('#axis0_insersion').append('{{axis0}}');
  container.find('#axis1_insersion').append('{{axis1}}');
  // $( container+" tr" ).replaceWith( "" );

  var addElement, ans, fs, members, tdChild;
  var axes = data.Axes,
      axis = axes.Axis,
      axis0 = axis[0],
      axis1 = axis[1],
      axis0Child = {},
      axis1Child = {};
  /************* Function for graphKey *****************/
  var axis0Names = [];
  for (var index0 in axis0){
     var axis0Member = axis0[index0].Member;
     var axis0Name = '';
     for(var memIndex0 in axis0Member){
       axis0Name = axis0Name+axis0Member[memIndex0].Caption+".";
     }
     axis0Name = axis0Name.substring(0,axis0Name.length-1);
     axis0Names.push(axis0Name);
   }
   /************* Headings for Graph Modal *****************/
   var axis1Names = [];
   for (var index1 in axis1){
      var axis1Member = axis1[index1].Member;
      var axis1Name = '';
      for(var memIndex1 in axis1Member){
        axis1Name = axis1Name+axis1Member[memIndex1].Caption+".";
      }
      axis1Name = axis1Name.substring(0,axis1Name.length-1);
      axis1Names.push(axis1Name);
    }
  /***************** Generating tree structure ****************/
  addElement = function(members, tree, level) {
    var child;
    if (members[0] != null) {
      child = members[0];
      if (!tree[child.Caption]) {
        tree[child.Caption] = {
          count: 0,
          children: {}
        };
      }
      tree[child.Caption].count += 1;
      tree[child.Caption].level = child.index;
      addElement(members.slice(1), tree[child.Caption].children, child.index + 1);
    }
    return tree;
  };
  /***************** Graph Arrays *************/
  var graphKey = [];
  /***************** Axis0 Hierarchical Structure **********/

  axis0Child = axis0.reduce((function(acc, member) {
    return addElement(member.Member, acc, 1);
  }), {});

  /************* Function for rendering axis0 *****************/
  tdAxis0Child = function(element) {
    var a, ele, name,
        frag0 = "<tr>";
    for(var axis1MemberIndex=0, axis1MemberLen = axis1[0].Member.length; axis1MemberIndex < axis1MemberLen; axis1MemberIndex++){
      frag0 += '<th></th>';
    }
    a = (function() {
      var results, elementArray, prevElementArray;
          results = [];
          elementArray = [];
          prevElementArray = [];
          elementArray.push(element);
      while(elementArray.length !== 0){
        results.push(frag0);
        for(var index in elementArray){
          element = elementArray[index];
          prevElementArray[index] = elementArray[index];
          for (name in element) {
            ele = element[name];
            results.push(("<td colspan='" + ele.count + "' class='level" + ele.level + "'>" + name + "</td>"));
          }
        }
        results.push("</tr>");
        elementArray = [];
        for(index in prevElementArray){
          element = prevElementArray[index];
          for (name in element) {
            ele = element[name];
            if(Object.keys(ele.children).length !== 0){
              elementArray.push(ele.children);
            }
          }
        }
      }
      return results;
    })();
    return (a.reduce((function(acc, line) {
      return acc + line;
    }), ""));
  };
  var template0 = $.trim(container.find("#axis0_insersion").html()),
      frag0 = template0.replace(/{{axis0}}/ig,tdAxis0Child(axis0Child));
  container.find('#dataTableBody').append(frag0);  // #dataTableBody

  /****************************** Data **********************************/
  var cellData = data.CellData,
      cells = cellData.Cell,
      val = [];
  for (var cellIndex in cells) {
    val[cells[cellIndex].CellOrdinal] = cells[cellIndex].FmtValue;
  }
  var count  = 0,
      dataArray = [],
      graphData = [];
  for (var j = 0, len1 = axis1.length; j < len1; j++) {
    td='';
    var tempDataObj = {};
    var graphInnerArray = [];
    for (var i = 0, len = axis0.length; i < len; i++) {
      var graphObj = {};
      if(val[count] !== undefined && val[count] !== null)
      {
        graphObj.key = axis0Names[i];
        graphObj.value = parseFloat(val[count].replace(/,/g,''));
        graphInnerArray.push(graphObj);
      }
      if(val[count] === undefined){
        val[count] = "";
      }
      td += "<td>"+val[count]+"</td>";
      count++;
    }
    graphData.push(graphInnerArray);
    tempDataObj.td = td;
    dataArray.push(tempDataObj);
  }
  graphData.push(axis1Names);
  /****************************** Axis1 Hierarchical Structure **********************************/
  axis1Child = axis1.reduce((function(acc, member) {
    return addElement(member.Member, acc, 1);
  }), {});
  var elementIndex = 0;
  /************* Function for rendering axis1 *****************/
  var rowId = 0;
  tdAxis1Child = function(element) {
    var a, ele, name;
    if (Object.keys(element).length === 0) {
      return "</tr>";
    }
    else {
      a = (function() {
        var results = [];
        for (name in element) {
          ele = element[name];
          if(Object.keys(ele.children).length === 0){
            results.push(("<tr id='row"+rowId+"' class='dataRow'><td rowspan='" + ele.count + "' class='level" + ele.level + "'>" + name + "</td>")+dataArray[elementIndex].td);
            elementIndex += 1;
            rowId += 1;
          }
          else{
            results.push(("<tr id='row"+rowId+"' class='dataRow'><td rowspan='" + ele.count + "' class='level" + ele.level + "'>" + name + "</td>") + tdAxis1Child(ele.children));
          }
        }
        return results;
      })();
      return (a.reduce((function(acc, line) {
        return acc + line;
      }), "")).slice(4);
    }
  };
  var template1 = $.trim(container.find("#axis1_insersion").html());
  var frag1 = template1.replace(/{{axis1}}/ig,"<tr id='row0' class='dataRow'>"+tdAxis1Child(axis1Child));
  container.find('#dataTableBody').append(frag1);
  return graphData;
	}; // end renderData
