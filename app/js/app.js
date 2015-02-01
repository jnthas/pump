(function(){

  var app = angular.module("pump", []);


  app.controller("StudentController", function() {

    this.model = student;

    this.save = function(m) {
      console.log("Saving... " + this.model.name);
      this.model = m;
    };

  });



  app.controller("TrainingPlanController", function() {

    this.trainingPlans = trainingPlans;
  });




  var student = {
    name: "Jonathas Amaral",
    born: "02/05/1985",
    weight: 65,
    height: 174
  };

  var trainingPlans = [{
    name: "Ficha 1",
    startDate: "20150101",
    endDate: "20150201",
    description: "Observacao da ficha 1"
  },
  {
    name: "Ficha 2",
    startDate: "20150201",
    endDate: "20150301",
    description: "Observacao da ficha 2"
  },
  {
    name: "Ficha 3",
    startDate: "20150131",
    endDate: "20150331",
    description: "Observacao da ficha 3"
  }
  ];



})();