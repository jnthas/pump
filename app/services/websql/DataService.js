"use strict";

angular.module("pump").factory("dataService", function($q, $window) {
  
  var db;
  
  
  this.initialize = function() {    
    var deferred = $q.defer();    
    if ("openDatabase" in $window) {      
      db = window.openDatabase("Pump", 1, "Pump", 5 * 1024 * 1024, function(db) {        
        console.log("Creating database...");        
        db.transaction(function(tx){
          createTables(tx);        
        });
      });           
      deferred.resolve();
    } else {
      deferred.reject("WebSQL is not supported!");
    }
    return deferred.promise;
  };
  
  
  this.getStudent = function() {
    var deferred = $q.defer();    
    db.transaction(function(tx){
      tx.executeSql("SELECT * FROM student", null, function(tx, results){        
        if (results.rows.length) {
          deferred.resolve(results.rows.item(0));
        } else {
          deferred.resolve(new Student());          
        }
      });
    }, function(error){
      deferred.reject(error);
    });
    
    return deferred.promise;
  };

  this.getAll = function() {
    var deferred = $q.defer();    
    db.transaction(function(tx){
      tx.executeSql("SELECT * FROM plan", null, function(tx, results){        
        var len = results.rows.length;
        if (len) {
          var plans = [];
          for (var i=0; i < len; i++) {
            plans[i] = results.rows.item(i);
          }
          deferred.resolve(plans);
        } else {
          deferred.resolve();          
        }
      });
    }, function(error){
      deferred.reject(error);
    });
    return deferred.promise;
  };

  this.findById = function(id) {
    var deferred = $q.defer();
    db.transaction(function(tx){
      tx.executeSql("SELECT * FROM plan WHERE id = :id", [id], function(tx, results){        
        if (results.rows.length) {
          deferred.resolve(results.rows.item(0));
        } else {
          deferred.resolve(new Student());          
        }
      });
    }, function(error){
      deferred.reject(error);
    });    
    return deferred.promise;
  };

  this.findExerciseById = function(planId, id) {
    var deferred = $q.defer();
    db.transaction(function(tx){
      tx.executeSql("SELECT * FROM exercise WHERE planId = :planId AND id = :id", [planId, id], function(tx, results){        
        if (results.rows.length) {
          deferred.resolve(results.rows.item(0));
        } else {
          deferred.resolve(new Student());          
        }
      });
    }, function(error){
      deferred.reject(error);
    });    
    return deferred.promise;
  };


  this.saveStudent = function(std) {    
    var deferred = $q.defer();
    var sql = "INSERT INTO student VALUES (:id, :name, :born, :weight, :height);";    
    db.transaction(function(tx){
      tx.executeSql(sql, [null, std.name, std.born, std.weight, std.height], function(tx, results){
        deferred.resolve();
      });      
    }, function(error){
      deferred.reject(error);
    });    
    return deferred.promise;    
  };  

  this.savePlan = function(plan) {    
    var deferred = $q.defer(),
        sql, values;    
    
    if (plan.id) {
      sql = "UPDATE plan VALUES (description = :description, startDate = :startDate, endDate = :endDate, reason = :reason WHERE id = :id;";
      values = [plan.description, plan.startDate, plan.endDate, plan.reason, plan.id];
    } else {
      sql = "INSERT INTO plan VALUES (:id, :description, :startDate, :endDate, :reason);";
      values = [null, plan.description, plan.startDate, plan.endDate, plan.reason];      
    }
    
    
    db.transaction(function(tx){
      tx.executeSql(sql, values, function(tx, results){
        deferred.resolve();
      });      
    }, function(error){
      deferred.reject(error);
    });    
    return deferred.promise;
  };

  this.saveExercise = function(planId, exercise) {
    var deferred = $q.defer(),
        sql, values;
    
    if (exercise.id) {    
      sql = "UPDATE exercise SET planId = :planId, name = :name, sets = :sets, reps = :reps, weight = :weight, rest = :rest WHERE id = :id;";
      values = [planId, exercise.name, exercise.sets, exercise.reps, exercise.weight, exercise.rest, exercise.id]
    } else {    
      sql = "INSERT INTO exercise VALUES (:id, :planId, :name, :sets, :reps, :weight, :rest);";
      values = [null, planId, exercise.name, exercise.sets, exercise.reps, exercise.weight, exercise.rest]
    }    
    
    db.transaction(function(tx){
      tx.executeSql(sql, values, function(tx, results){
        deferred.resolve();
      });      
    }, function(error){
      deferred.reject(error);
    });
    return deferred.promise;    
  };



  function createTables(tx) {
                 
    var sql = "CREATE TABLE student (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), born TIMESTAMP, weight INTEGER, height INTEGER);"; 
    tx.executeSql(sql, null, function() {
      console.log("Tabela criada: student");
    }, function(tx, erro) {
      console.log("Erro ao criar tabela student: " + erro.message);
    });
    
    
    sql = "CREATE TABLE plan (id INTEGER PRIMARY KEY AUTOINCREMENT, description VARCHAR(100), startDate TIMESTAMP, endDate TIMESTAMP, reason VARCHAR(200));";
    tx.executeSql(sql, null, function() {
      console.log("Tabela criada: plan");
    }, function(tx, erro) {
      console.log("Erro ao criar tabela plan: " + erro.message);
    });
    
    
    sql = "CREATE TABLE exercise (id INTEGER PRIMARY KEY AUTOINCREMENT, planId INTEGER, name VARCHAR(100), sets INTEGER, reps INTEGER, weight INTEGER, rest INTEGER);";
    tx.executeSql(sql, null, function() {
      console.log("Tabela criada: exercise");
    }, function(tx, erro) {
      console.log("Erro ao criar tabela exercise: " + erro.message);
    });
  }
  
  
  return this;
});