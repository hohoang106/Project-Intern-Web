const url = "http://localhost:3000/tagPage"

fetch(url)
  .then(response => response.json())
  .then(tagPage => {
    console.log(tagPage)
    var loadTags = tagPage.map(function (tags) {
      return `
            <div class="col-lg-4 col-md-6 col-ms-12 item_tag">
            <div class="card">
                <div class="card-body p-2 py-3">
                <a class="tag_title text-decoration-none px-2 py-1" href="/homepage/listquestion.html?id=${tags.id}">${tags.tagname[0].tagName}</a>
                <p class="card-text d-flex pt-2">${tags.tagDescription}</p>
                <a href="#" class="result text-decoration-none">128 câu hỏi</a>
                <a href="#" class="answer text-decoration-none">28 câu trả lời</a>
                </div>
            </div>
        </div>
         `;
    }); 
    var tagTitle = loadTags.join('');
    document.querySelector('#TagPages').innerHTML = tagTitle;
  })
