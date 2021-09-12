<<<<<<< HEAD

$(document).ready(function(){
  var getKey = localStorage.getItem("key");
  var ulDangNhap =  document.getElementById('ul-dangnhap') ;
  var ulLoged = document.getElementById('ul-loged');
  if(getKey=="loged"){
    ulDangNhap.hidden = true;
    ulLoged.hidden = false
  }
  else{
    ulDangNhap.hidden = false;
    ulLoged.hidden = true;
  }
});


function dangXuat(){
  localStorage.clear();
}
=======
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

  
  const up_vote_span = document.getElementsByClassName('arrow-up');
  const down_vote_span = document.getElementsByClassName('arrow-down');
  const count = document.getElementsByClassName('number-vote');

    for (let i = 0; i < count.length; i++) {
    up_vote_span[i].addEventListener('click', function () {
        count[i].innerHTML = parseInt(count[i].innerHTML) + handleVote(1, up_vote_span[i]);
    });

    down_vote_span[i].addEventListener('click', function() {
        count[i].innerHTML = parseInt(count[i].innerHTML) + handleVote(-1, down_vote_span[i]);
    });
    };
    function getSiblings(el, filter) {
      var siblings = [];
      el = el.parentNode.firstChild;
      do { if (!filter || filter(el)) siblings.push(el); } while (el = el.nextSibling);
      return siblings;
    }
    function classFilter(el) {
            return el.classList && el.classList.contains('active-vote');
    }
    function handleVote(type, el) {
        let siblings = getSiblings(el, classFilter);
        
      if (el.classList.contains('active-vote')) {
          el.style.color = "dimgray";
          el.classList.remove('active-vote');
          return -1 * type;
      } else if (siblings.length === 1) {
          el.style.color = "#187AAB";
          siblings[0].style.color = "dimgray";
          siblings[0].classList.remove('active-vote');
          el.classList.add('active-vote');
  
          return 2 * type;
      } else if (!el.classList.contains('active-vote')) {
          el.style.color = "#187AAB";
          el.classList.add('active-vote');
          return type;
      }
      return 0;
      }

}





>>>>>>> 1a0d1dc2460797867e08233ad685c44016bdeb49
