var Backbone = require('backbone');

var User = Backbone.Model.extend({
  idAttribute: 'objectId',
  signUp: function(user, attrs, options){
    var username = (attrs && attrs.username) || user.get('username');
    var password = (attrs && attrs.password) || user.get('password');

    if (!username || !username.length) {
      throw 'Cannot sign up user with an empty name.';
    }

    if (!password || !password.length) {
      throw 'Cannot sign up user with an empty password.';
    }

    return user.save(attrs, options).then(function(){
      // Clear the password field
      user.set({password: undefined});

      return User.setCurrentUser(user);
    });
  },

  logIn: function(user, options){
    // var RESTController = CoreManager.getRESTController();
    var auth = {
      username: user.get('username'),
      password: user.get('password')
    };
    return RESTController.request(
      'GET', 'login', auth, options
    ).then((response, status) => {
      user._migrateId(response.objectId);
      user._setExisted(true);

      response.password = undefined;
      user._finishFetch(response);
      return DefaultController.setCurrentUser(user);
    });

  }
}, {
  signUp: function(username, password, attrs, options) {
    attrs = attrs || {};
    attrs.username = username;
    attrs.password = password;
    var user = new User(attrs);
    return user.signUp({}, options);
  },
  logIn: function(username, password, options) {
    var user = new User({username: username, password: password});
    return user.logIn(options);
  }


  current: function(){
    if (currentUserCache) {
      return currentUserCache;
    }
    if (currentUserCacheMatchesDisk) {
      return null;
    }
    if (Storage.async()) {
      throw new Error(
        'Cannot call currentUser() when using a platform with an async ' +
        'storage system. Call currentUserAsync() instead.'
      );
    }
    var path = Storage.generatePath(CURRENT_USER_KEY);
    var userData = Storage.getItem(path);
    currentUserCacheMatchesDisk = true;
    if (!userData) {
      currentUserCache = null;
      return null;
    }
    userData = JSON.parse(userData);
    if (!userData.className) {
      userData.className = '_User';
    }
    if (userData._id) {
      if (userData.objectId !== userData._id) {
        userData.objectId = userData._id;
      }
      delete userData._id;
    }
    if (userData._sessionToken) {
      userData.sessionToken = userData._sessionToken;
      delete userData._sessionToken;
    }
    var current = ParseUser.fromJSON(userData);
    currentUserCache = current;
    current._synchronizeAllAuthData();
    return current;
  },
  clearSession: function(){

  }
);
