"use strict";

/* Controllers */
var pumpControllers = angular.module("pumpControllers", []);

/* Student Controller */
pumpControllers.controller("StudentController", function($scope, dataService) {
  
  dataService.getStudent().then(function(std) {
    $scope.student = std;  
  }).catch(function(msg){
    alert(msg);
  });
    
  $scope.save = function(obj) {
    dataService.saveStudent(obj).then(function(){
      alert("Dados salvos com sucesso!");
    }).catch(function(msg) {
      alert(msg);
    });
  };
});


/* Training Plan Controller */
pumpControllers.controller("TrainingPlanListController", function($scope, dataService) {  
  dataService.getAllPlans().then(function(p){
    $scope.plans = p;   
  }).catch(function(msg){
    alert(msg);
  });
});


pumpControllers.controller("TrainingPlanController", function($scope, $routeParams, dataService){
    
  if ($routeParams.planId) {
    dataService.findById(parseInt($routeParams.planId)).then(function(p){
      $scope.plan = p;    
    });
  } else {
    $scope.plan = new TrainingPlan();   
  }
    
  $scope.save = function(obj) {
    dataService.savePlan(obj).then(function() {
      alert("Dados salvos com sucesso!");
    }).catch(function(msg) {
      alert(msg);
    });
  };
});



/* Exercise Controller */
pumpControllers.controller("ExerciseListController", function($scope, $routeParams, dataService) {
  if (!$routeParams.planId) {
    throw "Plano de treino não especificado!"
  }
  
  
  dataService.findById(parseInt($routeParams.planId)).then(function(p){
    $scope.plan = p;    
  }).catch(function(msg){
    alert(msg);
  });
  
  dataService.getAllExercises(parseInt($routeParams.planId)).then(function(p){    
    $scope.exercises = p;    
  }).catch(function(msg){
    alert(msg);
  });  
});


pumpControllers.controller("ExerciseController", function($scope, $routeParams, dataService){    
  if (!$routeParams.planId) {
    throw "Plano de treino não foi especificado!"
  }
  
  $scope.planId = $routeParams.planId;
  
  if ($routeParams.exerciseId) {
    dataService.findExerciseById($routeParams.planId, parseInt($routeParams.exerciseId)).then(function(e){
      $scope.exercise = e;    
    }).catch(function(msg){
      alert(msg);
    });
  } else {
    $scope.exercise = new Exercise();       
  }

  $scope.save = function(obj) {
    dataService.saveExercise($routeParams.planId, obj).then(function(){
      alert("Dados salvos com sucesso!");
    }).catch(function(msg) {
      alert(msg);
    });
  };
});
