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
  var listBaiDang = document.querySelector('#myProducts');
  var chiTietBaiDang = baidangs.map(function(item){
    return `
    <div class="col-md-12">
    <div class="bai_dang pb-4">
      <div class="card border-0 post-item" style="width: 100%;">
        <div class="hovereffect float-start  text-center">
          <img class="img-responsive card-img-top img-Post" height="500px" src="${item.hinhAnh}" alt="">
          <div class="overlay d-flex justify-content-center align-items-center p-5">
            <a href="/homepage/chitiet.html?id=${item.id}"
              class="text-decoration-none d-flex justify-content-center align-items-center">
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
          <p class="card-text limit-p">${item.noiDung}</p>
        </div>
      </div>
    </div>
  </div>

    `
  })
  listBaiDang.innerHTML = chiTietBaiDang.join('');
  let element = document.querySelectorAll(".limit-p");
    for (let i = 0; i < element.length; i++) {
      var gioiHan = element[i].innerText;
      if (gioiHan.length > 200 ){
        gioiHan = gioiHan.substr(0, 200) + '...';
      }
      document.querySelectorAll(".limit-p")[i].innerText = gioiHan;
    }
}
