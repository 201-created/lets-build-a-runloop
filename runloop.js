(function(global){
  "use strict";

  function Runloop(){
    this.tasks = [];
  }

  Runloop.currentRunloop = null;

  Runloop.schedule = function(context, task, queue){
    if (!this.currentRunloop) {
      throw "You cannot schedule without a runloop!";
    }
    this.currentRunloop.tasks.push([context, task]);
  };

  Runloop.run = function(context, fn){
    throw "implement Runloop.run";
  };

  Runloop.begin = function(){
    this.currentRunloop = new Runloop();
  };

  Runloop.end = function(){
    var taskTuple;
    while (taskTuple = this.currentRunloop.tasks.shift()) {
      var context = taskTuple[0],
            task  = taskTuple[1];

      task.call(context);
    }
    this.currentRunloop = null;
  };

  global.Runloop = Runloop;

})(window);
