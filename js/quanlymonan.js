var baiDangApi = "http://localhost:3000/monan";
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
  var listBaiDangs = document.querySelector('#monan-b');
  var htmls = baidangs.map(function (baidang) {
    listNguyenlieu = "";
    var i ;
    var nguyenlieu = baidang.material
    for (i=0; i<nguyenlieu.length; i++) {
      stt = i+1;
      listNguyenlieu += `<table class="table mb-0">
              <tr>
               <th scope="row">${stt}</th>
               <td>${nguyenlieu[i].matM}</td>
               <td>${nguyenlieu[i].matK}</td>
             </tr>
             </table>`;
    }
    var step = baidang.step
    steps = "";
    var i ;
    for (i=0; i<step.length; i++) {
      stt = i+1;
      steps += `<p><B> Bước ${stt}. </B> ${step[i]}</p>`;
    }
    console.log(baidang);
    return `
    <tr class="post">
    <td>${baidang.name}</td>
    <td><img src="${baidang.img}" width="150px" alt=""</td>
    <td><iframe class="embed-responsive-item" src="${baidang.video}" allowfullscreen:></iframe allowfullscreen></iframe></td>
    <td>${listNguyenlieu}</td>
    <td>${steps}</td>
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
 
    $('#content-product').DataTable({
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
  var btnAdd = document.querySelector('#addBaiDang');
  btnAdd.onclick = function () {
    var ngaydang = document.querySelector('input[name="ngay-dang"]').value;
    var tieude = document.querySelector('input[name="tieu-de"]').value;
    var noidung = document.querySelector('input[name="noi-dung"]').value;
    // var data = CKEDITOR.instances.editor1.getData();
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

