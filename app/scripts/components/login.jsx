var React = require('react');
var User = require('../models/user').User;


var SignUpForm = React.createClass({
  getInitialState: function(){
    return {
      username: '',
      password: ''
    };
  },
  handleEmail: function(e){
    e.preventDefault();

    this.setState({username: e.target.value});
  },
  handlePassword: function(e){
    e.preventDefault();

    this.setState({password: e.target.value});
  },
  handleSubmit: function(e){
    e.preventDefault();

    var username = this.state.username;
    var password = this.state.password;

    this.props.signUpNewUser(username, password);
    this.setState({username: '', password: ''});
  },
  render: function(){

    return (
      <form onSubmit={this.handleSubmit} id="signup">
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input onChange={this.handleEmail} className="form-control" name="email" id="email" type="email" placeholder="email" value={this.state.username} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input onChange={this.handlePassword} className="form-control" name="password" id="password" type="password" placeholder="Password Please" value={this.state.password} />
        </div>

        <input className="btn btn-primary" type="submit" value="Sign Me Up!" />
      </form>
    )
  }
});

var LoginForm = React.createClass({
  render: function(){
    return (
      <form id="login">
        <div className="form-group">
          <label htmlFor="email-login">Email address</label>
          <input className="form-control" name="email" id="email-login" type="email" placeholder="email" />
        </div>

        <div className="form-group">
          <label htmlFor="password-login">Password</label>
          <input className="form-control" name="password" id="password-login" type="password" placeholder="Password Please" />
        </div>

        <input className="btn btn-primary" type="submit" value="Beam Me Up!" />
      </form>
    );
  }
});

function setHeaders(sessionId){
  $.ajaxSetup({
    beforeSend: function(xhr){
      xhr.setRequestHeader("X-Parse-Application-Id", "tiygvl");
      xhr.setRequestHeader("X-Parse-REST-API-Key", "slumber");

      if(sessionId){
        xhr.setRequestHeader("X-Parse-Session-Token", sessionId);
      }
    }
  });
}

var LoginContainer = React.createClass({
  getInitialState: function(){
    return {
      user: new User()
    };
  },
  signUpNewUser: function(username, password){
    this.state.user.set({username: username, password: password});
    this.state.user.signUp();

    setHeaders(sessionId);
  },
  render: function(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>Login</h1>
            <LoginForm />
          </div>
          <div className="col-md-6">
            <h1>Sign Up</h1>
            <SignUpForm signUpNewUser={this.signUpNewUser}/>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = {
  LoginContainer: LoginContainer
};
