var baiDangApi = "http://localhost:3000/baidang";
function start() {
  getBaiDangs(rederBaiDang);
  handleCreateForm()
}
start();
function getBaiDangs(callback) {
  fetch(baiDangApi)
    .then(function (respon) {
      return respon.json();
    })
    .then(callback);
}

function addBaiDangs(data, callback) {
  var option = {
    method: 'POST',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    // headers: {
    //   'Content-Type': 'application/json'
    // },
    body: JSON.stringify(data)
  };
  fetch(baiDangApi, option)
    .then(function (respon) {
      return respon.json();
    })
    .then(callback);

}
function rederBaiDang(baidangs) {
  var listBaiDangs = document.querySelector('#listBaiDang');
  var htmls = baidangs.map(function (baidang) {
    return `
    <tr class="post">
    <td>${baidang.ngayDang}</td>
    <td>${baidang.tieuDe}</td>
    <td>${baidang.noiDung}</td>
    <td><img src="${baidang.hinhAnh}" width="100px" alt=""></td>
    <td>${baidang.tacGia}</td>
    <td>
    <button type="button" class="btn btn-dark btn-sm px-3" data-toggle="modal" data-target="#updateModal">
      <i class="fas fa-edit"></i>
    </button>
    <button onclick="deleteBaiDang(${baidang.id})" type="button" class="btn btn-danger">
    <i class="fas fa-trash mr-2"></i>
  </button>
    </td>
    </tr>
    
    `;
  });
  listBaiDangs.innerHTML = htmls.join('');
 
    $('#contentList').DataTable({
      searching: false,
      bLengthChange: false,
      bFilter: false,
      bInfo: false,
      bAutoWidth: false,
      ordering: false,
      pageLength: 5
    });
}
function handleCreateForm() {
  var btnAdd = document.querySelector('#addBaiDang');
  btnAdd.onclick = function () {
    var ngaydang = document.querySelector('input[name="ngay-dang"]').value;
    var tieude = document.querySelector('input[name="tieu-de"]').value;
    var noidung = document.querySelector('input[name="noi-dung"]').value;
    var hinhanh = document.querySelector('input[name="chon-anh"]');
    var tacgia = document.querySelector('input[name="tac-gia"]').value;

    if (hinhanh.files && hinhanh.files[0]) {
      var reader = new FileReader();
      reader.onload = function(event) {
          var dataUri = event.target.result,
          img = document.createElement("img");
          img.src = dataUri;
          width = img.width;
          height = img.height;
          fileSize = imgFile.files[0].size;
          alert(width);
          alert(height);
          alert(fileSize);
     };
     reader.onerror = function(event) {
         console.error("File could not be read! Code " + event.target.error.code);
     };
     reader.readAsDataURL(imgFile.files[0]);
  }

    var formData = {
      ngayDang: ngaydang,
      tieuDe: tieude,
      noiDung: noidung,
      hinhAnh: hinhanh,
      tacGia: tacgia
    };
    addBaiDangs(formData, function () {
      getBaiDangs(rederBaiDang);
    });
  }
}
// function updateBaiDang(id){
//   var option = {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//   };
//   fetch(baiDangApi + '/' + id, option)
//     .then(function (response) {
//       response.json();
//     })
//     .then(function () {
//       getBaiDangs(rederBaiDang);
//     });

// }


function deleteBaiDang(id) {
  var option = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  fetch(baiDangApi + '/' + id, option)
    .then(function (response) {
      response.json();
    })
    .then(function () {
      getBaiDangs(rederBaiDang);
    });

}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#displayInputImg')
        .attr('src', e.target.result)
        .width(200)
        .height(150);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

