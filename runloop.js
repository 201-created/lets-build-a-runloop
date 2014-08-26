(function(global){
  "use strict";

  function Runloop(){
    this.tasks = [];
  }

  Runloop.currentRunloop = null;

  Runloop.schedule = function(context, task){
    if (!this.currentRunloop) {
      throw "You cannot schedule a task without a runloop!";
    }
    this.currentRunloop.tasks.push([context,task]);
  };

  Runloop.begin = function(){
    this.currentRunloop = new Runloop();
  };

  Runloop.end = function(){
    var task;
    while (task = Runloop.currentRunloop.tasks.shift()) {
      var context = task[0];
      task = task[1];

      task.call(context);
    }
    this.currentRunloop = null;
  };

  global.Runloop = Runloop;

})(window);
