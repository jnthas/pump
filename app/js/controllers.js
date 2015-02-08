"use strict";

/* Controllers */

var pumpControllers = angular.module("pumpControllers", []);


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



/* Student Controller */
pumpControllers.controller("StudentController", function($scope) {
  $scope.model = student;
  $scope.save = function(m) {
    console.log("Saving... " + $scope.model.name);
    $scope.model = m;
  };
});

/* Training Plan Controller */
pumpControllers.controller("TrainingPlanController", function($scope) {
  $scope.trainingPlans = trainingPlans;
});



