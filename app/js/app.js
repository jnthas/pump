"use strict";

/* Main Module */
var app = angular.module("pump", ["ngRoute", "pumpControllers", "LocalStorageModule"]);

app.value("clientId", "as8JK9sdlk2wSDqweIm");

app.run(function($rootScope, $window){
  $rootScope.doBack = function(){
    $window.history.back();
  };
});

app.config(function($routeProvider){

  $routeProvider.    
    when("/", {
      templateUrl: "partials/main.html"
    }).
    when("/student", {
      templateUrl: "partials/student.html",
      controller: "StudentController"
    }).
    when("/plans", {  //list all training plans
      templateUrl: "partials/plans.html",
      controller: "TrainingPlanListController"
    }).  
    when("/plans/new", { //add training plan 
      templateUrl: "partials/plan.html",
      controller: "TrainingPlanController"
    }).
    when("/plans/:planId", { //show training plan details 
      templateUrl: "partials/plan.html",
      controller: "TrainingPlanController"
    }).
    when("/plans/:planId/exercises", { // list all exercises of one plan
      templateUrl: "partials/exercises.html",
      controller: "ExerciseListController"      
    }).
    when("/plans/:planId/exercises/new", { // add exercise to plan 
      templateUrl: "partials/exercise.html",
      controller: "ExerciseController"      
    }).
    when("/plans/:planId/exercises/:exerciseId", { // show exercise details 
      templateUrl: "partials/exercise.html",
      controller: "ExerciseController"      
    }).
    otherwise({
      redirectTo: "/"
    });
});

