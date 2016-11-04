var Backbone = require('backbone');

var User = Backbone.Model.extend({
  urlRoot: 'https://tiny-parse-server.herokuapp.com/users',
  signUp: function(){
    var self = this;
    var username = this.get('username');
    var password = this.get('password');

    this.save().then(function(data){
      console.log(data);
      localStorage.setItem('user', JSON.stringify(self.toJSON()));
    });
  }
});

module.exports = {
  User: User
};
