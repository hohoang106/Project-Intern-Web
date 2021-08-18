var selectedRow = null;
loadData();
function onFormSubmit() {
let listItem = readFormData();
  if (selectedRow == null)
     {insertData(listItem);}
  else
     {updateContent(listItem);}
resetForm();
saveData();
}

function readFormData(){
  let  listItem = {};
  listItem["ngayDang"] = document.getElementById('ngay-dang').value = Date(); 
  listItem["tieuDe"] = document.getElementById('tieu-de').value;
  listItem["noiDung"] = document.getElementById('noi-dung').value;
  listItem["chonAnh"] = document.getElementById('chon-anh').value;
  listItem["tacGia"] = document.getElementById('tac-gia').value;
  return listItem;
}

function insertData(data){
  var table = document.getElementById('contentList').getElementsByTagName('tbody')[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.ngayDang;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.tieuDe;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.noiDung;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.chonAnh;
  cell5 = newRow.insertCell(4);
  cell5.innerHTML = data.tacGia;
  cell6 = newRow.insertCell(5);
  cell6.innerHTML = `<button data-toggle="modal" data-target="#updateModal" onClick="onEdit(this)">Edit</button>
  <button onClick="onDelete(this)">Delete</button>`;

}

function resetForm(){
  document.getElementById('ngay-dang').value = "";
  document.getElementById('tieu-de').value = "";
  document.getElementById('noi-dung').value = "";
  document.getElementById('chon-anh').value = "";
  document.getElementById('tac-gia').value = "";
  selectedRow = null;
}

function onEdit(td){
  selectedRow = td.parentElement.parentElement;
  document.getElementById('ngay-dang').value = selectedRow.cells[0].innerHTML;
  document.getElementById('tieu-de').value = selectedRow.cells[1].innerHTML;
  document.getElementById('noi-dung').value = selectedRow.cells[2].innerHTML;
  document.getElementById('chon-anh').value = selectedRow.cells[3].innerHTML;
  document.getElementById('tac-gia').value = selectedRow.cells[4].innerHTML;

}
function updateContent(listItem){
  selectedRow.cells[0].innerHTML = listItem.ngayDang;
  selectedRow.cells[1].innerHTML = listItem.tieuDe;
  selectedRow.cells[2].innerHTML = listItem.noiDung;
  selectedRow.cells[3].innerHTML = listItem.chonAnh;
  selectedRow.cells[4].innerHTML = listItem.tacGia;

}
function onDelete(td) {
  if (confirm('Are you sure to delete this record ?')) {
      row = td.parentElement.parentElement;
      document.getElementById("contentList").deleteRow(row.rowIndex);
      resetForm();
  }
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#displayInputImg')
        .attr('src', e.target.result)
        .width(150)
        .height(200);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function saveData(){
window.localStorage.setItem('ngayDang','tieuDe','noiDung','chonAnh','tacGia',JSON.stringify(listItem));
}
function loadData(){
  if(window.localStorage.hasOwnProperty('listItem')){
    listItem = JSON.parse(window.localStorage.getItem('ngayDang','tieuDe','noiDung','chonAnh','tacGia'));
  }
  else
  {
    listItem = {};
  }
}