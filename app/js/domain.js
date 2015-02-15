var TrainingPlan = function() {  
  this.id = undefined;
  this.description = undefined;
  this.startDate = undefined;
  this.endDate = undefined;
  this.reason = undefined;
  this.exercises = [];
};

var Exercise = function() {
  this.id = undefined;
  this.name = undefined;
  this.sets = undefined;
  this.reps = undefined; 
  this.weight = undefined;
  this.rest = undefined;
};

var Student = function() {
  this.name = undefined;
  this.born = undefined;
  this.weight = undefined;
  this.height = undefined;
};
