(function(global){
  "use strict";

  function Runloop(){
    this.tasks = [];
  }

  Runloop.currentRunloop = null;

  Runloop.schedule = function(context, task){
    throw "Implement Runloop.schedule";
  };

  Runloop.begin = function(){
    throw "Implement Runloop.begin";
  };

  Runloop.end = function(){
    throw "Implement Runloop.end";
  };

  global.Runloop = Runloop;

})(window);
