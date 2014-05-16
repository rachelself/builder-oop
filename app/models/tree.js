'user strict';

var users = global.nss.db.collection('users');
var trees = global.nss.db.collection('trees');
var Mongo = require('mongodb');
var _ = require('lodash');

class Tree{
  constructor(userId){
    this.userId = userId;
    this.height = 0;
    this.isHealthy = true;
    this.isChopped = false;
  }

  chop(){
    this.height = 0;
    this.isHealthy = false;
    this.isChopped = true;
  }

  get isAdult(){
    return this.height >= 48;
  }

  get isChoppable(){
    return this.isAdult && this.isHealthy && !this.isBeanStalk;
  }

  get isGrowable(){
    return this.isHealthy && !this.isBeanStalk;
  }

  get isBeanStalk(){
    return (this.height/12) > 10000;
  }

  grow(){
    var maxHeight;

    if(!this.isAdult){
      maxHeight = 2;
    }else{
      maxHeight = this.height * 0.1;
    }

    var min;

    //min = this.isAdult ? 200-(this.height/12) * 0.1 : 200;

    if(!this.isAdult){
      min = 200;
    }else{
      min = 200-(this.height/12) * 0.1;
    }

    min = min < 10 ? 10 : min;

    console.log(200);
    console.log(min);
    //this.isHealthy = _.random(0, min, true) > 1;
    this.height += _.random(0, maxHeight, true);
  }

  save(fn){
    trees.save(this, ()=>fn());
  }

  getClasses(){
    var classes = [];
    if(this.height === 0 && this.isHealthy){
      classes.push('seed');
    }else if(this.height < 24){
      classes.push('sapling');
    }else if(!this.isAdult){
      classes.push('treenager');
    }else{
      classes.push('adult');
    }

    if(!this.isHealthy){
      classes.push('dead');
    }

    if(this.isChopped){
      classes.push('chopped');
    }

    if(this.isChopped){
      classes.push('stump');
    }

    if(this.isBeanStalk){
      //this.isChoppable = false;
      classes.push('beanstalk');
    }

    return classes.join(' ');
  }

  static findByTreeId(treeId, fn){
    treeId = Mongo.ObjectID(treeId);
    trees.findOne({_id:treeId}, (e, tree)=>{
      tree = _.create(Tree.prototype, tree);
      fn(tree);
    });
  }

  static plant(userId, fn){
    userId = Mongo.ObjectID(userId);
    users.findOne({_id:userId}, (e, user)=>{
      var tree = new Tree(userId);
      trees.save(tree, ()=> fn(tree));
    });
  }

  static findAllByUserId(userId, fn){
    userId = Mongo.ObjectID(userId);
    trees.find({userId:userId}).toArray((e, objs)=>{
      var forest = objs.map(o=>_.create(Tree.prototype, o));
      fn(forest);
    });
  }
}

module.exports = Tree;
