(function() {
  'use strict';
  init();
  function init() {
    $('#autoGrowing').click(grow);
  }
  var isOn = false;
  var timer;
  function grow() {
    isOn = !isOn;
    $('#autoGrowing').toggleClass('on');
    if (isOn) {
      start();
    } else {
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
        tree.replaceWith(h);
        if ($(h).hasClass('beanstalk')) {
          audioBeanStalk.play();
        }
      }));
    }));
  }
})();

//# sourceMappingURL=autogrow.map
