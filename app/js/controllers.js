"use strict";

/* Controllers */
var pumpControllers = angular.module("pumpControllers", []);

/* Student Controller */
pumpControllers.controller("StudentController", function($scope, dataService) {
  
  $scope.student = dataService.getLastTrainingPlan().student;
  $scope.save = function(obj) {
    dataService.save(obj);
  };
});


/* Training Plan Controller */
pumpControllers.controller("TrainingPlanController", function($scope, $routeParams, dataService) {    
  
  $scope.plans = dataService.getAll();  
  if ($routeParams.planId) {
    $scope.plan = dataService.findById(parseInt($routeParams.planId));    
  }
  $scope.save = function(obj) {
    dataService.save(obj);
  };
});

/* Exercise Controller */
pumpControllers.controller("ExerciseController", function($scope, $routeParams, dataService) {
  
  if ($routeParams.planId) {
    var plan = dataService.findById(parseInt($routeParams.planId));
    $scope.plan = plan;
    $scope.exercises = plan.exercises;
    
    if ($routeParams.exerciseId) {
      $scope.exercise = dataService.findExerciseById(plan, parseInt($routeParams.exerciseId));  
    }  
  }  
  
  $scope.save = function(obj) {
    dataService.save(obj);
  };
});





