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
       url: "/toggle/dark",
       dataType: "text",
       chartType: "dark",
       success:function(data){
         alert("Ajax request successful");
       }
     });
   });
})();
