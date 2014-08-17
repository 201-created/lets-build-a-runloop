(function(global){

  function Runloop(){}

  Runloop.schedule = function(context, task){
    throw "Implement schedule";
  }

  Runloop.begin = function(){
    throw "Implement begin";
  }

  Runloop.end = function(){
    throw "Implement end";
  }

  global.Runloop = Runloop;

})(window);
