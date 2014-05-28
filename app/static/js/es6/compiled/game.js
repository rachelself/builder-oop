var audioChop,
    audioBeanStalk;
function ajax(url, type) {
  'use strict';
  var data = arguments[2] !== (void 0) ? arguments[2] : {};
  var success = arguments[3] !== (void 0) ? arguments[3] : (function(r) {
    return console.log(r);
  });
  var dataType = arguments[4] !== (void 0) ? arguments[4] : 'html';
  $.ajax({
    url: url,
    type: type,
    dataType: dataType,
    data: data,
    success: success
  });
}
function dashboard() {
  'use strict';
  var userId = $('#user > p').attr('data-id');
  ajax(("/users/" + userId), 'get', null, (function(h) {
    $('#dashboard').empty().append(h);
  }));
}
(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#login').click(login);
    $('#dashboard').on('click', '#plant', plant);
    $('#dashboard').on('click', '#getforest', forest);
    $('#forest').on('click', '.grow', grow);
    $('#forest').on('click', '.chop', chop);
    $('#dashboard').on('click', '#sell', sellWood);
    $('#dashboard').on('click', '.autogrow+.purchase', purchaseAutoGrow);
    $('#dashboard').on('click', '.autoseed+.purchase', purchaseAutoSeed);
    $('#dashboard').on('click', '.autoroot+.purchase', purchaseAutoRoot);
    preloadAssets();
    $('showPossessions').hide();
  }
  function purchaseAutoRoot() {
    var userId = $('#user > p').attr('data-id');
    ajax(("/users/" + userId + "/purchase/autoroot"), 'put', null, (function(h) {
      $('#dashboard').empty().append(h);
      items();
    }));
  }
  function purchaseAutoGrow() {
    var userId = $('#user > p').attr('data-id');
    ajax(("/users/" + userId + "/purchase/autogrow"), 'put', null, (function(h) {
      $('#dashboard').empty().append(h);
      items();
    }));
  }
  function purchaseAutoSeed() {
    var userId = $('#user > p').attr('data-id');
    ajax(("/users/" + userId + "/purchase/autoseed"), 'put', null, (function(h) {
      $('#dashboard').empty().append(h);
      items();
    }));
  }
  function preloadAssets() {
    audioChop = $('<audio>')[0];
    audioChop.src = '/audios/chop.mp3';
    audioBeanStalk = $('<audio>')[0];
    audioBeanStalk.src = '/audios/beanstalk.mp3';
  }
  function sellWood() {
    var userId = $('#user > p').attr('data-id');
    var amount = $('#wood-amount').val();
    ajax(("/users/" + userId + "/sellwood"), 'put', {amount: amount}, (function(h) {
      $('#dashboard').empty().append(h);
    }));
  }
  function chop() {
    audioChop.play();
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(("/trees/" + treeId + "/chop"), 'put', null, (function(h) {
      tree.replaceWith(h);
      dashboard();
    }));
  }
  function grow() {
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(("/trees/" + treeId + "/grow"), 'put', null, (function(h) {
      tree.replaceWith(h);
      if ($(h).hasClass('beanstalk')) {
        audioBeanStalk.play();
      }
    }));
  }
  function forest() {
    $('#possessions').fadeOut('slow');
    $('#forest').fadeIn('slow');
    var userId = $('#user > p').attr('data-id');
    ajax(("/trees?userId=" + userId), 'get', null, (function(h) {
      $('#forest').empty().append(h);
    }));
  }
  function items() {
    var userId = $('#user > p').attr('data-id');
    ajax(("/users/" + userId + "/items"), 'get', null, (function(h) {
      $('#items').empty().append(h);
    }));
  }
  function login() {
    var username = $('#username').val();
    ajax('/login', 'post', {username: username}, (function(h) {
      $('#dashboard').empty().append(h);
      $('#cash').prepend('$');
      $('#username').val('');
      forest();
      items();
    }));
  }
  function plant() {
    var userId = $('#user > p').attr('data-id');
    ajax('/trees/plant', 'post', {userId: userId}, (function(h) {
      $('#forest').append(h);
    }));
  }
})();

//# sourceMappingURL=game.map
