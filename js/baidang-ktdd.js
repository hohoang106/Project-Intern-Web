var baiDangApi = "http://localhost:3000/baidang";
function start() {
  getBaiDangs(rederBaiDang);
}
start();
function getBaiDangs(callback) {
  fetch(baiDangApi)
    .then(function (respon) {
      return respon.json();
    })
    .then(callback);
}

function rederBaiDang(baidangs) {
  var listBaiDang = document.querySelector('#loadbaidang');
  var chiTietBaiDang = baidangs.map(function(item){
    return `<div class="items col-12">
    <div class="bai_dang border-0 pb-4">
      <div class="card border-0 post-item">
        <div class="hovereffect float-start  text-center">
          <img class="img-responsive card-img-top img-Post-item" src="${item.hinhAnh}">
          <div class="overlay d-flex justify-content-center align-items-center p-5">
            <a href="/homepage/chitiet.html?id=${item.id}" style="text-decoration: none;"
              class="d-flex justify-content-center align-items-center">
              <i class="fas fa-link"></i></a>
          </div>
        </div>
        <div class="card-body p-0 pt-4">
          <h5 class="card-title text-uppercase">${item.tieuDe}</h5>
          <div class="d-flex align-items-center text-uppercase">
            <p class="m-0 date-post">Đẵ đăng</p>
            <p class="m-0 time-post">${item.ngayDang}</p>
            <p class="m-0 view-post">
              <i class="far fa-eye"></i>
              290
            </p>
            <p class=" view-post m-0">
              <i class="far fa-comment-dots"></i>
              2
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
    `
  })
  listBaiDang.innerHTML = chiTietBaiDang.join('');
}
