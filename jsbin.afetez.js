
var Editor = Backbone.View.extend({
  events: {
    change: 'updateCount',
    submit: 'search'
  },
  updateCount: function(){
    var el = $(this.el);
    var query = el.find('input');
    var length = query.val().length;
    el.find('.count').text(''+length+' letters');
  },
  initialize: function(){
    this.updateCount();
  },
  search: function(e){
    e.preventDefault();
    window.console.timeline('render');
    var resultsView = this.resultsView;
    var el = $(this.el);
    var terms = el.find('input').val();
    $.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
      tags: terms,
      format: 'json'
    }, function(data){
      resultsView.update(data);
    });
  }
});

var Results = Backbone.View.extend({
  update: function(data){
    var el = $(this.el);
    el.empty();
    data.items.forEach(function(item){
      $("<img/>").attr("src", item.media.m).appendTo(el).wrap('li');
    });
    window.console.timelineEnd();
  }
});


$(function(){
  var resultsView = new Results({ el: $('#results') });
  var editor= new Editor({ el: $('form'), });
  editor.resultsView = resultsView;
});