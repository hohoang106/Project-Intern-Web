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
