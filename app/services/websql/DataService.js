"use strict";

angular.module("pump").factory("dataService", function($q, $webSql) {
    
  this.initialize = function() {
    var deferred = $q.defer();
    db = $webSql.openDatabase("pump", "0.1", "Pump Database", 5 * 1024 * 1024);    
    createTables(db);
    deferred.resolve(service(db));
    return deferred.promise;
  };
  
  
  function createTables(db) {
    
    var tableStudent = {
      "id":{
        "type": "INTEGER",
        "null": "NOT NULL", // default is "NULL" (if not defined)
        "primary": true, // primary
        "auto_increment": true // auto increment
      },
      "name":{
        "type": "TEXT"
      },
      "born":{
        "type": "TIMESTAMP"
      },
      "weight":{
        "type": "INTEGER"        
      },
      "height":{
        "type": "INTEGER"
      }    
    };
    

    var tablePlans = {
      "id":{
        "type": "INTEGER",
        "null": "NOT NULL", // default is "NULL" (if not defined)
        "primary": true, // primary
        "auto_increment": true // auto increment
      },
      "description":{
        "type": "TEXT"
      },
      "startDate":{
        "type": "TIMESTAMP"
      },
      "endDate":{
        "type": "TIMESTAMP"
      },
      "reason":{
        "type": "TEXT"
      }      
    };
    
    var tableExercises = {
      "id":{
        "type": "INTEGER",
        "null": "NOT NULL", // default is "NULL" (if not defined)
        "primary": true, // primary
        "auto_increment": true // auto increment
      },
      "idFicha":{
        "type": "INTEGER",
        "null": "NOT NULL"
      },
      "name":{
        "type": "TEXT"
      },
      "sets":{
        "type": "INTEGER"
      },
      "reps":{
        "type": "INTEGER"
      },
      "weight":{
        "type": "INTEGER"
      },
      "rest":{
        "type": "INTEGER"
      }
    };
    
    db.createTable('student', tableStudent);
    db.createTable('plan', tablePlans);
    db.createTable('exercise', tableExercises);
  }
  
  
  function service(db) {

    this.getStudent = function() {
      var deferred = $q.defer();
    
      db.
    
    
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
    
    return this;  
  }
  
  return this;
});