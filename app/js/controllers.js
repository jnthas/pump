"use strict";

/* Controllers */

var pumpControllers = angular.module("pumpControllers", []);

/* Student Controller */
pumpControllers.controller("StudentController", function($scope) {  
  $scope.student = student;
  $scope.save = function(m) {
    console.log("Saving... " + m.name);
    $scope.student = m;
  };
});

/* Training Plan Controller */
pumpControllers.controller("TrainingPlanController", function($scope, $routeParams) {    
  $scope.plans = trainingPlans;    
  
  $scope.plan = trainingPlans.filter(function(p) {
    return p.id === $routeParams.planId;
  })[0];    
  
  $scope.save = function(obj) {
    console.log("Saving... " + obj.description);
    $scope.plans = m;
  }
  
});


var student = {
    name: "Jonathas Amaral",
    born: "02/05/1985",
    weight: 65,
    height: 174
};
  

var trainingPlans = [{
    id: "1",
    description: "Ficha 1",
    startDate: "20150101",
    endDate: "20150201",
    reason: "Observacao da ficha 1"
  },
  {
    id: "2",
    description: "Ficha 2",
    startDate: "20150201",
    endDate: "20150301",
    reason: "Observacao da ficha 2"
  },
  {
    id: "3",
    description: "Ficha 3",
    startDate: "20150131",
    endDate: "20150331",
    reason: "Observacao da ficha 3"
  }
  ];



