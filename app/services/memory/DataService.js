"use strict";

angular.module("pump").factory("dataService", function($q) {
    
  this.initialize = function() {
    var deferred = $q.defer();
    deferred.resolve();
    return deferred.promise;
  };
  
  this.getStudent = function() {
    var deferred = $q.defer();
    deferred.resolve(student);
    return deferred.promise;
  };
  
  this.getAll = function() {
    var deferred = $q.defer();
    deferred.resolve(trainingPlans);
    return deferred.promise;
  };
  
  this.findById = function(id) {
    var deferred = $q.defer();
    try {      
      var obj = trainingPlans[findByIdReturningIndex(id, trainingPlans)];
      deferred.resolve(obj);
    } catch(ex) {    
      deferred.reject("Registro não encontrado: " + ex.message);
    }
    return deferred.promise;
  };
  
  this.findExerciseById = function(planId, id) {
    var deferred = $q.defer();
    try {      
        this.findById(planId).then(function(plan){
          var obj = plan.exercises[findByIdReturningIndex(id, plan.exercises)];
          deferred.resolve(obj);       
        }, function(msg){
          deferred.reject(msg);
        });        
    } catch(ex) {    
      deferred.reject("Registro não encontrado: " + ex.message);
    }
    return deferred.promise;
  };
  
  
  this.saveStudent = function(std) {    
    var deferred = $q.defer();
    try {
      save([student], std);
      deferred.resolve();
    } catch(ex) {
      deffered.reject("Erro ao salvar registro: " + ex.message);
    }
    return deferred.promise;    
  };  
  
  this.savePlan = function(plan) {    
    var deferred = $q.defer();
    try {
      save(trainingPlans, plan);
      deferred.resolve();
    } catch(ex) {
      deffered.reject("Erro ao salvar registro: " + ex.message);
    }
    return deferred.promise;
  };
  
  this.saveExercise = function(planId, exercise) {
    var deferred = $q.defer();
    try {
      this.findById(planId).then(function(plan){
        save(plan.exercises, exercise);
        deferred.resolve();
      }, function(msg) {
        deferred.reject(msg);
      });
    } catch(ex) {
      deferred.reject("Erro ao salvar registro: " + ex.message);
    }
    return deferred.promise;    
  };
  
  
  /* ---------- Private functions --------- */
  
  function findByIdReturningIndex(id, arr) {
    //console.log("findByIdReturningIndex: " + id) ;
    for(var i=0; i<arr.length; i++) {
      if (arr[i].id == parseInt(id)) {
        return i;
      }
    }
    throw "Registro não encontrado!";
  };
      
  function save(arr, obj) {
    //console.log("save:"); console.log(arr);
    if (obj.id) { //update      
      var idx = findByIdReturningIndex(obj.id, arr);
      arr[idx] = obj;
    } else {  //insert
      obj.id = parseInt(getLastId(arr)) + 1;
      arr.push(obj);
    }
  };
  
    
  function getLastId(arr) {
    var last = 1;    
    for(var i=0; i<arr.length; i++) {
      if (arr[i].id > last) {
        last = arr[i].id;
      }
    }
    //console.log("getLastId: " + last);
    return last;
  };
  

  var student = {id: 1, name: "Jonathas Amaral", born: "02/05/1985", weight: 65, height: 174};

  var trainingPlans = [{
      id: "1",
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