function widgetHandler(widgetsConfig) {
  var arrComment = {};
  $.ajax({
    url: widgetsConfig.widgetsUrl,
    dataType: "text",
    success: function(data) {
      var json = $.parseJSON(data);
      var makeActiveTab = true;
      var config = {
         height: 300,
         enableLegend: false
         // colors: ['red', 'green', 'yellow', 'ping']
      };
      chartLoader.init(config)
      $(widgetsConfig.container).find('li').first().addClass('active');
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

        $("textarea").css('overflow', 'hidden').autogrow();
        $(subDiv).append('<textarea id = enterComments placeholder = "Add your comments... " style = "width:80%" ></textarea>');
        $(subDiv).append('<button type="button" class="btn btn-warning" data-toggle="modal" data-target="#commentsDialog" data-cPath="' + commentPath + '"><span class="glyphicon glyphicon-hand-up"></span>Comments....</button>');

      } // end of json loop

      $('#commentsDialog').on('show.bs.modal', function(event){
        console.log('inside show modal');
        console.log(event);
        var button = $(event.relatedTarget) // Button that triggered the modal
        var commentPath = $(event.relatedTarget).attr('data-cPath');
        var modal = $(this);
        console.log(button);
        //add existing comments
        $.getJSON(commentPath, function(c) {
           console.log(c);
           var paragraphs = "";
           for(j in c) {
            //console.log(jsonComment[j]);
             paragraphs += "<p><strong>" + j + " :</strong> " + c[j] +"</p>";
           }
           modal.find('#commentsText').html(paragraphs);
        });

      });

    } // end of success function
  }); // end of main ajax

} // end of function
