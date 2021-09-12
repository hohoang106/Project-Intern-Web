url = "http://localhost:3000/tagPage"
var uid = window.location.search;
var id = uid.slice(4);

fetch(url, {
  method: "GET"
})
  .then(response => response.json())
  .then(tagPage => {
    
    var questionDeatils = document.querySelector("#question_details");
    console.log(questionDeatils);
    var htmls = tagPage.map(function(question){
          var findTag = question.id;
          if ( id >= findTag ) { 
          var newTag= question.tagname;
          var uid2 = window.location.search;
          var id2 = uid2.slice(4);
          console.log(newTag)
          console.log(id2)        
          // if(findTag==group)
          for(let i = 0; i < newTag.length; i++){
          if (newTag[i].id == id2 ){
            console.log(newTag[i].id)
            return`<div class="list-question py-3 row">
              <div class="block-vote col-xl-2 col-md-2 col-12 ">
                <div class="">
                  <img class="avatar" src="${newTag[i].Userimage}" alt="">
                </div>
                <div class="vote d-flex flex-column align-items-center">
                  <div class="arrow-up">
                    <i class="fas fa-caret-up"></i>
                  </div>
                  <div class="number-vote" id="vote-point">
                    ${newTag[i].vote}
                  </div>
                  <div class="arrow-down">
                    <i class="fas fa-caret-down"></i>
                  </div>
                </div>
              </div>
              <div class="col-xl-10 col-md-10 d-flex flex-column justify-content-center">
                <div class="question-header">
                  <span class="author-name mr-2">${newTag[i].username}</span>
                  <span class="date">Đã hỏi: <span>${newTag[i].dateTime}</span></span>
                </div>
                <div class="title-question">
                  <a class="title-a text-decoration-none" href="/chitiet_cauhoi.html?id=${newTag[i].id}"><h4>${newTag[i].questionTitle}</h4></a>

                </div>
                <div class="answer">
                </div>
                <div class="number-answer">
                <a href="#"><i class="fas fa-comment-alt icon-comment"></i></a> </i> <a class="ml-2 numberOfAnswer"> 3 câu trả lời</a>
                </div>
              </div>
            </div>`;
          
        }
      }
    }    
    
  });
    // var listTags = htmls.join('');
    questionDeatils.innerHTML = htmls.join('');
  });