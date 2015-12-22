(function(){
  var templateCreator = {
    init: function(config){
      this.url = config.url;
      this.fetch();
      this.template=config.template;
      //console.log(config.template);
      this.comp_template = Handlebars.compile(this.template);
    },
    attachTemplate: function(obj_array){
      $('.container_fluid').append(this.comp_template(obj_array));
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
            //console.log(obj['col_'+i]);
          }
          obj_array.push(obj);

        });
        self.attachTemplate(obj_array);
      });
    }
  };
  templateCreator.init({
    template: $('#widget_template_3cols').html(),
    url: '/../includes/json/laylout_3cols.json'
  });
})();
