'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');
var Item = traceur.require(__dirname + '/../models/item.js');


// exports.login = (req, res)=>{
//   User.login(req.body.username, user =>{
//     res.render('users/dashboard', {user:user}, (err,dashboard)=>{
//       res.render('users/possessions', {possessions:possessions}, (err,possessions)=>{
//         res.send({users:users, possessions:possessions});
//       };
//     });
//   });
// };

exports.login = (req, res)=>{
  User.login(req.body.username, user =>{
    res.render('users/dashboard', {user:user});
  });
};

exports.sellWood = (req, res)=>{
  console.log(req.params.userId);
  User.findByUserId(req.params.userId, user=>{
    console.log(user);
    user.sellWood(req.body.amount);
    user.save(()=>{
      res.render('users/dashboard', {user:user});
    });
  });
};


exports.dashboard = (req, res)=>{
  User.findByUserId(req.params.userId, user=>{
    res.render('users/dashboard', {user:user});
  });
};

exports.purchase = (req, res)=>{
  User.findByUserId(req.params.userId, user=>{
    var item = new Item(req.params.item);
    user.purchase(item);
    user.save(()=>{
      res.render('users/dashboard', {user:user});
      });
  });
};

exports.items = (req, res)=>{
  User.findByUserId(req.params.userId, user=>{
   res.render('users/items', {items:user.items});
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
