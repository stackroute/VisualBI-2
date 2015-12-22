$(document).ready(function() {

  $.ajax({
    url: "../includes/json/widgetProp1.json",
    dataType: "text",
    success: function(data) {
      var json = $.parseJSON(data);

      var title = json[param].title;
      var barSrc = json[param].chartJson;
      var commentPath = json[param].commentPath;

      $('#headerCaption').text(title);
      $('#barChart #bar').attr("src", barSrc);

      $.ajax({
        url: commentPath,
        dataType: "text",
        success: function(dataComment) {
          var jsonComment = $.parseJSON(dataComment);
          for(i in jsonComment) {
            var comment = jsonComment[i].split("at");

            var p = "<p><strong>" + i + " :</strong> " + comment[0] + " - " + comment[1] + "</p>";
            $('#comments').append(p);
          }
        }
      });
    }
  });
});
