(function(global){

  function Runloop(){
    this.actions = [];
    this.render = [];
  }

  Runloop.prototype = {
    scheduleOnce: function(context, task, queue) {
      throw "Implement scheduleOnce";
    },

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

  Runloop.scheduleOnce = function(context, task, queue){
    throw "Implement scheduleOnce";
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

  Runloop.begin = function(){
    this.currentRunloop = new Runloop();
  }

  Runloop.end = function(){
    this.currentRunloop.flush();
    this.currentRunloop = null;
  }

  global.Runloop = Runloop;

})(window);
