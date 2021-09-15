var questionApi = 'http://localhost:3000/ManaQues';

function start(){
    getQuestions(renderQuestion);
}

start();

function getQuestions(callback){
    fetch(questionApi)
    .then (function(response) {
      return response.json();
      })
    .then(callback);
    }
    function renderQuestion(ManaQues){
    var listQuestions=document.querySelector("#listAllQuestion");
    var totalques = ManaQues.map(function (question) {
            return`
            <tr>
            <td>${question.dateTime}</td>
            <td>${question.questionTitle}</td>
            <td><img src="${question.Userimage}" width="100px" alt=""></td>
            <td class="text-center">${question.username}</td>
            <td class="text-center">${question.vote}</td>
            <td class="text-center">${question.tagName}</td>
            <td>
            <button onclick="deleteCauhoi(${question.id})" type="button" class="btn btn-danger">
            <i class="fas fa-trash mr-2"></i>
          </button>
            </td>
          </tr>
         `;
    
    }); 
    listQuestions.innerHTML = totalques.join('');

    $('#contentList').DataTable({
        // searching: false,
        bLengthChange: false,
        // bFilter: false,
        bInfo: false,
        bAutoWidth: false,
        ordering: false,
        pageLength: 5
      });
}

function deleteCauhoi(id) {
    var option = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    fetch(questionApi + '/' + id, option)
      .then(function (response) {
        response.json();
      })
      .then(function () {
        getQuestions(renderQuestion);
      });
  
  }
