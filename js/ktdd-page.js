const url = "http://localhost:3000/kienthucPage"

fetch(url)
  .then(response => response.json())
  .then(kienthucPage => {
    console.log(kienthucPage)
    var loadPages = kienthucPage.map(function (pages) {
      return `<a class="dropdown-item" href="/homepage/ktdd-page.html?id=${pages.id}">${pages.ktdd[0].mota}</a>`;
    }); 
    var pageKtdd = loadPages.join('');
    document.querySelector('#dropdown-menu-ktdd').innerHTML = pageKtdd;
  })
url = "http://localhost:3000/kienthucPage"
var uid = window.location.search;
var id = uid.slice(4);

fetch(url, {
  method: "GET"
})
  .then(response => response.json())
  .then(kienthucPage => {
    
    var ktddDetais = document.querySelector("#first-part-ktdd");
    console.log(ktddDetais);
    var htmls = kienthucPage.map(function(ktddlist){
          var findktdd = ktddlist.id;
          if ( id == findktdd ) { 
          var newktdd= ktddlist.ktdd;
          var uid2 = window.location.search;
          var id2 = uid2.slice(4);        
          for(let i = 0; i < newktdd.length; i++){
          if (newktdd[i].id == id2 ){
            console.log(newktdd[i].id)
            return`<div class="container">
            <div class="row d-lg-flex up-part">
                <div class="image-p">
                    <img src="${newktdd[i].imagePage}" alt="" class="main-img" height="430">
                </div>
                <div class="impor-ktdd text-justify">
                    <h5 class="title-ktdd-me text-uppercase">Tầm quan trọng!</h5>
                    <p class="m-0">${newktdd[i].tqt}</p>
                    <br>
                    <p class="m-0">${newktdd[i].tqt2}</p>
                </div>
            </div`;
          
        }
      }
    }    
    
  });
    // var listTags = htmls.join('');
    ktddDetais.innerHTML = htmls.join('');
  });
