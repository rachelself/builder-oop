/* global ajax, audioBeanStalk */

(function(){
  'use strict';

  init();

  function init(){
    $('#autoGrowing').click(grow);
  }

  var isOn = false;
  var timer;

  function grow()
  {
    isOn = !isOn;
    $('#autoGrowing').toggleClass('on');

    if(isOn){
      start();
    }else{
      clearInterval(timer);
    }
  }

  function start()
  {
    clearInterval(timer);
    timer = setInterval(growing, 1000);
  }

  function growing()
  {
    $('.alive:not(.beanstalk)').map((index,DOMelement)=>$(DOMelement).attr('data-id')).each((item, value)=>{


      var tree = $(`.tree[data-id=${value}]`);                  // value = is the id of the tree
      ajax(`/trees/${value}/grow`, 'put', null, h => {
        tree.replaceWith(h);
        if($(h).hasClass('beanstalk')){
          audioBeanStalk.play();
        }
      });




    });
  }



})();
