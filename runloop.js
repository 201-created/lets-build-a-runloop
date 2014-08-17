(function(global){


  function Runloop(){
    this.tasks = [];
  }

  Runloop.currentRunloop;

  Runloop.schedule = function(task){
    if (!this.currentRunloop) {
      throw "You cannot schedule a task without a runloop!";
    }
    this.currentRunloop.tasks.push(task);
  }

  Runloop.begin = function(){
    this.currentRunloop = new Runloop();
  }

  Runloop.end = function(){
    var task;
    while (task = Runloop.currentRunloop.tasks.shift()) {
      task();
    }
    this.currentRunloop = null;
  }

  global.Runloop = Runloop;

})(window);
