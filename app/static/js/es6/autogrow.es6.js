/* global ajax, audioBeanStalk, dashboard, audioChop */
/* jshint unused:false */

(function(){
  'use strict';

  init();

  function init(){
    $('#autoGrowing').click(grow);
    displaySlider();
  }

  var isOn = false;
  var timer;

  function grow()
  {
    isOn = !isOn;
    $('#autoGrowing').toggleClass('on');

    if(isOn){
      $('#autoGrowing').css('background-image', 'url("/img/antplant.gif")');
      start();
    }else{
      $('#autoGrowing').css('background-image', 'url("/img/antplant.png")');
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


      var tree = $(`.tree[data-id=${value}]`);                // value = is the id of the tree
      ajax(`/trees/${value}/grow`, 'put', null, h => {
        console.log(h);
        tree.replaceWith(h);

        if($(h).hasClass('beanstalk')){
          audioBeanStalk.play();
        }else if(!$(h).hasClass('dead')){
          autoChop(tree, value);
        }

      });
    });
  }

  function autoChop(tree, value)
  {
    // console.log(tree);
    // console.log(value);
    // debugger;

    var height = $(tree[0]).children().first().text().split(' ').map(h=>h.trim());
    var heightInFeet = height[0];
    var length = heightInFeet.length;
    var currentHeight = heightInFeet.substr(0,(length-1))*1;

    var chopHeight = $('#range-output').val() * 1;

    // console.log(height);
    // console.log(heightInFeet);
    // console.log(length);
    // console.log(currentHeight);
    // console.log(chopHeight);
    // debugger;
    // debugger;

    //treeId =$(tree[0]

    if(currentHeight === chopHeight){
      audioChop.play();
      ajax(`/trees/${value}/chop`, 'put', null, h => {
        // console.log(h);
        // debugger;
        tree.replaceWith(h);
        dashboard();
        //debugger;

      });
    }


  }

  function displaySlider(){
    $('#range-slider').noUiSlider({
			start: 5,
			range: {
				'min': 5,
				'max': 9999
			},
      serialization: {
		    lower: [$.Link({target: $('#range-output')})],
		    format: {decimals: 0, mark: ','}
	    }
		});
  }


})();
