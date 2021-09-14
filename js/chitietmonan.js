url = "http://localhost:3000/monan"

var uid = window.location.search

var id = uid.slice(4);

fetch(url, {
  method: "GET"
})
  .then(response => response.json())
  .then(monan => {
    var listmonan = monan.map(function (item) {

      if (id == item.id) {
        var nguyenlieu = item.material
        listNguyenlieu = "";
        var i ;
        // for (i in nguyenlieu) {
        for (i=0; i<nguyenlieu.length; i++) {
          stt = i+1;
          listNguyenlieu += `<tr>
                   <th scope="row">${stt}</th>
                   <td>${nguyenlieu[i].matM}</td>
                   <td>${nguyenlieu[i].matK}</td>
                 </tr>`;
        }
        var step = item.step
        steps = "";
        var i ;
        for (i=0; i<step.length; i++) {
          stt = i+1;
          steps += `<p><B> Bước ${stt}. </B> ${step[i]}</p>`;
        }
        
        linkVid = "" 
        linkVid += `
        <iframe class="embed-responsive-item" src="${item.video}" allowfullscreen:></iframe allowfullscreen></iframe>
        `
        return `
        <div>${item.name}</div>
        `;
      }

    });
    var listmonans = listmonan.join('');
    document.querySelector('#namefood').innerHTML = listmonans;
    document.querySelector("#bangnguyenlieu").innerHTML = listNguyenlieu;
    document.querySelector("#step").innerHTML = steps;
    document.querySelector("#linkvid").innerHTML = linkVid;

  })  





