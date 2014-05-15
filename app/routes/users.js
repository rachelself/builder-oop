'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');
//var Mongo = require('mongodb');


exports.login = (req, res)=>{
  User.login(req.body.username, user =>{
    res.render('users/dashboard', {user:user});
  });
};

// exports.dashboard = (req, res)=>{
//
//   // var userId = req.params.userId;
//   //
//   // console.log('-------userID=======');
//   // console.log(userId);
//   //
//   // var type = typeof(userId);
//   //
//   // if(type === 'string'){
//   //   userId = Mongo.ObjectID(type);
//   // }
//   //
//   // console.log('------- converted =======');
//   // console.log(userId);
//
//   User.findByUserId(req.params.userId, user=>{
//     res.render('users/dashboard', {user:user});
//   });
// };
