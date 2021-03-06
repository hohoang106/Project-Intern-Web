var cartApi = 'http://localhost:3000/managerdanhmuc';

getdanhmuc(render);
getdanhmuc(renderselect);
getdanhmuc(rendernewselect);
handleCreatedanhmuc();

function getdanhmuc(callback){
    fetch(cartApi)
     .then(function(response){
         return response.json();
     })
     .then(callback)
}

// manager create customer cart
function createdanhmuc(data){
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

function handleCreatedanhmuc(){
  var createbtn = document.querySelector('#btndanhmuc');

  createbtn.onclick = function() {
     var inputdanhmuc = document.querySelector('input[name="inputdanhmuc"]').value;
     var formData = {
        namedanhmuc: inputdanhmuc,
     }
     if (inputdanhmuc == "" ){
      alert("Vui lòng nhập thông tin danh mục")
   }else{
        createdanhmuc(formData);
   }
  }
};

//render renderselect danhmuc
function renderselect(products){
    var listBlock = document.querySelector("#inputdanhmucSelect");
    listBlock.innerHTML = products.map(function(product){
        return `
            <option value="${product.namedanhmuc}">${product.namedanhmuc}</option>
        `
    })
  }
function rendernewselect(products){
    var listBlock = document.querySelector("#newinputdanhmucSelect");
    listBlock.innerHTML = products.map(function(product){
        return `
            <option value="${product.namedanhmuc}">${product.namedanhmuc}</option>
        `
    })
  }

//render manager danhmuc
function render(products){
  var listProductBlock = document.querySelector("#list-danhmuc");
  var htmls = products.map(function(product){
      return `
      <tr>
      <td>${product.id}</td>
      <td>${product.namedanhmuc}</td>
      <td><button onclick="deletedanhmuc(${product.id})" type="button" class="btn btn-danger">
      <i class="fas fa-trash mr-2" style="margin:.5rem;"></i>
    </button></td>
    </tr>
      `
  })
  listProductBlock.innerHTML = htmls.join('');
  $('#danhmuc-content').DataTable({
    searching: false,
    bLengthChange: false,
    bFilter: false,
    bInfo: false,
    bAutoWidth: false,
    ordering: false,
    pageLength: 3
  });
}

function deletedanhmuc(id){
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