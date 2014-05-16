'user strict';

class Item{
  constructor(type){
    this.type = type;

    switch(type){
      case 'autogrow':
        this.cost = 50000;
        this.image = '/img/antplant.gif';
        break;

    }
  }
}

module.exports = Item;
