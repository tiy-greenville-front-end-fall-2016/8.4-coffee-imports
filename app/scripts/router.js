var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var LoginContainer = require('./components/login.jsx').LoginContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'login/': 'login',
  },
  initialize: function(){
    // setHeaders();
  },
  /**
   * Overload the execture method so we can check for logged in user.
   * Redirect to login screen if user is not logged in.
   */
  // execute: function(callback, args, name){
  //   var user = User.current();
  //
  //   if(!user){
  //     this.navigate('login/', {trigger: true});
  //     return;
  //   }
  //
  //   return Backbone.Router.prototype.execute.call(this, callback, args, name);
  // },

  // Coffee List View
  index: function(){
    console.log('Index screen working!');
  },

  // User Login View
  login: function(){

    $.get('https://megatron42.herokuapp.com/classes/Donut').then(function(data){
      console.log(data);
    })

    ReactDOM.render(
      React.createElement(LoginContainer),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.exports = router;
