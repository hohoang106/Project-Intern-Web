url = "http://localhost:3000/tagPage"
var uid = window.location.search;
var id = uid.slice(4);
console.log(id);

fetch(url, {
  method: "GET"
})
  .then(response => response.json())
  .then(tagPage => {
    tagPage.map(function(question,index){
      debugger;
          var findTag = question.id;
          if (id == findTag) {
          var newTag= question.tagname;
          listTag="";
          for (i=0; i <newTag.length; i++) {
            listTag += `<div class="list-question py-3 px-2 p-0 row question${index} question_question">
              <div class="block-vote col-xl-2 p-0 col-md-2 col-12 ">
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
              <div class="col-xl-10 col-md-10 p-0 col-12 Point-question">
                <div class="question-header">
                  <span class="author-name mr-2">${newTag[i].username}</span>
                  <span class="date">Đã hỏi: <span>${newTag[i].dateTime}</span></span>
                </div>
                <div class="title-question">
                  <a class="title-a text-decoration-none" href="/homepage/chitiet_cauhoi.html?id=${newTag[i].id}"><h4>${newTag[i].questionTitle}</h4></a>
                </div>
                <div class="answer">
                  <p>
                    ${newTag[i].Que_description}
                  </p>
                </div>
                <div class="number-answer">
                <a class="text-decoration-none" href="/homepage/chitiet_cauhoi.html?id=${newTag[i].id}" class="ml-2"><span class=" numberOfAnswer ">3 câu trả lời</span></a>
                </div>
              </div>
            </div>`;
          }
        }
      });
    // var listTags = htmls.join('');//&group=${findTag}
    document.querySelector("#list-Question").innerHTML = listTag;
  });




