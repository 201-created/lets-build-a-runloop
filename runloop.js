(function(global){
  "use strict";

  function Runloop(){
    this.actions = [];
    this.render = [];
  }

<<<<<<< HEAD
  Runloop.currentRunloop = null;
=======
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

  Runloop.currentRunloop;
>>>>>>> Introduce multiple queues, scheduleOnce

  Runloop.scheduleOnce = function(queue, context, task){
    if (!this.currentRunloop) {
      throw "You cannot schedule a task without a runloop!";
    }
<<<<<<< HEAD
    this.currentRunloop.tasks.push(task);
  };
=======
    this.currentRunloop.scheduleOnce(queue, context, task);
  }

  Runloop.schedule = function(context, task, queue){
    if (!this.currentRunloop) {
      throw "You cannot schedule a task without a runloop!";
    }
    if (!queue) {
      queue = 'actions';
    }
    this.currentRunloop.schedule(context, task, queue);
  }

  Runloop.run = function(context, fn){
    this.begin();
    fn.call(context);
    this.end();
  }
>>>>>>> Introduce multiple queues, scheduleOnce

  Runloop.begin = function(){
    this.currentRunloop = new Runloop();
  };

  Runloop.end = function(){
    this.currentRunloop.flush();
    this.currentRunloop = null;
  };

  global.Runloop = Runloop;

})(window);
