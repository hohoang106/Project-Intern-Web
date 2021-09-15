var cartApi = 'http://localhost:3000/managercart';

getProduct(renderProduct);
handleCreateProducts();

function getProduct(callback){
    fetch(cartApi)
     .then(function(response){
         return response.json();
     })
     .then(callback)
}

// manager create customer cart
function createProduct(data){
    var option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    };
    fetch(cartApi, option)
        .then(function(response){
            response.json();
        })
        .then(callback);
}

function handleCreateProducts(){
  var createbtn = document.querySelector('#dathang');

  createbtn.onclick = function() {
     var fullName = document.querySelector('input[name="fullName"]').value;
     var phone = document.querySelector('input[name="phone"]').value;
     var email = document.querySelector('input[name="email"]').value;
     var address = document.querySelector('textarea[name="address"]').value;
     var ghichu = document.querySelector('textarea[name="ghichu"]').value;
     var totalprice = document.getElementById('checktotalprice').innerText;
     
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()+'  '+ today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();;
     
     var formData = {
        fullName: fullName,
        phone: phone,
        email: email,
        address:address,
        ghichu:ghichu,
        totalprice: totalprice,
        datetime: time
     }
     if (fullName == "" || phone == "" || email == "" || address == "" ){
        alert("Vui lòng nhập thông tin đặt hàng!")
     }else{
        alert("Đặt hàng thành công!")
        createProduct(formData);
     }
     
  }
};

//render manager manager cart page
function renderProduct(products){
  var listProductBlock = document.querySelector("#list-cartproducts");
  var htmls = products.map(function(product){
      return `
      <tr>
            <td>${product.datetime}</td>
            <td>${product.fullName}</td>
            <td>${product.phone}</td>
            <td>${product.email}</td>
            <td>${product.totalprice}.000đ</td>
            <td>
            <button class="btn-secondary btn p-2" data-toggle="modal" data-target="#addProductModal">
            <i class="fas fa-plus-circle p-1 text-white"></i>
            <span class="text-white">Chi tiết</span>
          </button>
          <button onclick="deleteitem(${product.id})" type="button" class="btn btn-danger">
              <i class="fas fa-trash mr-2" style="margin:.5rem;"></i>
            </button>
            </td>
          </tr>
      `
  })
  listProductBlock.innerHTML = htmls.join('');
  $('#manageProduct').DataTable({
    // searching: false,
    bLengthChange: false,
    // bFilter: false,
    bInfo: false,
    bAutoWidth: false,
    ordering: false,
    pageLength: 5,
    oLanguage: {
      sSearch: "Tìm kiếm"
    }
  });
}

function deleteitem(id){
    var option = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
    };
    fetch(cartApi + '/' + id, option)
        .then(function(response){
            response.json();
        })
  }