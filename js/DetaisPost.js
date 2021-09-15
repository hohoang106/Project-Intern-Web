var PostquestionApi = 'http://localhost:3000/questions';
    function start(){
        getQuestions(rederPostQuest);
    }
    start();
    function getQuestions(callback){
        fetch(PostquestionApi)
        .then (function(response) {
          return response.json();
          })
        .then(callback);
        }
function rederPostQuest(questions) {

    var ListQusesPost = document.querySelector('#myPostQuest');
    var LisstPost = questions.map(function(item){
    var uid = window.location.search;
    var id = uid.slice(4);
    if (id == item.id) {
      return `<div class="list-question py-3 row">
      <div class="block-vote col-xl-2 col-md-2 col-12 ">
        <div class="">
          <img class="avatar" src="${item.Userimage}" alt="">
        </div>
        <div class="vote d-flex flex-column align-items-center">
          <div class="arrow-up">
            <i class="fas fa-caret-up"></i>
          </div>
          <div class="number-vote" id="vote-point">
            ${item.vote}
          </div>
          <div class="arrow-down">
            <i class="fas fa-caret-down"></i>
          </div>
        </div>
      </div>
      <div class="col-xl-10 col-md-10 col-12">
        <div class="question-header">
          <span class="author-name mr-2">${item.username}</span>
          <span class="date">Đã hỏi: <span>${item.dateTime}</span></span>
        </div>
        <div class="title-question">
          <a class="title-a text-decoration-none" href="/chitiet_cauhoi.html?id=${item.id}"><h4>${item.questionTitle}</h4></a>
        </div>
        <div class="answer">
          <p>
            ${item.Que_description}
          </p>
        </div>
        <div class="number-answer">
        <a href="#"><i class="fas fa-comment-alt icon-comment"></i></a> </i> <a class="ml-2 numberOfAnswer"> 3 câu trả lời</a>
        </div>
      </div>
      </div>

  `;
    }
  });
  ListQusesPost.innerHTML = LisstPost.join(''); 

}





