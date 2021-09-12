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
          for(let i = 0; i < newTag.length; i++){
          if (newTag[i].id == id2 ){
              var answerUser = newTag[i].answer;
              listAnswer="";
            for(let i = 0; i < answerUser.length; i++){
            listAnswer +=`<div class="container question-body question${index}">
            <div class="list-question mt-3 mb-3 row">
              <div class="block-vote col-2 p-0">
                <div class="">
                  <img class="avatar" src="${answerUser[i].userimage}" alt="">
                </div>
              </div>
              <div class="col-10 answer-user py-2">
                <div class="question-header">
                  <span class="author-name mr-2">${answerUser[i].UserName}</span>
                  <span class="date">Đã trả lời: <span>${answerUser[i].dateAnswer}</span></span>
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
                  <a class="ml-2 reply_answer text-decoration-none" href="#"><i class="px-2 fas fa-reply"></i>phản hồi</a>
                  </div>
                </div>
              </div>
            </div>
          </div> 
          <div class="container">
            <div class="row block-reply" id="list-reply">
              </div>
            </div>`;
            }
        }
      }
    }    
  });
  
  document.querySelector("#answer-question").innerHTML=listAnswer;
    // var listTags = htmls.join('')
  });