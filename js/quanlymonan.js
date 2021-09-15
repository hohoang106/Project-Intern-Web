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
    <button class="btn btn-secondary w-100" onclick="renderUpdateMonAn(${monan.id})" data-toggle="modal" data-target="#updateModal">
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


function renderUpdateMonAn(id) {
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
      var newStep = document.getElementById('update-buoclam');


      newNameFood.value = items.name;
      newImg.value = items.img;
      newVideo.value = items.video;

      listNguyenlieu = "";
      var i;
      var nguyenlieu = items.material
      for (i = 0; i < nguyenlieu.length; i++) {
        stt = i + 1;
        listNguyenlieu += `<div class="d-flex flex-row bd-highlight mb-1">
        <input name="update-nguyenlieu" type="text" class="form-control" id="update-nguyenlieu" value="${nguyenlieu[i].matM}"
          placeholder="Nhập tên nguyên liệu">
        <input name="update-soluong" type="text" class="form-control ml-2" id="update-soluong" value="${nguyenlieu[i].matK}"
          placeholder="Nhập số lượng, cân nặng nếu có">
          <button type="button"  class="btn btn-danger ml-2 mb-1 " data-dismiss=""><i class="fas fa-trash"></i></button>
        </div>`;
      }
      newNguyenLieu.innerHTML = listNguyenlieu

      var step = items.step
      steps = "";
      var i;
      for (i = 0; i < step.length; i++) {
        stt = i + 1;
        steps += `<div class="d-flex flex-row bd-highlight mb-1">
          <input name="update-buoclam" type="text" class="form-control col mb-1" id="${i}" value="${step[i]}" placeholder="Nhập các bước chuẩn bị">
          <button type="button"  class="btn btn-danger ml-2 mb-1 " data-dismiss=""><i class="fas fa-trash"></i></button>
          </div>
          `;
      }
      newStep.innerHTML = steps

      handleUpdate(id)


    });

}

// function handleUpdate() {
//   var btnUpdate = document.querySelector('#btn-update-baidang');

//   btnUpdate.onclick = function () {
//     var updatengaydang = document.querySelector('input[name="update-ngay-dang"]').value;
//     var updatetieude = document.querySelector('input[name="update-tieu-de"]').value;
//     var updatenoidung = document.querySelector('input[name="update-noi-dung"]').value;
//     // var updatehinhanh = document.querySelector('input[name="update-chon-anh"]').value;
//     var updatetacgia = document.querySelector('input[name="update-tac-gia"]').value;
//     var formData2 = {
//       ngayDang: updatengaydang,
//       tieuDe: updatetieude,
//       noiDung: updatenoidung,
//       // hinhAnh: updatehinhanh,
//       tacGia: updatetacgia
//     };
//     updateBaiDang(formData2, function (id) {
//       var option = {
//         method: 'PETCH',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData2)
//       };
//       fetch(baiDangApi + "/" + id, option)
//         .then(function (response) {
//           return response.json();
//         })
//         .then(function () {
//           getBaiDangs(rederBaiDang);
//         });
//     });
//   }
// }

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

$('.add-nguyenlieu').on('click', add_nguyenlieu);
$('.remove-nguyenlieu').on('click', remove_nguyenlieu);

function add_nguyenlieu() {
  var new_nlieu_no = parseInt($('#total_nlieu').val()) + 1;
  var new_input = `<div class="d-flex flex-row bd-highlight mb-1" id="${new_nlieu_no}">
  <input name="nguyenLieu" type="text" class="form-control" id="nguyenLieu"
    placeholder="Nhập tên nguyên liệu">
  <input name="soLuong" type="text" class="form-control ml-2" id="soLuong"
    placeholder="Nhập số lượng, cân nặng nếu có">
</div>`;

  $('#new_nlieu').append(new_input);
  $('#total_nlieu').val(new_nlieu_no);
}

function remove_nguyenlieu() {
  var last_nlieu_no = $('#total_nlieu').val();
  if (last_nlieu_no > 1) {
    $('#' + last_nlieu_no).remove();
    $('#total_nlieu').val(last_nlieu_no - 1);
  }
}

$('.add-step').on('click', add_step);
$('.remove-step').on('click', remove_step);

function add_step() {
  var new_step_no = parseInt($('#total_step').val()) + 1;
  var new_input = `<input name="buoclam" type="text" class="form-control mb-1" id="${new_step_no}" placeholder="Nhập bước chuẩn bị">`;

  $('#new_step').append(new_input);
  $('#total_step').val(new_step_no);
}

function remove_step() {
  var last_step_no = $('#total_step').val();
  if (last_step_no > 1) {
    $('#' + last_step_no).remove();
    $('#total_step').val(last_step_no - 1);
  }
}

