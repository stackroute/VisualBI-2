
function widgetHandler() {
  var arrComment = {};
  $.ajax({
    url: "includes/json/widgets.json",
    dataType: "text",
    success: function(data) {
      var json = $.parseJSON(data);
      var prevTab = "";

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
          var rowDiv = document.createElement('div');
          rowDiv.id = row;
          rowDiv.className = 'row';
          document.getElementById(tab).appendChild(rowDiv);
          prevTab = tab;
        }

        //create col
        var colDiv = document.createElement('div');
        colDiv.className = 'col-sm-' + colWidth + ' widget-border';
        colDiv.id = widgetId;
        rowDiv.appendChild(colDiv);

        //create header
        var headerDiv = document.createElement('div');
        headerDiv.id = "header";
        colDiv.appendChild(headerDiv);

        //create header title
        var headerSpan = document.createElement('span');
        headerSpan.id="headerCaption";
        headerDiv.appendChild(headerSpan);

        $(setTo + ' #headerCaption').text(title);

        //create chart
        var chartDiv = document.createElement('div');
        chartDiv.id = "barChart";
        colDiv.appendChild(chartDiv);

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

        //create comment
        // var commentDiv = document.createElement('div');
        // commentDiv.id = "comment";
        // colDiv.appendChild(commentDiv);

        //create comment text area
        // var commentText = document.createElement('textarea');
        // commentText.id="enterComments";
        // commentText.rows = 4;
        commentText.cols = 30;
        // commentText.placeholder = "Add your comments...";
        // commentDiv.appendChild(commentText);
        //
        // //add existing comments
        // $.ajax({
        //   url: commentPath,
        //   dataType: "text",
        //   async:false,
        //   success: function(dataComment) {
        //     var jsonComment = $.parseJSON(dataComment);
        //     for(j in jsonComment) {
        //       var comment = jsonComment[j].split("at");
        //       var p = "<p><strong>" + j + " :</strong> " + comment[0] + " - " + comment[1] + "</p>";
        //       $(setTo + ' #comment').append(p);
        //     }
        //   }
        // }); //end of comments ajax
      } // end of json loop
    } // end of success function
  }); // end of main ajax
} // end of function
