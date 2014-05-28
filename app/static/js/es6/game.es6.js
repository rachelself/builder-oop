/* jshint unused:false */

var audioChop, audioBeanStalk;

function ajax(url, type, data={}, success=r=>console.log(r), dataType='html')  // outside means this fn is global
{
  'use strict';
  $.ajax({url:url, type:type, dataType:dataType, data:data, success:success});
}

function dashboard()
{
  'use strict';
  var userId = $('#user > p').attr('data-id');
    ajax(`/users/${userId}`, 'get', null, h=>{
      $('#dashboard').empty().append(h);
    });
}

(function(){
  'use strict';

  $(document).ready(init);

  function init()
  {
    $('#login').click(login);
    $('#dashboard').on('click', '#plant', plant);
    $('#dashboard').on('click', '#getforest', forest);
    //$('#dashboard').on('click', '#showPossessions', possessions);
    $('#forest').on('click', '.grow', grow);
    $('#forest').on('click', '.chop', chop);
    $('#dashboard').on('click', '#sell', sellWood);
    $('#dashboard').on('click', '.autogrow+.purchase', purchaseAutoGrow);
    $('#dashboard').on('click', '.autoseed+.purchase', purchaseAutoSeed);
    $('#dashboard').on('click', '.autoroot+.purchase', purchaseAutoRoot);

    preloadAssets();
    $('showPossessions').hide();
  }

  // function possessions()
  // {
  //   $('#forest').fadeOut('slow');
  //   $('#possessions').fadeIn('slow');
  //
  //   var userId = $('#user > p').attr('data-id');
  //   ajax(`/users?userId=${userId}`, 'get', null, h=>{
  //
  //     $('#possessions').empty().append(h);
  //
  //   });
  // }

  function purchaseAutoRoot()
  {
    var userId = $('#user > p').attr('data-id');
    ajax(`/users/${userId}/purchase/autoroot`, 'put', null, h=>{

      $('#dashboard').empty().append(h);
      items();

    });
  }

  function purchaseAutoGrow()
  {
    var userId = $('#user > p').attr('data-id');
    ajax(`/users/${userId}/purchase/autogrow`, 'put', null, h=>{

      $('#dashboard').empty().append(h);
      items();

    });
  }

  function purchaseAutoSeed()
  {
    var userId = $('#user > p').attr('data-id');
    ajax(`/users/${userId}/purchase/autoseed`, 'put', null, h=>{

      $('#dashboard').empty().append(h);
      items();

    });
  }

  function preloadAssets()
  {
    audioChop = $('<audio>')[0];
    audioChop.src = '/audios/chop.mp3';
    audioBeanStalk = $('<audio>')[0];
    audioBeanStalk.src = '/audios/beanstalk.mp3';
  }

  function sellWood()
  {
    var userId = $('#user > p').attr('data-id');
    var amount = $('#wood-amount').val();
    ajax(`/users/${userId}/sellwood`, 'put', {amount:amount}, h=>{
      $('#dashboard').empty().append(h);
    });
  }

  function chop(){
    audioChop.play();
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(`/trees/${treeId}/chop`, 'put', null, h => {

      tree.replaceWith(h);
      dashboard();

    });
  }


  function grow(){
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(`/trees/${treeId}/grow`, 'put', null, h => {
      tree.replaceWith(h);
      if($(h).hasClass('beanstalk')){
        audioBeanStalk.play();
      }
    });
  }

  function forest()
  {
    $('#possessions').fadeOut('slow');
    $('#forest').fadeIn('slow');
    var userId = $('#user > p').attr('data-id');
    ajax(`/trees?userId=${userId}`, 'get', null, h=>{
      $('#forest').empty().append(h);
    });
  }

  function items()
  {
    var userId = $('#user > p').attr('data-id');
    ajax(`/users/${userId}/items`, 'get', null, h=>{
      $('#items').empty().append(h);
    });
  }

  function login()
  {
    var username = $('#username').val();
    ajax('/login', 'post', {username:username}, h =>{
      $('#dashboard').empty().append(h);
      $('#cash').prepend('$');
      $('#username').val('');
      forest();
      items();
    });
  }

  function plant()
  {
    var userId = $('#user > p').attr('data-id');  // this is preferred so it doesn't cache the other logged in user
    ajax('/trees/plant', 'post', {userId:userId}, h =>{
      $('#forest').append(h);
    });

  }

})();
