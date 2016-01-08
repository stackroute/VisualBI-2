function widgetHandler(widgetsConfig) {

  var arrComment = {};
  $.ajax({
    url: widgetsConfig.userDashboard,
    dataType: "text",
    success: function(data) {
      var json = $.parseJSON(data);
      // var makeActiveTab = true;
      var config = {
         height: 300,
         enableLegend: false,
         //colors: ['red', 'green', 'yellow', 'pink']
      };
      chartLoader.init(config)
      $(widgetsConfig.container).find('li').first().addClass('active');
      $('#dashboardsContent').find('div').first().addClass('active');

      $.getJSON('chartData/widgets', function(widgets) {
         //loop through users tabs
         // var dashboard = json[0];
         for(i in json) {
            tb = json[i];
            var tab = tb.tabId;
            var colId = "";
            var index = 1;
            tb.rows.forEach(function(r) {

               var widgetId = r.widgetId;
               var row = r.rowId;
               colId = tab + row + "col" + index++;
               var colWidth = r.colWidth;
               var details = getWidgetDetail(widgets, widgetId);
               var chartRenderer = details.chartRenderer;
               var dataUrl = details.url;
               var title = details.title;
               var commentPath = details.comments;
               var widgetContainer = "#" + colId;
               arrComment[colId] = details.comments;

               if($("#" + tab).find("#" + row).length == 0) {
               //  if(makeActiveTab) {
               //     $("#" + tab).addClass('active');
               //     makeActiveTab = false;
               //  }
                 //create row
                 $("#" + tab).append('<div id = ' + row + ' class = row></div>');
               }

               //create col
               $("#" + tab + ' #' + row).append('<div class = col-lg-' + colWidth + ' id = ' + colId + '></div>');

               $(widgetContainer).append('<div class = "panel panel-primary"></div>');

               var subDiv = $('#' + colId + " .panel");

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
            })
         }

      });

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

function getWidgetDetail(widgets, widgetId) {
   var details = {};
   widgets.forEach(function(w) {
      if(w.widgetId === widgetId) {
         details.title = w.title;
         details.chartRenderer = w.chartRenderer;
         details.url = w.url;
         details.comments = w.comments;
      }
   })
   return details;
}
