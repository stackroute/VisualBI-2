function widgetHandler(config) {
  var arrComment = {};
  $.ajax({
    url: config.widgetsUrl,
    dataType: "text",
    success: function(data) {
      var json = $.parseJSON(data);
      var makeActiveTab = true;
      var config = {
         height: 300,
         // colors: ['red', 'green', 'yellow', 'ping']
      };
      chartLoader.init(config)
      $(config.container).find('li').first().addClass('active');
      for(i in json) {

        var title = json[i].title;
        var commentPath = json[i].commentPath;
        var tab = json[i].tabId;
        var row = json[i].rowId;
        var colWidth = json[i].colWidth;
        var widgetId = json[i].widgetId;
        var chartRenderer = json[i].chartRenderer;
        var dataUrl = json[i].dataPath;
        var widgetContainer = "#" + widgetId;
        arrComment[widgetId] = commentPath;

        if($("#" + tab).find("#" + row).length == 0) {
         if(makeActiveTab) {
            $("#" + tab).addClass('active');
            makeActiveTab = false;
         }
          //create row
          $("#" + tab).append('<div id = ' + row + ' class = row></div>');
        }

        //create col
        $("#" + tab + ' #' + row).append('<div class = col-lg-' + colWidth + ' id = ' + widgetId + '></div>');

        $(widgetContainer).append('<div class = "panel panel-primary"></div>');

        var subDiv = $('#' + widgetId + " .panel");

        //create header
        $(subDiv).append('<div class = panel-heading id = header><span class = panel-heading id = headerCaption> ' + title + '</span></div>');

        //create chart
        $(subDiv).append('<div id = barChart></div>');

        var screenWidth = $(".container").width();
        var widgetWidth = $(widgetContainer).width();

        if(widgetWidth > 100) {
          var width = $(widgetContainer).width();
          var parentWidth = $(widgetContainer).offsetParent().width();
          widgetWidth = (width * 100)/parentWidth;
        }

        var containerWidth = (screenWidth * widgetWidth)/100;
        var chartFunction = "chartLoader" + "." + chartRenderer + '("' + widgetContainer + '", ' + containerWidth + ', "' + dataUrl + '")';

      //   console.log(chartFunction);
        eval(chartFunction);

        $(subDiv).append('<hr class = hr-prop>');

        // create comment
        $(subDiv).append('<div id = comment class = col-lg-12></div>');

      $(widgetContainer).append('<div class= "modal" id =myModal><div class="modal-dialog"><div class="modal-content"><div class="modal-header" ><button class="close" data-dismiss="modal">X</button> <h4 class="modal-title">Users Comments</h4></div><div class=modal-body></div></div></div></div>');

      //add existing comments
        $.ajax({
          url: commentPath,
          dataType: "text",
          async:true,
          success: function(dataComment) {
            var jsonComment = $.parseJSON(dataComment);
            // console.log(jsonComment);
            for(j in jsonComment) {
             //console.log(jsonComment[j]);
              //var comment = jsonComment[j].split("at");
              var paragraph = "<p><strong>" + j + " :</strong> " + jsonComment[j] +"</p>";
              //console.log(paragraph);
              $(".modal-body").append(paragraph);

            }

          }

        }); //end of comments ajax

        //create comment text area


        $("textarea").css('overflow', 'hidden').autogrow();
        $(subDiv).append('<textarea id = enterComments placeholder = "Add your comments... " style = "width:80%" ></textarea>');
        $(subDiv).append('<a href="#myModal" role = "dialog" class = "btn btn-warning" data-toggle="modal"><span class="glyphicon glyphicon-hand-up"></span>Comments....</a>');

      } // end of json loop
    } // end of success function
  }); // end of main ajax




} // end of function
