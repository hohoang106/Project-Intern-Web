var monAnApi = "http://localhost:3000/monan";
function start() {
  getMonAns(rederMonAn);
  handleCreateForm();
  handleUpdate();
}
start();
function getMonAns(callback) {
  fetch(monAnApi)
    .then(function (respon) {
      return respon.json();
    })
    .then(callback);
}

function addMonAns(data, callback) {
  var option = {
    method: 'POST',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  fetch(monAnApi, option)
    .then(function (respon) {
      return respon.json();
    })
    .then(callback);

}
function rederMonAn(monans) {
  var listMonAns = document.querySelector('#monan-b');
  var htmls = monans.map(function (monan) {
    listNguyenlieu = "";
    var i;
    var nguyenlieu = monan.material
    for (i = 0; i < nguyenlieu.length; i++) {
      stt = i + 1;
      listNguyenlieu += `<table class="table mb-0">
              <tr>
               <th scope="row">${stt}</th>
               <td>${nguyenlieu[i].matM}</td>
               <td>${nguyenlieu[i].matK}</td>
             </tr>
             </table>`;
    }
    var step = monan.step
    steps = "";
    var i;
    for (i = 0; i < step.length; i++) {
      stt = i + 1;
      steps += `<p><B> Bước ${stt}. </B> ${step[i]}</p>`;
    }
    return `
    <tr class="post">
    <td>${monan.name}</td>
    <td><img src="${monan.img}" width="150px" alt=""</td>
    <td><iframe class="embed-responsive-item" src="${monan.video}" allowfullscreen:></iframe allowfullscreen></iframe></td>
    <td>${listNguyenlieu}</td>
    <td>${steps}</td>
    <td>
    <button class="btn btn-secondary w-100" onclick="renderUpdateBaiDang(${monan.id})" data-toggle="modal" data-target="#updateModal">
    <i class="fas fa-pen"></i>
    </button>
    <button onclick="deleteMonAn(${monan.id})"  class="btn btn-danger mt-1  w-100">
    <i class="fas fa-trash"></i>
    </button> 
    </td>
    </tr>
    `;
  });
  listMonAns.innerHTML = htmls.join('');

  $('#content-food').DataTable({
    // searching: false,
    bLengthChange: false,
    // bFilter: false,
    bInfo: false,
    bAutoWidth: false,
    ordering: false,
    pageLength: 4
  });
}
function handleCreateForm() {
  var btnAdd = document.querySelector('#themmonan');
  btnAdd.onclick = function () {
    var tenmonan = document.querySelector('input[name="tenmonan"]').value;
    var anhmonan = document.querySelector('input[name="anhmonan"]').value;
    var videomonan = document.querySelector('input[name="videomonan"]').value;
    var nguyenlieu = document.querySelector('input[name="nguyenlieu"]').value;
    var buoclam = document.querySelector('input[name="buoclam"]').value;



    var formData = {
      img: anhmonan,
      name: tenmonan,
      video: videomonan,
      material: nguyenlieu,
      step: buoclam
    };
    addMonAns(formData, function () {
      getMonAns(rederMonAn);
    });
  }
}


function renderUpdateBaiDang(id) {
  var option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  fetch(monAnApi + '/' + id, option)
    .then(function (response) {
      return response.json();
    })
    .then(function (items) {
      var newNameFood = document.getElementById('update-tenmonan');
      var newImg = document.getElementById('update-anhmonan');
      var newVideo = document.getElementById('update-videomonan');
      var newNguyenLieu = document.getElementById('update-nguyenlieu');
      var newSoLuong = document.getElementById('update-soluong');
      var newStep = document.getElementById('update-buoclam');


      newNameFood.value = items.name;
      newImg.value = items.img;
      newVideo.value = items.video;
      newNguyenLieu.value = items.material;
      newSoLuong.value = items.material;

      // console.log(newStep)

      var step = items.step
      steps = "";
      var i;
      for (i = 0; i < step.length; i++) {
        stt = i + 1;
        steps += `<div class="d-flex flex-row bd-highlight mb-1">
          <input class="col mb-1" name="update-buoclam" type="text" class="form-control" id="update-buoclam" value="${step[i]}" placeholder="Nhập các bước chuẩn bị">
          <button type="button"  class="btn btn-danger ml-2 mb-1 " data-dismiss=""><i class="fas fa-trash"></i></button>
          </div>
          `;
      }
      newStep.innerHTML = steps
      console.log(step)


      handleUpdate(id)


    });

}

function handleUpdate() {
  var btnUpdate = document.querySelector('#btn-update-baidang');

  btnUpdate.onclick = function () {
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
        method: 'PETCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData2)
      };
      fetch(baiDangApi + "/" + id, option)
        .then(function (response) {
          return response.json();
        })
        .then(function () {
          getBaiDangs(rederBaiDang);
        });
    });
  }
}

function deleteMonAn(id) {
  var option = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  fetch(monAnApi + '/' + id, option)
    .then(function (response) {
      response.json();
    })
    .then(function () {
      getMonAns(rederMonAn);
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

