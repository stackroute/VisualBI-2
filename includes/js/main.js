(function(){

   var tabs = {
      init: function(){
         //Add dashbords tabs
         return($.getJSON("includes/json/dashboards.json",function(data) {
            var template = Handlebars.compile($('#dashbordsTemplate').html());
            var dashboards = $('#dashboards');
            dashboards.append(template(data));
            dashboards.find('li').first().addClass("active");
            //Add tab contents
            var contentTemplate = Handlebars.compile($('#dashboardsContentTemplate').html());
            var dashboardContents = $('#dashboardsContent');
            dashboardContents.append(contentTemplate(data));
            dashboardContents.find('div').first().addClass("active");
         }))
      },
      fetchLayouts: function(data) {
         //console.log(data);
         // $.each(data, function(index, item){
         //    var tabId = $('#' + item.tabID);
         //    // console.log(tabId);
         //    tabId.load(item.htmlPage +" #"+ item.containerID, function(){
         //       console.log('loaded');
         //    });
         //
         //    if(index === 0) {
         //       // make first tab as active
         //       // tabId.load(item.htmlPage, function(){
         //       //    console.log('loaded');
         //       // });
         //       tabId.addClass("active");
         //    }

            // tabId.on('click',function(){
            //    //attach click event so the content loads when tab is clicked
            //    console.log(this);
            //    //$(this).load(item.htmlPage +" #"+ item.containerID);
            //    // $('#' + item.tabID).load(item.htmlPage +" #"+ item.containerID);
            // });
         // })
      }
   }

   tabs.init();

})();
