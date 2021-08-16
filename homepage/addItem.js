var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readDataContent(){
  let  listItem = {};
  listItem["tieuDe"] = document.getElementById('tieu-de').value;
  listItem["chonAnh"] = document.getElementById('chon-anh').value;
  listItem["noiDung"] = document.getElementById('noi-dung').value;
  return listItem;
}

function insertData(){
  var table = document.getElementsByTagName('tbody')[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.fullName;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.email;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.salary;
}

