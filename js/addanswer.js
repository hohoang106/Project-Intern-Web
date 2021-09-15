var PostquestionApi = 'http://localhost:3000/answers';
    function start(){
        getQuestions(rederPostcmt);
        Handleaddcmt();
    }
    start();
    //post
    function addQuestion(data, callback){
      var options = {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }

      fetch(PostquestionApi, options)
        .then(function(response){
            response.json();
        })
        .then(callback);
    }
    function Handleaddcmt(){
      var runAddbtn = document.querySelector("#add-answer");
      runAddbtn.onclick = function(){
        var today = new Date();
        var Username = document.querySelector('input[name="recipient-name"]').value;
        var Noidung = document.querySelector('textarea[name="message-text"]').value;
        var time = today.getHours() + "h " + today.getMinutes() + "m " + today.getSeconds()+'s / '+ today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        // var votes = document.querySelector (=>0).value;
        // var image = document.querySelector ("/images/sanpham6.jpg").value;
        var dataform = {
          UserName:Username,
          answerOfuser:Noidung,
          dateAnswer: time,
          votecomment:votes=0,
          UserImage: image="/images/profile.png"
        };
        addQuestion(dataform, function(){
          getQuestions(rederPostcmt);
        });
      }

    }
//get
    function getQuestions(callback){
      fetch(PostquestionApi)
      .then (function(response) {
        return response.json();
        })
      .then(callback);
      }
      //duyệt listag == tagname(id = id) => add câu hỏi
      function rederPostcmt(answers) {
        var ListQusesPost = document.querySelector('#answer-Post');
        var LisstPost = answers.map(function(item){
          return `
          <div class="container question-body">
          <div class="list-question mt-3 mb-3 row">
            <div class="block-vote col-2">
              <div class="">
                <img class="avatar" src="${item.UserImage}" alt="">
              </div>
            </div>
            <div class=" col-10 answer-user py-2">
              <div class="question-header">
                <span class="author-name mr-2">${item.UserName}</span>
                <span class="date">Đã trả lời: <span>${item.dateAnswer}</span></span>
              </div>
              <div class="answer">
                <p>
                ${item.answerOfuser}
                </p>
              </div>
              <div class="d-flex reply_question">
                  <div class="vote_reply d-flex align-items-center">
                    <div class="arrow-up">
                      <i class="fas fa-caret-up"></i>
                    </div>
                    <span class="number-vote">
                    ${item.votecomment}
                    </span>
                    <div class="arrow-down">
                      <i class="fas fa-caret-down"></i>
                    </div>
                  </div>
                  <div class="number-reply">
                  <a class="ml-2 reply_answer text-decoration-none" href="#"><i class="px-2 fas fa-reply"></i>phản hồi</a>
                  </div>
                </div>
            </div>
          </div>
        </div>
            `;
        });
        ListQusesPost.innerHTML = LisstPost.join('');  
        }   
// first part of element change color
// $(document).ready(function(){
//     $("section").first().css("background-color", "#e0f0f5");
// });

