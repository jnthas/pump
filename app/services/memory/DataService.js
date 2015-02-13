"use strict";

//TODO implementar os metodos desse serviço retornando um Promise

angular.module("pump").factory("dataService", function() {
  
  this.getAll = function() {
    return trainingPlans;
  }
  
  this.getLastTrainingPlan = function() {
    return this.findById(this.getLastId(trainingPlans));
  }
      
  this.findByIdReturningIndex = function(id, arr) {
    console.log("findById: " + id) ;
    for(var i=0; i<arr.length; i++) {
      if (arr[i].id == parseInt(id)) {
        return i;
      }
    }
    throw "Registro não encontrado!";
  }
  
  this.findById = function(id) {
    try {
      return trainingPlans[this.findByIdReturningIndex(id, trainingPlans)];
    } catch(ex) {    
      throw "Plano de exercícios não encontrado!";
    }
  }
   
  this.findExerciseById = function(plan, id) {
    try {
      return plan.exercises[this.findByIdReturningIndex(id, plan.exercises)];
    } catch(ex) {    
      throw "Exercício não encontrado!";
    }
  }
    
  this.save = function(plan) {
    console.log("save:"); console.log(plan);
    if (plan.id) { //update      
      var idx = this.findByIdReturningIndex(plan.id, trainingPlans);
      trainingPlans[idx] = plan;
    } else {  //insert
      plan.id = this.getLastId(trainingPlans) + 1;
      trainingPlans.push = plan;
    }
  }
  
  this.getLastId = function(arr) {
    var last = 1;
    for(var i=0; i<arr.length; i++) {
      if (arr[i].id > last) {
        last = arr[i].id;
      }
    }
    console.log("getLastId: " + last);
    return last;
  }


  var trainingPlans = [{
      id: "1",
      student: {name: "Jonathas Amaral", born: "02/05/1985", weight: 65, height: 174 },
      description: "Ficha 1",
      startDate: "20150101",
      endDate: "20150201",
      reason: "Observacao da ficha 1",
      exercises: [
          {id:1, name:"Remada Baixa", sets:3, reps:10, weight:12, rest:30},
          {id:2, name:"Puxador Frontal", sets:4, reps:12, weight:35, rest:30},
          {id:3, name:"Supino Inclinado", sets:3, reps:6, weight:25, rest:60}
      ]
    },

    {
      id: "2",
      student: {name: "Jonathas Amaral", born: "02/05/1985", weight: 65, height: 174},
      description: "Ficha 2",
      startDate: "20150201",
      endDate: "20150301",
      reason: "Observacao da ficha 2",
      exercises: [
          {id:1, name:"Rosca Direta", sets:3, reps:8, weight:20, rest:30},
          {id:2, name:"Rosca Cabo", sets:3, reps:8, weight:20, rest:30},
          {id:3, name:"Triceps Francês", sets:3, reps:8, weight:9, rest:60},
          {id:4, name:"Triceps Corda", sets:3, reps:8, weight:10, rest:60}
      ]
    },
    {
      id: "3",
      student: {name: "Jonathas Amaral", born: "02/05/1985", weight: 65, height: 174},
      description: "Ficha 3",
      startDate: "20150131",
      endDate: "20150331",
      reason: "Observacao da ficha 3",
      exercises: [
          {id:1, name:"Flexora", sets:4, reps:15, weight:30, rest:30},
          {id:2, name:"Extensora", sets:4, reps:15, weight:35, rest:30},
          {id:3, name:"Abdominal Infra", sets:3, reps:6, weight:null, rest:60}
      ]
    }
    ];
  
  return this;

});