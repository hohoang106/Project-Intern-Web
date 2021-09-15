var PostquestionApi = 'http://localhost:3000/questions';
    function start(){
        getQuestions(rederPostQuest);
        HandleaddQuestion();
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
    function HandleaddQuestion(){
      var runAddbtn = document.querySelector("#add-question");
      runAddbtn.onclick = function(){
        var today = new Date();
        var UserName = document.querySelector('input[name="recipient-name"]').value;
        var TagName = document.querySelector('input[name="recipient-tag"]').value;
        var Noidung = document.querySelector('textarea[name="message-text"]').value;
        var time = today.getHours() + "h " + today.getMinutes() + "m " + today.getSeconds()+'s / '+ today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        // var votes = document.querySelector (=>0).value;
        // var image = document.querySelector ("/images/sanpham6.jpg").value;
        var dataform = {
          username:UserName,
          tagName:TagName,
          questionTitle:Noidung,
          dateTime: time,
          vote:votes=0,
          Que_description: description="Mô tả câu hỏi",
          Userimage: image="/images/profile.png"
        };
        addQuestion(dataform, function(){
          getQuestions(rederPostQuest);
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
      function rederPostQuest(questions) {
        var ListQusesPost = document.querySelector('#myPostQuest');
        var LisstPost = questions.map(function(item){
          return `<div class="list-question py-3 row question_question">
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
                      <a class="title-a text-decoration-none" href="/homepage/chitietPost.html?id=${item.id}"><h4>${item.questionTitle}</h4></a>
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
        });
        ListQusesPost.innerHTML = LisstPost.join('');  
        
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
// first part of element change color
// $(document).ready(function(){
//     $("section").first().css("background-color", "#e0f0f5");
// });

