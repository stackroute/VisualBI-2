function plotContinentChart (chartContainer, newWidth){
   
   var margin = {top: 20, right: 20, bottom: 100, left: 80},
       width = newWidth - margin.left - margin.right,
       height = 500 - margin.top - margin.bottom;


   var x = d3.scale.ordinal()
       .rangeRoundBands([0, width], .1);

   var y = d3.scale.linear()
       .rangeRound([height, 0]);

   var color = d3.scale.ordinal()
       .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

   var xAxis = d3.svg.axis()
       .scale(x)
       .orient("bottom");

   var yAxis = d3.svg.axis()
       .scale(y)
       .orient("left")
       .tickFormat(d3.format("1s"));

   var svg1 = d3.select(chartContainer + " #barChart").append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
     .append("g")
       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   d3.json("includes/json/gdpContinent.json", function(error, data) {
     if (error) throw error;

     color.domain(d3.keys(data[0]).filter(function(key) { return key !== "year"; }));

     data.forEach(function(d) {
       var y0 = 0;
       d.values = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
       d.total = d.values[d.values.length - 1].y1;
     });

   //  data.sort(function(a, b) { return b.total - a.total; });

     x.domain(data.map(function(d) { return d.year; }));
     y.domain([0, d3.max(data, function(d) { return d.total; })]);

     svg1.append("g")
         .attr("class", "x axis")
         .attr("transform", "translate(0," + height + ")")
         .call(xAxis)
           .selectAll("text")
           .style("text-anchor", "end")
           .attr("dx", "-.8em")
           .attr("dy", "-.50em")
           .attr("transform", "rotate(-90)");

     svg1.append("g")
         .attr("class", "y axis")
         .call(yAxis)
       .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 4)
         .attr("dy", ".71em")
         .style("text-anchor", "end")
         .text("GDP per capita (constant 2005 US$)");

     var year = svg1.selectAll(".year")
         .data(data)
       .enter().append("g")
         .attr("class", "g")
         .attr("transform", function(d) { return "translate(" + x(d.year) + ",0)"; });

     year.selectAll("rect")
         .data(function(d) { return d.values; })
       .enter().append("rect")
         .attr("width", x.rangeBand())
         .attr("y", function(d) { return y(d.y1); })
         .attr("height", function(d) { return y(d.y0) - y(d.y1); })
         .style("fill", function(d) { return color(d.name); });

     var legend = svg1.selectAll(".legend")
         .data(color.domain().slice().reverse())
       .enter().append("g")
         .attr("class", "legend")
         .attr("transform", function(d, i) { return "translate(-1200," + i * 20 + ")"; });

     legend.append("rect")
         .attr("x", width - 18)
         .attr("width", 18)
         .attr("height", 18)
         .style("fill", color);

     legend.append("text")
         .attr("x", width - 24)
         .attr("y", 9)
         .attr("dy", ".35em")
         .style("text-anchor", "end")
         .text(function(d) { return d; });

     });

   //   return svg;
}
