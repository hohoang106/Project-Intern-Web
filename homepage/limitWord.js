// function gioiHanText(selector, maxLength) {
//   var element = document.querySelectorAll(selector);
//   for (let i = 0; i < element.length; i++) {
//     console.log(i);
//     let gioiHan = element[i].innerText;
//     console.log(gioiHan);
//     if (gioiHan.length > maxLength) {
//       gioiHan = gioiHan.substr(0, maxLength) + '...';
//     }
//   } 

// }
// document.querySelectorAll('.limit-p').innerText = gioiHanText('.limit-p', 50);
// console.log(document.querySelectorAll('.limit-p')[0].innerText.substr(0,50) + "..."); 
// console.log(gioiHanText('.limit-p', 50));
let element = document.querySelectorAll(".limit-p");
  for (let i = 0; i < element.length; i++) {
    var gioiHan = element[i].innerText;
    if (gioiHan.length > 75 ){
      gioiHan = gioiHan.substr(0, 75) + '...';
    }
    document.querySelectorAll(".limit-p")[i].innerText = gioiHan;
  }