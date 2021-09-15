var productApi = 'http://localhost:3000/product';
var cartproductApi = 'http://localhost:3000/cartproduct';

//render detail product page
var uid = window.location.search
var id = uid.slice(4);
fetch(productApi, {
     method: "GET"
    })
  .then(response => response.json())
  .then(products => {
    products.map(function (product) {
    if (id == product.id) {
      document.getElementById('headerdetailpage').innerText = product.name;
      document.getElementById('detailmsp').innerText = product.productcode;
      document.getElementById('detailprice').innerText = product.price;
      document.getElementById('detaildm').innerText = product.danhmuc;
      document.getElementById('detailchitiet').innerText = product.description;
      document.getElementById('addcartdetailpage').setAttribute('onclick', 'btnaddcart('+product.id+')')
      var detailimgpage = document.getElementsByClassName('imgdetail');
      for (var i = 0; i< detailimgpage.length; i++){
        detailimgpage[i].src = product.image;
      }; 
    }
  });
  // lib zoom image
  var options = {
    width: 200,
    height:200,
    zoomWidth: 500,
    zoomPosition : "left",
    offset: {vertical: 20, horizontal: 20},
    scale: 0.7,
    zoomLensStyle : 'opacity: 0.5;background-color: white;'
};
new ImageZoom(document.getElementById("pictureproduct"), options);
})

// start get product 
getProduct(renderProduct);
getProduct(uploadProduct);
getProduct(uploadreviewProduct);
handleCreateProducts();
    // getcartProduct(rendercartproduct);
    // handleEditProducts();

function getProduct(callback){
    fetch(productApi)
     .then(function(response){
         return response.json();
     })
     .then(callback)
}

// render review peoduct(some page)
function uploadreviewProduct(products){
  var UpProductBlock = document.querySelector("#review-products");
  var html = products.map(function(product){
    if(product.danhmuc == "Thực phẩm chức năng"){
      return `
      <div class="col-md-3 col-6 mt-5 carditem" data-price="${product.price}">
            <div class="card">
              <div style="color: #187AAB;">
                <i class="far fa-heart" style="float: right; padding: 7px;">12</i>
                <a href="/homepage/detailproduct.html?id=${product.id}" onclick="btndetailpage(${product.id})"><img src="${product.image}" class="card-img-top" alt="..."></a>
              </div>
            <div class="cbody card-body">
              <p class="card-text nameproduct">${product.name}</p>
              <p class="card-text namedanhmuc">Danh Mục: <span class="danhmuc">${product.danhmuc}</span> </p>
              <h5 class="ctitle card-title"><span class="productprice">${product.price}</span>.000₫ / Sản phẩm</h5>
              <input style="display: none" id="valueproduct" min="0" name="form-0-quantity" value="1" type="number">
              <a class="addcart btn btn-primary" onclick="btnaddcart(${product.id})">
                <i class="fas fa-shopping-cart"></i>  
                Chọn Mua</a>
            </div>
            </div>
          </div>          
      `
  }})
  UpProductBlock.innerHTML = html.join('');
  
}
  
// manager create product
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
     if (masanpham == "" ){
      alert("Vui lòng nhập đầy đủ thông tin")
   }else{
    createProduct(formData)
   }
  }
};

//render manager product page
function renderProduct(products){
  var listProductBlock = document.querySelector("#list-products");
  var htmls = products.map(function(product){
      return `
      <tr>
      <td>${product.productcode}</td>
      <td>${product.name}</td>
      <td>${product.description}</td>
      <td><img src="${product.image}" width="100px" alt=""></td>
      <td><span>${product.price}</span>.000₫ / Sản phẩm</td>
      <td>${product.danhmuc}</td>
      <td>
            <button type="button" class="btn btn-dark btn-sm px-3" data-toggle="modal" data-target="#updateModal">
              <i class="fas fa-edit"></i>
            </button>
            <button onclick="deleteProduct(${product.id})" type="button" class="btn btn-danger">
              <i class="fas fa-trash mr-2" style="margin:.5rem;"></i>
            </button>
      </td>
      </tr>
      
      `
  })
  listProductBlock.innerHTML = htmls.join('');
}

// manager delete product
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
        <td class="font-weight-bold">${product.productcode}</td>
        <td onclick="btndetailMoTa(${product.id})" data-toggle="modal" data-target="#moTaSanPham" style="cursor: pointer;" class="font-weight-bold">${product.name}</td>
        <td class="limit-p" onclick="btndetailMoTa(${product.id})" data-toggle="modal" data-target="#moTaSanPham" style="cursor: pointer;">${product.description}</td>
        <td><img src="${product.image}" width="100px" alt=""></td>
        <td><span>${product.price}</span>.000₫ / Sản phẩm</td>
        <td>${product.danhmuc}</td>
        <td>
              <button class="btn btn-secondary w-100" data-toggle="modal" data-target="#updateModal">
              <i class="fas fa-pen"></i>
              </button>
              <button onclick="deleteProduct(${product.id})"  class="btn btn-danger w-100 mt-1">
                <i class="fas fa-trash"></i>
              </button>
        </td>
        </tr>
        
        `
    })
    listProductBlock.innerHTML = htmls.join('');
    let element = document.querySelectorAll(".limit-p");
    for (let i = 0; i < element.length; i++) {
      var gioiHan = element[i].innerText;
      if (gioiHan.length > 150) {
        gioiHan = gioiHan.substr(0, 150) + '...';
      }
      document.querySelectorAll(".limit-p")[i].innerText = gioiHan;
    }
    $('#content-product').DataTable({
      searching: false,
      bLengthChange: false,
      bFilter: false,
      bInfo: false,
      bAutoWidth: false,
      ordering: false,
      pageLength: 5
    });
}


function btndetailMoTa(id) {
  var option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  fetch(productApi + '/' + id, option)
    .then(function (response) {
      return response.json();
    })
    .then(function (post) {
      var detailBaiDang = document.getElementById('detail-san-pham');
      detailBaiDang.innerHTML = post.description;
    })
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
  // render product page
  var UpProductBlock = document.querySelector("#upload-products");
  var html = products.map(function(product){
      return `
      <div class="col-md-3 col-6 mt-5 carditem" data-price="${product.price}">
            <div class="card">
              <div style="color: #187AAB;">
                <i onclick="btndetail(${product.id})" class="fas fa-eye" data-toggle="modal" data-target="#addProductModal" style="float: right; padding: 7px;  cursor: pointer;"></i>
                <i class="far fa-heart" style="float: right; padding: 7px;">12</i>
                <a href="/homepage/detailproduct.html?id=${product.id}" onclick="btndetailpage(${product.id})"><img src="${product.image}" class="card-img-top" alt="..."></a>
              </div>
            <div class="cbody card-body">
              <p class="card-text nameproduct">${product.name}</p>
              <p class="card-text namedanhmuc">Danh Mục: <span class="danhmuc">${product.danhmuc}</span> </p>
              <h5 class="ctitle card-title"><span class="productprice">${product.price}</span>.000₫ / Sản phẩm</h5>
              <a class="addcart btn btn-primary" onclick="btnaddcart(${product.id})">
                <i class="fas fa-shopping-cart"></i>  
                Chọn Mua</a>
            </div>
            </div>
          </div>          
      `
  })
  UpProductBlock.innerHTML = html.join('');
}

// click to detailproduct modal and render info
function btndetail(id){
var option = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
      },  
};
fetch(productApi + '/' + id, option)
    .then(function(response){
       return response.json();
    })
    .then(function(post){
      var updetailname = document.getElementById('headerdetail');
      var updetailmsp = document.getElementById('detailmsp');
      var updetailprice = document.getElementById('detailprice');
      var updetaildm = document.getElementById('detaildm');
      var updetailimg = document.getElementsByClassName('imgdetail');
      document.getElementById('addcartdetail').setAttribute('onclick', 'btnaddcart('+post.id+')')
      updetailname.innerText = post.name;
      updetailmsp.innerText = post.productcode;
      updetailprice.innerText = post.price;
      updetaildm.innerText = post.danhmuc;
      for (var i = 0; i< updetailimg.length; i++){
        updetailimg[i].src = post.image;
      };  
    })
}

// add new product to cart
function createcart(cartdata){
  fetch(cartproductApi, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
      },  
    body: JSON.stringify(cartdata)
})
.then(function(response){
   return response.json();
})
.then(cartcreate)
}


function btnaddcart(id){
  var option = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
        },  
  };
  fetch(productApi + '/' + id, option)
      .then(function(response){
         return response.json();
      })
      .then(post => {
        var valueproduct = document.getElementById('valueproduct');
        var formData = {
          productcode: post.productcode,
          name: post.name,
          image:post.image,
          price:post.price,
          danhmuc:post.danhmuc,
          soluong: valueproduct.value,
       }
            createcart(formData)
      }) 
    alert('thêm sản phẩm vào giỏ hàng thành công')
  }
