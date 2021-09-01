var productApi = 'http://localhost:3000/product';

function start(){
    getProduct(renderProduct);
    getProduct(uploadProduct);
    // getProduct(uploaddetailProduct);
    handleCreateProducts();
    // handleEditProducts();
}
start();

function getProduct(callback){
    fetch(productApi)
     .then(function(response){
         return response.json();
     })
     .then(callback)
}

function createProduct(data){
    var option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    };
    fetch(productApi, option)
        .then(function(response){
            response.json();
        })
        .then(callback);
}

// function editProduct(updatedata){
//   var option = {
//       method: 'PUT',
//       headers: {
//           'Content-Type': 'application/json'
//         },
//       body: JSON.stringify(updatedata)
//   };
//   fetch(productApi, option)
//       .then(function(response){
//           response.json();
//       })
//       .then(callback);
// }

function renderProduct(products){
    var listProductBlock = document.querySelector("#list-products");
    var htmls = products.map(function(product){
        return `
        <tr>
        <td>${product.productcode}</td>
        <td>${product.name}</td>
        <td>${product.description}</td>
        <td><img src="${product.image}" width="100px" alt=""></td>
        <td>${product.price}/VND</td>
        <td>${product.danhmuc}</td>
        <td>
              <button type="button" class="btn btn-dark btn-sm px-3" data-toggle="modal" data-target="#updateModal">
                <i class="fas fa-edit"></i>
              </button>
              <button onclick="deleteProduct(${product.id})" type="button" class="btn btn-danger">
                <i class="fas fa-trash mr-2"></i>
              </button>
        </td>
        </tr>
        
        `
    })
    listProductBlock.innerHTML = htmls.join('');
}


// function uploaddetailProduct(products){
//     var UpProductBlocks = document.querySelector("#upload-detailproducts");
//     var htmlss = products.map(function(product){
//         return `
//         <div class="row mt-3">
//             <div class="headercontent col">
//                 Trang Sản Phẩm
//               </div>
//         </div>
//         <div class="row mt-3 d-flex justify-content-center">
//             <div class="imagecontent col-md-7">
//               <div class="somepicture">
//                 <img src="/images/sanpham1.jpg">
//                 <img class="imageicon" src="/images/sanpham1.jpg">
//                 <img class="imageicon" src="/images/sanpham1.jpg">
//                 <img class="imageicon" src="/images/sanpham1.jpg">
//               </div>
//               <div class="">
//                 <img src="${product.image}">
//               </div>
//             </div>
//             <div class="info col-md-5">
//                 <h4 class="headerdetail">${product.name}</h4>
//                 <p>Mã sản phẩm: <span>${product.productcode}</span> </p>
//                 <p>Danh mục: <a href='#'>${product.danhmuc}</a></p>
//                 <h4 class="headerdetail">${product.price}<span>.000 ₫ / Sản phẩm</span></h4>
//                 <div class="row text-center">
//                   <p class="col-5"> Số Lượng: </p>
//                   <div class="quantity col-7">
//                     <button class="btn minus1">-</button>
//                     <input class="quantity" id="id_form-0-quantity" min="0" name="form-0-quantity" value="1" type="number">
//                     <button class="btn add1">+</button>
//                   </div>
//                 </div>
//                 <a class="btn btn-primary mt-2" href="payment.html">
//                     <i class="fas fa-shopping-cart"></i>  
//                     Chọn Mua</a>
//             </div>
//         </div>
//         <div class="row mt-3">
//             <div class="headercontent col">Chi Tiết Sản Phẩm</div>
//         </div>
//         <div class="row mt-3">
//             <div class="content col d-flex justify-content-center">
//                 <img src="${product.image}">
//             </div>
//         </div>
//         <div class="row mt-3">
//             <p>${product.description}</p>       
//         </div> 
    
//     </div>
            
//         `
//     })
//     UpProductBlocks.innerHTML = htmlss.join('');
// }


function uploadProduct(products){
  var UpProductBlock = document.querySelector("#upload-products");
  var html = products.map(function(product){
      return `
      <div class="col-md-3 col-6 mt-5 carditem">
            <div class="card">
              <div style="color: #187AAB;">
                <i class="fas fa-eye" style="float: right; padding: 7px;"></i>
                <i class="far fa-heart" style="float: right; padding: 7px;">12</i>
                <a><img src="${product.image}" class="card-img-top" onclick="btndetail(${product.id})" alt="..."></a>
              </div>
            <div class="cbody card-body">
              <p class="card-text nameproduct">${product.name}</p>
              <p class="card-text namedanhmuc">Danh Mục: <span class="danhmuc">${product.danhmuc}</span> </p>
              <h5 class="ctitle card-title"><span class="productprice">${product.price}</span>.000₫ / Sản phẩm</h5>
              <a href="#" class="addcart btn btn-primary">
                <i class="fas fa-shopping-cart"></i>  
                Chọn Mua</a>
            </div>
            </div>
          </div>
          
      `
  })
  UpProductBlock.innerHTML = html.join('');
}

function btndetail(id){
var option = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
      },
    
};
fetch(productApi + '/' + id, option)
    .then(function(response){
        response.json();
        location.replace('detailproduct.html');
    })

//   var api = productApi + '/' + id;

//   getapidetail(renderdetail)

//   function getapidetail(){
//     fetch(api)
//     .then(function(response){
//         response.json();
//     })
//   }

//   function renderdetail(detaulpr){

//     var updetail = document.getElementById('headerdetail');
//     var htmlss = detaulpr.name;
//     updetail.innerHTML = htmlss.join('');
//   }

//   var option = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
// };

  // document.getElementById('headerdetail')
  // .innerText == id;
  
}


 function handleCreateProducts(){
      var createbtn = document.querySelector('#themsanpham');
     
      createbtn.onclick = function() {
         var masanpham = document.querySelector('input[name="masanpham"]').value;
         var tensanpham = document.querySelector('input[name="tensanpham"]').value;
         var motasanpham = document.querySelector('input[name="motasanpham"]').value;
         var anhsanpham = document.querySelector('input[name="anhsanpham"]').value;
         var giasanpham = document.querySelector('input[name="giasanpham"]').value;
         var danhmuc = document.querySelector('select[name="danhmuc"]').value;
         
         var formData = {
            productcode: masanpham,
            name: tensanpham,
            description: motasanpham,
            image:anhsanpham,
            price:giasanpham,
            danhmuc:danhmuc
         }
         
         createProduct(formData)
      }
 };

//  function handleEditProducts(){
//   var updatebtn = document.querySelector('#update');
 
//   updatebtn.onclick = function() {
//      var masp = document.querySelector('input[id="ma-sp"]').value;
//      var tensp = document.querySelector('input[id="ten-sp"]').value;
//      var motasp = document.querySelector('input[id="mo-ta"]').value;
//      var anhsp = document.querySelector('input[id="chon-anh"]').value;
//      var giasp = document.querySelector('input[id="gia-sp"]').value;
     
//      var updateData = {
//         productcode: masp,
//         name: tensp,
//         description: motasp,
//         image:anhsp,
//         price:giasp
//      }
     
//      editProduct(updateData)
//   }
// };

 function deleteProduct(id){
    var option = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
    };
    fetch(productApi + '/' + id, option)
        .then(function(response){
            response.json();
        })

 }