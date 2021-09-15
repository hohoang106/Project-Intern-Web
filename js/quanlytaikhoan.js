var accountsApi = "http://localhost:3000/account";
function start() {
  getAccounts(rederAccounts);
}
start();
function getAccounts(callback) {
  fetch(accountsApi)
    .then(function (respon) {
      return respon.json();
    })
    .then(callback);
}
function rederAccounts(accounts) {
  var listAccounts = document.querySelector('#list-accounts');
  var htmls = accounts.map(function (account) {
    return `
    <tr class="">
    <td>${account.fullName}</td>
    <td> ${account.email}</td>
    <td> ${account.address} </td> 
    <td>${account.phone}</td>
    <td>${account.username}</td>
    <td>${account.role}</td>
    <td>
    <button onclick="deleteAccount(${account.id})" class="btn btn-danger  w-100">
    <i class="fas fa-trash"></i>
  </button> 
    </td>
    </tr>
    
    `;
  });
  listAccounts.innerHTML = htmls.join('');


  $('#contentList').DataTable({
    // searching: false,
    bLengthChange: false,
    // bFilter: false,
    bInfo: false,
    bAutoWidth: false,
    ordering: false,
    pageLength: 5,
    oLanguage: {
      sSearch: "Tìm kiếm"
    }
  });
}

function deleteAccount(id) {
  var option = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  fetch(accountsApi + '/' + id, option)
    .then(function (response) {
      response.json();
    })
    .then(function () {
      getBaiDangs(rederBaiDang);
    });

}