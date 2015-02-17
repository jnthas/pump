"use strict";

angular.module("pump").factory("dataService", function($q, localStorageService) {
  
  this.initialize = function() {
    var deferred = $q.defer();    
    if (localStorageService.isSupported()) {
      deferred.resolve();
    } else {
      deferred.reject("localStorage não suportado!");
    }
    return deferred.promise;
  };
  
  this.getStudent = function() {
    var deferred = $q.defer();    
    var student = localStorageService.get("student");
    if (!student) {
      student = new Student();
    }
    deferred.resolve(student);  
    return deferred.promise;
  };
  
  this.getAll = function() {
    var deferred = $q.defer();
    var plans = localStorageService.get("plans");
    if (!plans) {
      plans = [];
    }
    deferred.resolve(plans);
    return deferred.promise;
  };
  
  
  this.findById = function(id) {
    var deferred = $q.defer();
    try {
      this.getAll().then(function(plans){
        var obj = plans[findByIdReturningIndex(id, plans)];
        deferred.resolve(obj);
      });
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
      localStorageService.set("student", std);
      deferred.resolve();
    } catch(ex) {
      deffered.reject("Erro ao salvar registro: " + ex.message);
    }
    return deferred.promise;    
  };  
  
  this.savePlan = function(plan) {    
    var deferred = $q.defer();
    try {
      this.getAll().then(function(plans){
        save(plans, plan);
        localStorageService.set("plans", plans);
        deferred.resolve();
      });      
    } catch(ex) {
      deffered.reject("Erro ao salvar registro: " + ex.message);
    }
    return deferred.promise;
  };
  
  this.saveExercise = function(planId, exercise) {
    var deferred = $q.defer();
    var self = this;
    try {
      self.findById(planId).then(function(plan){
        save(plan.exercises, exercise);
        
        self.savePlan(plan).then(function(){
          deferred.resolve();
        }, function(msg){
          deferred.reject(msg);
        });
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
    console.log("saving: "); console.log(arr);
    
  };
  
    
  function getLastId(arr) {
    var last = 0;    
    for(var i=0; i<arr.length; i++) {
      if (arr[i].id > last) {
        last = arr[i].id;
      }
    }
    //console.log("getLastId: " + last);
    return last;
  };
  
  
  return this;

});