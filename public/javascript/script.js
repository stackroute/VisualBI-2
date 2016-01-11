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
       url: "/toggle/light",  //changes the color
       dataType: "text",
       chartToggle: "light",    //changes the color
       success:function(data){
         alert("Ajax request successful");
       }
     });
   });
})();
