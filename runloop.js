(function(global){
  "use strict";


  function Runloop(){
    this.tasks = [];
  }

  Runloop.prototype = {
    schedule: function(context, task, queue) {
      this[queue].push([context, task]);
    },
    flush: function(){
      var task;
      while (task = this.actions.shift()) {
        task[1].call(task[0]);
      }
      while (task = this.render.shift()) {
        task[1].call(task[0]);
      }
    }
  };

  Runloop.currentRunloop = null;

  Runloop.scheduleOnce = function(queue, context, task){
    if (!this.currentRunloop) {
      throw "You cannot schedule a task without a runloop!";
    }
    this.currentRunloop.scheduleOnce(queue, context, task);
  };

  Runloop.schedule = function(context, task, queue){
    if (!this.currentRunloop) {
      throw "You cannot schedule a task without a runloop!";
    }
    if (!queue) {
      queue = 'actions';
    }
    this.currentRunloop.schedule(context, task, queue);
  };

  Runloop.run = function(context, fn){
    this.begin();
    fn.call(context);
    this.end();
  };

  Runloop.begin = function(){
    this.currentRunloop = new Runloop();
  };

  Runloop.end = function(){
    var taskTuple;
    while (taskTuple = Runloop.currentRunloop.tasks.shift()) {
      var context = taskTuple[0],
          task    = taskTuple[1];

      task.call(context);
    }
    this.currentRunloop = null;
  };

  Runloop.run = function(){
    throw "Implement Runloop.run";
  };

  global.Runloop = Runloop;

})(window);
