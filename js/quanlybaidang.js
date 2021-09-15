var baiDangApi = "http://localhost:3000/baidang";
function start() {
  getBaiDangs(rederBaiDang);
  handleCreateForm();
  handleUpdate();
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
    <tr class="post ">
    <td>${baidang.ngayDang}</td>
    <td onclick="btndetail(${baidang.id})" class="font-weight-bold" data-toggle="modal" data-target="#baivietModal" style="cursor: pointer;" > ${baidang.tieuDe}</td>
    <td onclick="btndetail(${baidang.id})"  data-toggle="modal" data-target="#baivietModal" style="cursor: pointer;" class="limit-p" > ${baidang.noiDung} </td> 
    <td><img src="${baidang.hinhAnh}" width="100px" alt=""></td>
    <td>${baidang.tacGia}</td>
    <td>
    <button class="btn btn-secondary w-100" onclick="renderUpdateBaiDang(${baidang.id})" data-toggle="modal" data-target="#updateModal">
    <i class="fas fa-pen"></i>
    </button>
    <button onclick="deleteBaiDang(${baidang.id})"  class="btn btn-danger mt-1  w-100">
    <i class="fas fa-trash"></i>
  </button> 
    </td>
    </tr>
    
    `;
  });
  listBaiDangs.innerHTML = htmls.join('');
  let element = document.querySelectorAll(".limit-p");
  for (let i = 0; i < element.length; i++) {
    var gioiHan = element[i].innerText;
    if (gioiHan.length > 150) {
      gioiHan = gioiHan.substr(0, 150) + '...';
    }
    document.querySelectorAll(".limit-p")[i].innerText = gioiHan;
  }


  $('#contentList').DataTable({
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
function handleCreateForm() {
  var btnAdd = document.querySelector('#addBaiDang');
  btnAdd.onclick = function () {
    var ngaydang = document.querySelector('input[name="ngay-dang"]').value;
    var tieude = document.querySelector('input[name="tieu-de"]').value;
    // var noidung = document.querySelector('input[name="noi-dung"]').value;
    var noidung = CKEDITOR.instances.editor1.getData();
    var hinhanh = document.querySelector('input[name="chon-anh"]').value;
    var tacgia = document.querySelector('input[name="tac-gia"]').value;
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


function renderUpdateBaiDang(id){
  var option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  fetch(baiDangApi + '/' + id, option)
    .then(function (response) {
      return response.json();
    })
    .then(function (post) {
      var newNgayDang = document.getElementById('update-ngay-dang');
      var newTieuDe = document.getElementById('update-tieu-de');
      var newNoiDung = document.getElementById('update-noi-dung');
      var newImage = document.getElementById('update-chon-anh');
      var newTacGia = document.getElementById('update-tac-gia');

      newNgayDang.value = post.ngayDang;
      newTieuDe.value = post.tieuDe;
      newNoiDung.innerHTML = post.noiDung;
      newImage.files[0] = post.hinhAnh;
      newTacGia.value = post.tacGia;

    });

}

function handleUpdate() {
  var btnUpdate = document.querySelector('#btn-update-baidang');

  btnUpdate.onclick = function () {
    alert("hello")
    var updatengaydang = document.querySelector('input[name="update-ngay-dang"]').value;
    var updatetieude = document.querySelector('input[name="update-tieu-de"]').value;
    var updatenoidung = document.querySelector('input[name="update-noi-dung"]').value;
    // var updatehinhanh = document.querySelector('input[name="update-chon-anh"]').value;
    var updatetacgia = document.querySelector('input[name="update-tac-gia"]').value;
    var formData2 = {
      ngayDang: updatengaydang,
      tieuDe: updatetieude,
      noiDung: updatenoidung,
      // hinhAnh: updatehinhanh,
      tacGia: updatetacgia
    };
    updateBaiDang(formData2, function (id) {
      var option = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData2)
      };
      fetch(baiDangApi + "/" +id , option)
        .then(function (response) {
           return response.json();
        })
        .then(function () {
          getBaiDangs(rederBaiDang);
        });
    });
  }
}
// function updateBaiDang(data, id ) {
//   var option = {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   };
//   fetch(baiDangApi + '/' + id, option)
//     .then(function (response) {
//       response.json();
//     })
//     .then(function () {
//     });
// }

function btndetail(id) {
  var option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  fetch(baiDangApi + '/' + id, option)
    .then(function (response) {
      return response.json();
    })
    .then(function (post) {
      var detailBaiDang = document.getElementById('detail-bai-dang');
      detailBaiDang.innerHTML = post.noiDung;
    })
}


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



