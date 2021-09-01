const url = 'http://localhost:3000/thucdon'

fetch(url,{
	method: "GET"
  })
  .then(response => response.json())
  .then(thucdon => {
    var listThucdon = thucdon.map(function (item) {
      return `
          <a href="/homepage/${item.href}" class="col-lg-4 mb-4 hover-items" style="text-decoration: none">
          <div class="p-2 rounded border-items card h-100">
            <img src="${item.img}" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.text}</p>
            </div>
          </div>
        </a> `;
    }); 
    var listThucdons = listThucdon.join('');
    document.querySelector('#thucdon').innerHTML = listThucdons;
  })
  
  
  