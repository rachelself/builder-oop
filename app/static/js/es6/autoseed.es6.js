/* global ajax */

(function(){
  'use strict';

  init();

  function init()
  {
    $('#autoSeeding').click(seed);
  }

  var isOn = false;
  var timer;

  function seed()
  {
    isOn = !isOn;
    $('#autoSeeding').toggleClass('on');

    if(isOn){
      $('#autoSeeding').css('background-image', 'url("/img/autoseeding.gif")');
      start();
    }else{
      $('#autoSeeding').css('background-image', 'url("/img/autoseeding.png")');
      clearInterval(timer);
    }
  }

  function start()
  {
    clearInterval(timer);
    timer = setInterval(planting, 1000);
  }

  function planting()
  {
    //console.log('planting...');
    var growingForest = $('.tree:not(.dead)').length;

    if(growingForest < 50){

      var userId = $('#user > p').attr('data-id');
      ajax('/trees/plant', 'post', {userId:userId}, h =>{
        $('#forest').append(h);

      });
    }

  }

})();
