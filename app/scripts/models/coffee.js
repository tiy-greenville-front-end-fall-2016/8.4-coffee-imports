var Backbone = require('backbone');

var Coffee = Backbone.Model.extend({
  idAttribute: 'objectId',
  // parse: function(data){
  //   console.log('Coffee parse', data);
  //   return data.results;
  // }
});

var CoffeeCollection = Backbone.Collection.extend({
  model: Coffee,
  url: 'https://megatron42.herokuapp.com/classes/Coffee',
  parse: function(data){
    console.log('Coffee parse', data);
    return data.results;
  }
});
