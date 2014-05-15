'user strict';

var users = global.nss.db.collection('users');
var _ = require('lodash');


class User{
  constructor(username){
    this.username = username;
    this.wood = 0;
    this.cash = 0;
  }

  save(fn){
    users.save(this, ()=>fn());
  }

  static findByUserId(userId, fn){

    users.findOne({_id:userId}, (e, user)=>{
      user = _.create(User.prototype, user);
      fn(user);
    });
  }

  static login(username, fn){

    username = username.trim().toLowerCase();
    users.findOne({username:username}, (e, user)=>{
      if(user){
        fn(user);
      }else{
        user = new User(username);
        users.save(user, ()=> fn(user));
      }
    });
  }
}

module.exports = User;
