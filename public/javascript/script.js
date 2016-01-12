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
       url: "/toggle/" + id,  //changes the color
       dataType: "text",
       userTheme: id,
       success:function(data){
       }
     });
   });
})();
