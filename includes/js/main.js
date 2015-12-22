(function(){

   $.getJSON("http://localhost:7080/includes/json/dashboards.json",function(data){
      console.log(data);
      var template = Handlebars.compile($('#dashbordsTemplate').html());

      var dashboards = $('#dashboards');
      dashboards.append(template(data));
      dashboards.find('li').first().addClass("active");


      var contentTemplate = Handlebars.compile($('#dashboardsContentTemplate').html());
      // console.log(contentTemplate(data));
      $('#dashboardsContent').append(contentTemplate(data));

      $.each(data, function(index, item){
         var tabId = $('#' + item.tabID);
         console.log(tabId);
         tabId.load(item.htmlPage +" #"+ item.containerID, function(){
            console.log('loaded');
         });

         if(index === 0) {
            // make first tab as active

            tabId.addClass("active");
         }

<<<<<<< HEAD
=======
         // tabId.on('click',function(){
         //    //attach click event so the content loads when tab is clicked
         //    console.log(this);
         //    //$(this).load(item.htmlPage +" #"+ item.containerID);
         //    // $('#' + item.tabID).load(item.htmlPage +" #"+ item.containerID);
         // });
>>>>>>> 0ae86fd822b60c31703602b30642cf84253abe49
      })
   });

})();
