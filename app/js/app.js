$(function(){

  var Aluno = Backbone.Model.extend({
    nome: "",
    nascimento: 0,
    peso: 0,
    altura: 0,
    sexo: "m"
  });
  
  var AlunoView = Backbone.View.extend({
    el: $("#hello"),
    template: _.template($('#hello-template').html()),
    
    render: function() {
      this.$el.html(this.template({text: "Hello World!"}));
      return this;
    },
  
  });
  
  var AppView = Backbone.View.extend({
    tagName: "body",
    render: function() {
      var h = new AlunoView();
    }
  });

  var App = new AppView();


});