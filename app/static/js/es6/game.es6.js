/* jshint unused:false */

(function(){
  'use strict';

  $(document).ready(init);

  function init()
  {
    $('#login').click(login);
    $('#dashboard').on('click', '#plant', plant);
    $('#dashboard').on('click', '#getforest', forest);
    $('#forest').on('click', '.grow', grow);
    $('#forest').on('click', '.chop', chop);
  }

  function chop(){
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(`/trees/${treeId}/chop`, 'put', null, h =>{
      // console.log(r.tree);
      // console.log(r.user);

      tree.replaceWith(h);
      //dashboard();
      //checkClass(treeId);

    });
  }

  function dashboard()
  {
    // var userId = $('#user').attr('data-id');
    //   ajax(`/users/${userId}`, 'get');
      // $('#dashboard').empty().append(h);

  }

  function grow(){
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(`/trees/${treeId}/grow`, 'put', null, h => {
      tree.replaceWith(h);
    //  checkClass(treeId);
    });
  }

  // function checkClass(treeId)
  // {
  //
  //   var tree = $(`.tree[data-id=${treeId}]`);
  //
  //   if($(tree).hasClass('chopped')){
  //     tree.removeClass('seed');
  //     alert('removed');
  //   }
  // }

  function forest()
  {
    var userId = $('#user').attr('data-id');
    ajax(`/trees?userId=${userId}`, 'get', null, h=>{
      $('#forest').empty().append(h);
    });
  }

  function login()
  {
    var username = $('#username').val();
    ajax('/login', 'post', {username:username}, h =>{
      $('#dashboard').empty().append(h);
      $('#cash').prepend('$');
      $('#user').prepend('USER:   ');
    });
  }

  function ajax(url, type, data={}, success=r=>console.log(r), dataType='html')
  {
    $.ajax({url:url, type:type, dataType:dataType, data:data, success:success});
  }

  function plant()
  {
    var userId = $('#user').attr('data-id');  // this is preferred so it doesn't cache the other logged in user
    ajax('/trees/plant', 'post', {userId:userId}, h =>{
      $('#forest').append(h);
    });

  }



})();
