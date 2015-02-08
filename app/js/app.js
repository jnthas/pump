"use strict";


/* Main Module */

var app = angular.module("pump", ["ngRoute", "pumpControllers"]);

app.config(function($routeProvider){

  $routeProvider.    
    when("/", {
      templateUrl: "partials/main.html"
    }).
    when("/student", {
      templateUrl: "partials/student.html",
      controller: "StudentController"
    }).
    when("/training-plan", {
      templateUrl: "partials/training-plans.html",
      controller: "TrainingPlanController"
    }).
    when("/training-plan/:planId", {
      templateUrl: "partials/training-plan.html",
      controller: "TrainingPlanController"
    }).
    otherwise({
      redirectTo: "/"
    });
});

