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

  var postDetail = document.querySelector('#chiTietBaiDang');
  var chiTietBaiDangs = baidangs.map(function (item) {
    var uid = window.location.search;
    var id = uid.slice(4);
    if (id == item.id) {
      return `
        <div class="bai_dang pb-4">
        <div class="card border-0 post-item" style="width: 100%;">
            <div class="hovereffect float-start  text-center">
              <img class="img-responsive card-img-top img-Post img-fluid"  src="${item.hinhAnh}" alt="">
                  <div class="overlay d-flex justify-content-center align-items-center p-5">                                           
                        <a href="" style="text-decoration: none;" class="d-flex justify-content-center align-items-center">
                          <i class="fas fa-link"></i></a>
                  </div>
          </div>
            <div class="card-body p-0 pt-4">
            <h2 class="card-title text-uppercase">${item.tieuDe}</h2>
            <div class="d-flex align-items-center text-uppercase">
              <p class="m-0 date-post">Đẵ đăng bởi</p>
              <p class="m-0 time-post">${item.tacGia}</p>
              <p class="m-0 date-post px-3">${item.ngayDang}</p>
              <p class="m-0 view-post">
                <i class="far fa-eye"></i>
                290
              </p>
              <p class=" view-post m-0">
                <i class="far fa-comment-dots"></i>
                2
              </p>
            </div>
            <div class="text-justify">
              <p class="card-text m-0">
              ${item.noiDung}
               </p>
               
            </div>
            </div>
        </div>
    </div>
        `;
    }
  });
  postDetail.innerHTML = chiTietBaiDangs.join('');

}





