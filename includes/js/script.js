(function(){

   var tabs = {
      init: function(){
         //Add dashbords tabs
         return($.getJSON("includes/json/dashboards.json",function(data) {
            var template = Handlebars.compile($('#dashbordsTemplate').html());
            var dashboards = $('#dashboards');
            dashboards.append(template(data));
            dashboards.find('li').first().addClass("active");
            var dashboardContents = $('#dashboardsContent');
            dashboardContents.find('div').first().addClass("active");
         }))
      }
   }

   tabs.init().done(function() {
     widgetHandler();
   });
})();
