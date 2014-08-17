(function(global){


  function Runloop(){
    this.tasks = [];
  }

  Runloop.currentRunloop = null;

  Runloop.schedule = function(context, task){
    if (!this.currentRunloop) {
      throw "You cannot schedule a task without a runloop!";
    }
    this.currentRunloop.tasks.push([context,task]);
  }

  Runloop.begin = function(){
    this.currentRunloop = new Runloop();
  }

  Runloop.end = function(){
    var taskTuple;
    while (taskTuple = Runloop.currentRunloop.tasks.shift()) {
      var context = taskTuple[0],
          task    = taskTuple[1];

      task.call(context);
    }
    this.currentRunloop = null;
  }

  global.Runloop = Runloop;

})(window);
