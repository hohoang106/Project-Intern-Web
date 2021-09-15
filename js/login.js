$('#btn-login').click(function (data) {
  // call api
  console.log(data);
  let loginApi = 'http://localhost:3000/account';
  fetch(loginApi)
    .then(function (respon) {
      return respon.json();
    })
    .then(function (data) {

      let username = document.getElementById('username').value;
      let password = document.getElementById('password').value;


      let result = data.filter(obj => {
        return obj.username === username & obj.password === password;
      })
      if (result.length !== 0) {
        alert('Đăng nhập thành công');
        localStorage.setItem("key", "loged");
        location.replace('trangchu.html');
      }
      else {
        alert('Đăng nhập thất bại');
      }
      let result2 = data.filter(obj => {
        return obj.username === username & obj.username === username & obj.role === 'Admin';
      })
      console.log(result2)
      if (result2.length !== 0) {
        location.replace('charts.html');
      }

    });

});