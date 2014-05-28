(function() {
  'use strict';
  init();
  function init() {
    $('#autoRooting').click(toggle);
  }
  var isOn = false;
  var timer;
  function toggle() {
    isOn = !isOn;
    $('#autoRooting').toggleClass('on');
    if (isOn) {
      $('#autoRooting').css('background-image', 'url("/img/autoroot.gif")');
      start();
    } else {
      $('#autoRooting').css('background-image', 'url("/img/autoroot-2.png")');
      clearInterval(timer);
    }
  }
  function start() {
    clearInterval(timer);
    timer = setInterval(uprooting, 1000);
  }
  function uprooting() {
    $('.tree.dead').map((function(index, DOMelement) {
      return $(DOMelement).attr('data-id');
    })).each((function(item, value) {
      var tree = $((".tree[data-id=" + value + "]"));
      ajax(("/trees/" + value + "/destroy"), 'put', null, (function(h) {
        console.log(h);
        tree.replaceWith(h);
      }));
    }));
  }
})();

//# sourceMappingURL=autoroot.map
