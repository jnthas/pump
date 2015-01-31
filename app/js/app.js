(function(){

  var app = angular.module("pump", []);


  app.controller("StudentController", function() {

    this.model = student;

    this.save = function(m) {
      console.log("Saving... " + this.model.name);
      this.model = m;
    };

  });





  var student = {
    name: "Jonathas Amaral",
    born: "02/05/1985",
    weight: 65,
    height: 174
  };



})();