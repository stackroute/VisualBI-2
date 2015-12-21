(function(){

   $.getJSON("http://localhost:8080/includes/json/dashboards.json",function(data){

      var template = Handlebars.compile($('#dashbordsTemplate').html());
      // console.log(template(data));
      var dashboards = $('#dashboards');
      dashboards.append(template(data));
      dashboards.find('li').first().addClass("active");
      // li[0].addClass("active");
   });

})();
