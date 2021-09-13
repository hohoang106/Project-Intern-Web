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
          var findTag = question.id;
          if (id == findTag) {
          var newTag= question.tagname;
          listTag="";
          for (i=0; i <newTag.length; i++) {
            var listLength = newTag.length;
            console.log(listLength);
            listTag += `<div class="list-question py-3 row question${index}">
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
              <div class="col-xl-10 col-md-10 col-12">
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
                <a href="#"><i class="fas fa-comment-alt icon-comment"></i></a> </i> <a class="ml-2 numberOfAnswer"> 3 câu trả lời</a>
                </div>
              </div>
            </div>`;
          }
        }
      });
    // var listTags = htmls.join('');//&group=${findTag}
    document.querySelector("#list-Question").innerHTML = listTag;

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
  });




