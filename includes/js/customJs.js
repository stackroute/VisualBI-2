$(document).ready(function() {
  $.ajax({
    url: "../includes/json/widgetProp1.json",
    dataType: "text",
    success: function(data) {
      var json = $.parseJSON(data);

      var title = json[0].title;
      var barSrc = json[0].chartJson;
      var commentPath = json[0].commentPath;

      
      $('#headerCaption').text(title);
      $('#barChart #bar').attr("src", barSrc);

      $.ajax({
        url: commentPath,
        dataType: "text",
        success: function(dataComment) {
          var jsonComment = $.parseJSON(dataComment);
          for(i in jsonComment) {
            var comment = jsonComment[i].split("at");

            var p = "<p>" + i + ":" + comment[0] + " - " + comment[1] + "</p>";
            $('#comments').append(p);
          }
        }
      });
    }
  });
});
