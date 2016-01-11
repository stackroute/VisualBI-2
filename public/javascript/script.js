(function(){
   var config = {
      userDashboard: "dashboards",
      container: "#dashboards"
   };
   widgetHandler(config);

   $('.theme a').click(function() {
     var id = $(this).attr("id");
     $('body').removeClass();
     $('body').addClass(id);
   });
})();
