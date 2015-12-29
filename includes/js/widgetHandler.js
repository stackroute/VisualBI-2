function widgetHandler() {
  var arrComment = {};
  $.ajax({
    url: "includes/json/widgets.json",
    dataType: "text",
    success: function(data) {
      var json = $.parseJSON(data);

      for(i in json) {

        var title = json[i].title;
        var commentPath = json[i].commentPath;
        var tab = json[i].tabId;
        var row = json[i].rowId;
        var colWidth = json[i].colWidth;
        var widgetId = json[i].widgetId;
        var chartRenderer = json[i].chartRenderer;

        var setTo = "#" + widgetId;
        arrComment[widgetId] = commentPath;

        if($("#" + tab).find("#" + row).length == 0) {
          //create row
          $("#" + tab).append('<div id = ' + row + ' class = row></div>');
        }

        //create col
        $("#" + tab + ' #' + row).append('<div class = col-lg-' + colWidth + ' id = ' + widgetId + '></div>');

        $(setTo).append('<div class = widget-border></div>');

        var subDiv = $('#' + widgetId + " .widget-border");

        //create header
        $(subDiv).append('<div id = header><span id = headerCaption></span></div>').text(title);

        //create chart
        $(subDiv).append('<div id = barChart></div>');

        var screenWidth = $(".container").width();
        var widgetWidth = $(setTo).width();

        if(widgetWidth > 100) {
          var width = $(setTo).width();
          var parentWidth = $(setTo).offsetParent().width();
          widgetWidth = (width * 100)/parentWidth;
        }

        var newWidth = (screenWidth * widgetWidth)/100;

        var chartFunction = chartRenderer + '("' + setTo + '", ' + newWidth + ')';
        eval(chartFunction);

        $(subDiv).append('<hr class = hr-prop>');

        // create comment
        $(subDiv).append('<div id = comment class = col-lg-12></div>');

        //add existing comments
        $.ajax({
          url: commentPath,
          dataType: "text",
          async:false,
          success: function(dataComment) {
            var jsonComment = $.parseJSON(dataComment);
            for(j in jsonComment) {
              var comment = jsonComment[j].split("at");
              var p = "<p><strong>" + j + " :</strong> " + comment[0] + " - " + comment[1] + "</p>";
              $(setTo + ' #comment').append(p);
            }
          }
        }); //end of comments ajax

        //create comment text area
        $(setTo + ' #comment').append('<textarea id = enterComments placeholder = "Add your comments... " style = "width:80%" ></textarea>');
        $("textarea").css('overflow', 'hidden').autogrow();
      } // end of json loop
    } // end of success function
  }); // end of main ajax
} // end of function
