(function(global){

  function Runloop(){
    this.actions = [];
    this.render = [];
  }

  Runloop.prototype = {
    scheduleOnce: function(queue, context, task) {
      var foundTask;
      for (var i=0;i<this[queue].length;i++) {
        var queuedTask = this[queue][i];
        if (queuedTask[0] === context && queuedTask[1] === task) {
          foundTask = true;
          break;
        }
      }
      if (!foundTask) {
        this[queue].push([context, task]);
      }
    },
    schedule: function(queue, context, task) {
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

  Runloop.scheduleOnce = function(queue, context, task){
    if (!this.currentRunloop) {
      throw "You cannot schedule a task without a runloop!";
    }
    this.currentRunloop.scheduleOnce(queue, context, task);
  }

  Runloop.schedule = function(queue, context, task){
    if (!this.currentRunloop) {
      throw "You cannot schedule a task without a runloop!";
    }
    this.currentRunloop.schedule(queue, context, task);
  }

  Runloop.run = function(context, fn){
    this.begin();
    fn.call(context);
    this.end();
  }

  Runloop.begin = function(){
    this.currentRunloop = new Runloop();
  }

  Runloop.end = function(){
    this.currentRunloop.flush();
    this.currentRunloop = null;
  }

  global.Runloop = Runloop;

})(window);
