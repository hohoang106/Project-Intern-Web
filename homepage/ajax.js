$('#login-page').click(function(){
  $.ajax({
      type: "GET",
      url: "login.html",
      data: { },
      success: function(data){
          $('#result').html(data);
      }
  });

});
$('#thucdon-page').click(function(){
  $.ajax({
      type: "GET",
      url: "thucdon.html",
      data: { },
      success: function(data){
          $('#result').html(data);
      }
  });

});