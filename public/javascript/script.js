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

     $.ajax({
       url: "/toggle/" + id,  //changes the theme id
       dataType: "text",
       success:function(data){
       }
     });
   });
})();
