"use strict";


/* Main Module */

var app = angular.module("pump", ["ngRoute", "pumpControllers"]);

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
      controller: "TrainingPlanController"
    }).  
    when("/plans/:planId", {
      templateUrl: "partials/plan.html",
      controller: "TrainingPlanController"
    }).
    otherwise({
      redirectTo: "/"
    });
});

