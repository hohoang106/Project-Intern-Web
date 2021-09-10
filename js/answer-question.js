url = "http://localhost:3000/tagPage"
var uid = window.location.search;
var id = uid.slice(4);

fetch(url, {
  method: "GET"
})
  .then(response => response.json())
  .then(tagPage => {
    tagPage.map(function(question,index){
          var findTag = question.id;
          if ( id >= findTag ) { 
          var newTag= question.tagname;
          var uid2 = window.location.search;
          var id2 = uid2.slice(4);
          console.log(newTag)
          console.log(id2)
          debugger;        
          // if(findTag==group)
          for(let i = 0; i < newTag.length; i++){
          if (newTag[i].id == id2 ){
              var answerUser = newTag[i].answer;
              listAnswer="";
            for(let i = 0; i < answerUser.length; i++){
            listAnswer +=`<div class="question-body question${index}">
            <div class="list-question mt-3 mb-3 row">
              <div class="block-vote col-xl-2 col-md-2 col-12 ">
                <div class="">
                  <img class="avatar" src="/images/profile.png" alt="">
                </div>
              </div>
              <div class="col-xl-10 col-md-10 col-12">
                <div class="question-header">
                  <span class="author-name mr-2">${answerUser[i].UserName}</span>
                  <span class="date">Đã trả lời:<span>${answerUser[i].dateAnswer}</span></span>
                </div>
                <div class="answer">
                  <p>
                  ${answerUser[i].answerOfuser}
                  </p>
                </div>
                <div class="d-flex reply_question">
                  <div class="vote_reply d-flex align-items-center">
                    <div class="arrow-up">
                      <i class="fas fa-caret-up"></i>
                    </div>
                    <span class="number-vote">
                    ${answerUser[i].voteAnswer}
                    </span>
                    <div class="arrow-down">
                      <i class="fas fa-caret-down"></i>
                    </div>
                  </div>
                  <div class="number-reply">
                  <a class="ml-2 reply_answer text-decoration-none" href="#"><i class="px-2 fas fa-reply"></i>0 phản hồi</a>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
              }
        }
      }
    }    
  });
  document.querySelector("#answer-question").innerHTML=listAnswer;
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

    
    // var listTags = htmls.join('')
  });