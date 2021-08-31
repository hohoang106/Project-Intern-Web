function getSiblings(el, filter) {
    var siblings = [];
    el = el.parentNode.firstChild;
    do { if (!filter || filter(el)) siblings.push(el); } while (el = el.nextSibling);
    return siblings;
}
function classFilter(el) {
        return el.classList && el.classList.contains('active-vote');
}
function handleVote(type, el) {
    let siblings = getSiblings(el, classFilter);
    
    if (el.classList.contains('active-vote')) {
        el.style.color = "dimgray";
        el.classList.remove('active-vote');
        return -1 * type;
    } else if (siblings.length === 1) {
        el.style.color = "#187AAB";
        siblings[0].style.color = "dimgray";
        siblings[0].classList.remove('active-vote');
        el.classList.add('active-vote');

        return 2 * type;
    } else if (!el.classList.contains('active-vote')) {
        el.style.color = "#187AAB";
        el.classList.add('active-vote');
        return type;
		}
    
    return 0;
}
const up_vote_span = document.getElementsByClassName('arrow-up');
const down_vote_span = document.getElementsByClassName('arrow-down');
const count = document.getElementsByClassName('number-vote');

for (let i = 0; i < count.length; i++) {
  up_vote_span[i].addEventListener('click', function(e) {
      count[i].innerHTML = parseInt(count[i].innerHTML) + handleVote(1, up_vote_span[i]);
  });

  down_vote_span[i].addEventListener('click', function() {
      count[i].innerHTML = parseInt(count[i].innerHTML) + handleVote(-1, down_vote_span[i]);
  });
};

// first part of element change color
$(document).ready(function(){
    $("section").first().css("background-color", "#e0f0f5");
  });
