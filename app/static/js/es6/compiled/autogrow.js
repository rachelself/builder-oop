(function() {
  'use strict';
  init();
  function init() {
    $('#autoGrowing').click(grow);
    displaySlider();
  }
  var isOn = false;
  var timer;
  function grow() {
    isOn = !isOn;
    $('#autoGrowing').toggleClass('on');
    if (isOn) {
      $('#autoGrowing').css('background-image', 'url("/img/antplant.gif")');
      start();
    } else {
      $('#autoGrowing').css('background-image', 'url("/img/antplant.png")');
      clearInterval(timer);
    }
  }
  function start() {
    clearInterval(timer);
    timer = setInterval(growing, 1000);
  }
  function growing() {
    $('.alive:not(.beanstalk)').map((function(index, DOMelement) {
      return $(DOMelement).attr('data-id');
    })).each((function(item, value) {
      var tree = $((".tree[data-id=" + value + "]"));
      ajax(("/trees/" + value + "/grow"), 'put', null, (function(h) {
        console.log(h);
        tree.replaceWith(h);
        if ($(h).hasClass('beanstalk')) {
          audioBeanStalk.play();
        } else if (!$(h).hasClass('dead')) {
          autoChop(tree, value);
        }
      }));
    }));
  }
  function autoChop(tree, value) {
    var height = $(tree[0]).children().first().text().split(' ').map((function(h) {
      return h.trim();
    }));
    var heightInFeet = height[0];
    var length = heightInFeet.length;
    var currentHeight = heightInFeet.substr(0, (length - 1)) * 1;
    var chopHeight = $('#range-output').val() * 1;
    if (currentHeight === chopHeight) {
      audioChop.play();
      ajax(("/trees/" + value + "/chop"), 'put', null, (function(h) {
        tree.replaceWith(h);
        dashboard();
      }));
    }
  }
  function displaySlider() {
    $('#range-slider').noUiSlider({
      start: 5,
      range: {
        'min': 5,
        'max': 9999
      },
      serialization: {
        lower: [$.Link({target: $('#range-output')})],
        format: {
          decimals: 0,
          mark: ','
        }
      }
    });
  }
})();

//# sourceMappingURL=autogrow.map
