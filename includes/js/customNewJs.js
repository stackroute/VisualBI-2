$(document).ready(function() {
  var arrComment = {};
  $.ajax({
    url: "includes/json/widgetProp2.json",
    dataType: "text",
    success: function(data) {
      var json = $.parseJSON(data);

      for(i in json) {

        var title = json[i].title;
        var barSrc = json[i].chartJson;
        var commentPath = json[i].commentPath;
        var row = "#" + json[i].rowId;
        var col = "#" + json[i].colId;

        var setTo = row + " " + col;
        arrComment[setTo] = commentPath;
        $(setTo + ' #headerCaption').text(title);
        $(setTo + ' #barChart #bar').attr("src", barSrc);


        $.ajax({
          url: commentPath,
          dataType: "text",
          async:false,
          success: function(dataComment) {
            var jsonComment = $.parseJSON(dataComment);
            for(j in jsonComment) {
              var comment = jsonComment[j].split("at");
              var p = "<p><strong>" + j + " :</strong> " + comment[0] + " - " + comment[1] + "</p>";
              $(setTo + ' #comments').append(p);
            }
          }
        });
      }
    }
  });
});
