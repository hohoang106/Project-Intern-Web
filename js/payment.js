// search product navbar 
var card = document.getElementsByClassName('carditem')
var vl = document.querySelector('.inputtext');
vl.addEventListener('keyup', function input(){
  var name = document.getElementsByClassName('nameproduct')
  for(var i = 0; i<name.length; i++){
      var c = name[i].innerText;
      if(c.toUpperCase().indexOf(vl.value.toUpperCase())>-1){
          card[i].style.display='';
      }
      else{
          card[i].style.display='none';
      }
  }
});

var cartproductApi = 'http://localhost:3000/cartproduct';

//show products number in cart
function numbercartProduct(){
    fetch(cartproductApi)
          .then(response => response.json())
          .then(cartproducts => {
    var list = cartproducts.map(function (cartproduct) {
            return cartproduct.id
          })
          var number = String(list.length)
          document.getElementById('checkcartnumber').innerText = number
          })
      }
numbercartProduct()

//render product from cart data in cart page
fetch(cartproductApi)
  .then(response => response.json())
  .then(cartproducts => {
    var list = cartproducts.map(function (cartproduct) {
      return `
          <tr>
            <td class="mobilenull masp">
            ${cartproduct.productcode}
            </td>
            <td>
            <div class="row">
                   <div class="col-5"><img src="${cartproduct.image}" class="card-img-top" alt="..."></div>
                  <div class="col-7">
                  <p>${cartproduct.name}</p>
                  </div>
              </div>
            </td>
             <td class="mobilenull"><span class="price">${cartproduct.price}</span>.000đ</td>
            <td>
                <div class="quantity">
                 <button class="btn minus1">-</button>
                <input class="quantity1" id="id_form-0-quantity" min="0" name="form-0-quantity" value="${cartproduct.soluong}" type="number">
                 <button class="btn add1">+</button>
               </div>
            </td>
             <td><span class="totalprice"></span>.000đ</td>
             <td>
              <button onclick="deletecartProduct(${cartproduct.id})" type="button" class="btn btn-danger">
                 <i class="fas fa-trash mr-2" style="margin:.5rem;"></i>
              </button>
            </td>
           </tr>
        `;
    }); 
    var lists = list.join('');
    document.querySelector('#rendercart').innerHTML = lists;

var price = document.getElementsByClassName('price');
var totalprice = document.getElementsByClassName('totalprice');
var value = document.getElementsByClassName('quantity1');
var checktotalprice = document.getElementById('checktotalprice');
var checktotalpricecart = document.getElementById('checktotalpricecart');
var checktotalprice = document.getElementById('checktotalprice');

function tinhtong(){
var num = 0
for(var i = 0; i < price.length; i++){
    totalprice[i].innerText= value[i].value * price[i].innerText; 
    var ttien = parseInt(totalprice[i].innerText);
    num += ttien;
}
checktotalpricecart.innerText = String(num)
checktotalprice.innerText = String(num)
}
tinhtong()
$("input.quantity1").each(function(){
    var $this = $(this),
    qty = $this.parent().find('.btn'),
    d = 1
    $(qty).on('click',function(){
        if ($(this).hasClass('minus1')){  
                d+=-1
            if(d<1){
               alert('Số lượng sản phẩm cần mua tối thiểu là 1')     
            } 
        }else if ($(this).hasClass('add1')){
            d += 1  
        }     
        $this.attr('value',d).val(d)
        tinhtong()
    })
    });
  })

//remove product from cart
  function deletecartProduct(id){
    var option = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
    };
    fetch(cartproductApi + '/' + id, option)
        .then(function(response){
            response.json();
        })
 }

