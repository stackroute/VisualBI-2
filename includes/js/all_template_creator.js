(function(){
  var templateCreator = {
    init: function(config){
      this.url = config.url;
      this.fetch();
      this.template=config.template;
      this.comp_template = Handlebars.compile(this.template);
    },
    attachTemplate: function(obj_array){
        $('#dashboards').append(this.comp_template(obj_array));
        console.log(this.comp_template(obj_array));
        $('#widget_template_1cols').load( "gdpContinentChart.html #continentChart" );

    },
    fetch: function(){
      var self = this,obj_array=[];

      $.getJSON(this.url,function(data){
        $.map(data,function(final_data){
            var obj={};
            obj['template']=final_data.template;
            obj['background'] = final_data.background;
          for(var i in final_data.columns){
            obj['col_'+i]='col-sm-'+final_data.columns[i];
            obj['widget_'+i]=final_data.widget[i];
          }
          obj_array.push(obj);

        });
        self.attachTemplate(obj_array);
      });
    }
  };
  templateCreator.init({
    template: $('#widget_template_1cols').html(),
    url: '/../includes/json/laylout_1cols.json'
  });
})();
