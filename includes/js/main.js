(function(){

   var tabs = {
      init: function(){
         //Add dashbords tabs
         return($.getJSON("../includes/json/dashboards.json",function(data) {
            var template = Handlebars.compile($('#dashbordsTemplate').html());
            var dashboards = $('#dashboards');
            dashboards.append(template(data));
            dashboards.find('li').first().addClass("active");
            //Add tab contents
            // var contentTemplate = Handlebars.compile($('#dashboardsContentTemplate').html());
            // $('#dashboardsContent').append(contentTemplate(data));
         }))
      },
      fetchLayouts: function(data) {
         //console.log(data);
         $.each(data, function(index, item){
            var tabId = $('#' + item.tabID);
            // console.log(tabId);
            tabId.load(item.htmlPage +" #"+ item.containerID, function(){
               console.log('loaded');
            });

            if(index === 0) {
               // make first tab as active
               // tabId.load(item.htmlPage, function(){
               //    console.log('loaded');
               // });
               tabId.addClass("active");
            }

            // tabId.on('click',function(){
            //    //attach click event so the content loads when tab is clicked
            //    console.log(this);
            //    //$(this).load(item.htmlPage +" #"+ item.containerID);
            //    // $('#' + item.tabID).load(item.htmlPage +" #"+ item.containerID);
            // });
         })
      }
   },

   chartLoader = {
      plotGraphs: function(){
         var arrComment = {};
         $.ajax({
           url: "includes/json/widgetProp2.json",
           dataType: "text",
           success: function(data) {
             var json = $.parseJSON(data);

             for(i in json) {

               var title = json[i].title;
               var barSrc = json[i].chartJson;
               var d3Function = json[i].d3Function;
               console.log(d3Function);
               var commentPath = json[i].commentPath;
               var tab ="#" + json[i].tabId;
               var row = "#" + json[i].rowId;
               var col = "#" + json[i].colId;
               var widgetId = "#" + json[i].widgetId;

               var setTo = tab + " " + row + " " + col;
               arrComment[widgetId] = commentPath;
               $(widgetId + ' #headerCaption').text(title);

               //console.log(barSrc);
               //console.log($(widgetId).width());
               //console.log("window " + $(window).width());
               //console.log("document " + $(document).width());
            //   console.log("client width " + document.getElementById(widgetId).clientWidth);


               var x = d3Function + '("' + widgetId + '")';
               eval(x);
               //gdpStackedBarChart("#row1 #col2 #barChart");
               // $(setTo + ' #barChart').html()


               $.ajax({
                 url: commentPath,
                 dataType: "text",
                 async:false,
                 success: function(dataComment) {
                   var jsonComment = $.parseJSON(dataComment);
                   for(j in jsonComment) {
                     var comment = jsonComment[j].split("at");
                     var p = "<p><strong>" + j + " :</strong> " + comment[0] + " - " + comment[1] + "</p>";
                     $(widgetId + ' #comments').append(p);
                   }
                 }
               });
             }
           }
         });
      }

   };

   tabs.init().done(function(){
      chartLoader.plotGraphs();
   });

})();
