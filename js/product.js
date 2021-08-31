var carditem = document.getElementsByClassName('carditem');
// console.log(carditem);
var filterpall = document.querySelector('.filterpall');
filterpall.addEventListener('click', function pall(){
        for (var i = 0; i < carditem.length; i++){
         carditem[i].style.display = '';
        }
  })
var filterpdomat = document.querySelector('.filterpdomat');
filterpdomat.addEventListener('click', function pall(){
    var danhmuc = document.getElementsByClassName('danhmuc');
     for (var i = 0; i < carditem.length; i++){
        if(danhmuc[i].innerText == "Đồ mát"){
            carditem[i].style.display = '';
        }else{
            carditem[i].style.display = 'none';
        }
     }
})
var filterphopkho = document.querySelector('.filterphopkho');
filterphopkho.addEventListener('click', function pall(){
    var danhmuc = document.getElementsByClassName('danhmuc');
     for (var i = 0; i < carditem.length; i++){
        if(danhmuc[i].innerText == "Đồ hộp-Đồ khô"){
            carditem[i].style.display = '';
        }else{
            carditem[i].style.display = 'none';
        }
     }
})
var filterpchucnang = document.querySelector('.filterpchucnang');
filterpchucnang.addEventListener('click', function pall(){
    var danhmuc = document.getElementsByClassName('danhmuc');
     for (var i = 0; i < carditem.length; i++){
        if(danhmuc[i].innerText == "Thực phẩm chức năng"){
            carditem[i].style.display = '';
        }else{
            carditem[i].style.display = 'none';
        }
     }
})

