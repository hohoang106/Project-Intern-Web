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
  var commentUser = document.querySelector('#list-Comment');
  baidangs.map(function (item) {
    var uid = window.location.search;
    var id = uid.slice(4);
    if (id == item.id) {
        var comments = item.comment;
        listComment="";
        for (i=0; i <comments.length; i++) {
        listComment+= `
      <div class="container question-body">
      <div class="list-question mt-3 mb-3 row">
        <div class="block-vote col-lg-2">
          <div class="">
            <img class="avatar" src="${comments[i].UserImage}" alt="">
          </div>
        </div>
        <div class=" col-lg-10 answer-user py-2">
          <div class="question-header">
            <span class="author-name mr-2">${comments[i].UserName}</span>
            <span class="date">Đã trả lời: <span>${comments[i].dateAnswer}</span></span>
          </div>
          <div class="answer">
            <p>
            ${comments[i].answerOfuser}
            </p>
          </div>
          <div class="d-flex reply_question">
            <div class="vote_reply d-flex align-items-center">
              <div class="arrow-up">
                <i class="fas fa-caret-up fa-2x"></i>
              </div>
              <div class="number-vote">
              ${comments[i].votecomment}
              </div>
              <div class="arrow-down">
                <i class="fas fa-caret-down fa-2x"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        `;
    }
}
  });
  commentUser.innerHTML = listComment;

}





