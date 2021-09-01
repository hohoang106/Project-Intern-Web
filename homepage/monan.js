const url = "http://localhost:3000/monan"

fetch(url)
  .then(response => response.json())
  .then(monan => {
    console.log(monan)
    var listMonan = monan.map(function (item) {
      return `
          <a href="/homepage/chitietmonan.html?id=${item.id}" class="col-lg-4 mb-4 hover-items text-center" style="text-decoration: none">
          <div class="p-2 rounded border-items card h-100">
            <img src="${item.img}" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
            </div>  
          </div>
        </a>
         `;
    }); 
    var listMonans = listMonan.join('');
    document.querySelector('#monan').innerHTML = listMonans;
  })
