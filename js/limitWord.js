
let element = document.querySelectorAll(".limit-p");
  for (let i = 0; i < element.length; i++) {
    var gioiHan = element[i].innerText;
    if (gioiHan.length > 75 ){
      gioiHan = gioiHan.substr(0, 75) + '...';
    }
    document.querySelectorAll(".limit-p")[i].innerText = gioiHan;
  }

  let element2 = document.querySelectorAll(".limit-p2");
  for (let j = 0; j < element2.length; j++) {
    var gioiHan2 = element2[j].innerText;
    if (gioiHan2.length > 100 ){
      gioiHan2 = gioiHan2.substr(0, 100) + '...';
    }
    document.querySelectorAll(".limit-p2")[j].innerText = gioiHan2;
  }