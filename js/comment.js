
$(document).ready(function(){
  var getKey = localStorage.getItem("key");
  var ulDangNhap =  document.getElementById('ul-dangnhap') ;
  var ulLoged = document.getElementById('ul-loged');
  if(getKey=="loged"){
    ulDangNhap.hidden = true;
    ulLoged.hidden = false
  }
  else{
    ulDangNhap.hidden = false;
    ulLoged.hidden = true;
  }
});


function dangXuat(){
  localStorage.clear();
}
