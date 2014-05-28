'user strict';

class Item{
  constructor(type){
    this.type = type;

    switch(type){
      case 'autogrow':
        this.cost = 50000;
        this.image = '/img/antplant.png';
        break;
      case 'autoseed':
        this.cost = 75000;
        this.image = '/img/autoseeding.png';
        break;
      case 'autoroot':
        this.cost = 85000;
        this.image = '/img/autoroot-2.png';
    }
  }
}

module.exports = Item;
