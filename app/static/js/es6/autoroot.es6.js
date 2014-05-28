/* global ajax */

(function(){
  'use strict';

  init();

  function init()
  {
    $('#autoRooting').click(toggle);
  }

  var isOn = false;
  var timer;

  function toggle()
  {
    isOn = !isOn;
    $('#autoRooting').toggleClass('on');

    if(isOn){
      $('#autoRooting').css('background-image', 'url("/img/autoroot.gif")');
      start();
    }else{
      $('#autoRooting').css('background-image', 'url("/img/autoroot-2.png")');
      clearInterval(timer);
    }
  }

  function start()
  {
    clearInterval(timer);
    timer = setInterval(uprooting, 1000);
  }

  function uprooting()
  {
    //console.log('uprooting...');
    //var deadForest = $('.tree.dead');

    //var ids = [];

    $('.tree.dead').map((index,DOMelement)=>$(DOMelement).attr('data-id')).each((item, value)=>{


      var tree = $(`.tree[data-id=${value}]`);                // value = is the id of the tree
      ajax(`/trees/${value}/destroy`, 'put', null, h => {
        console.log(h);
        tree.replaceWith(h);

        // if($(h).hasClass('beanstalk')){
        //   audioBeanStalk.play();
        // }else if(!$(h).hasClass('dead')){
        //   autoChop(tree, value);
        // }

      });
    });

    // if(growingForest < 50){
    //
    //   var userId = $('#user > p').attr('data-id');
    //   ajax('/trees/plant', 'post', {userId:userId}, h =>{
    //     $('#forest').append(h);
    //
    //   });
    // }

  }

})();
