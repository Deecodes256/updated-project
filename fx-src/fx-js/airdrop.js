let airdropstodo = [
  { name: 'Monad', launchdate: '2025-10-28', result: null,airdropsurl:'' },
  { name: 'Plasma xd', launchdate: '2025-10-24', result: null ,airdropsurl:''}
];

let airdropswins = 0;
let airdropslosses = 0;

airdropsshowstorage(); // Load from localStorage
recalculatedrop()
airdropsrendertodo();

function airdropsrendertodo() {
  
  let airdropstodohtml = '';
  airdropstodo.forEach((item, i) => {
    const { name, launchdate, result,airdropsurl } = item;
    const airdropshtml = `
    <div class = "users-class ">
      <div>${name}</div>
      <div>${launchdate}</div>
     
      <button onclick="airdropsmarkwin(${i})" class="win-button">Win</button>
      <button onclick="airdropsmarkloss(${i})" class ="loss-button">Loss</button>
      <input type="text" placeholder="X link of the project" name="x-link" value="${airdropsurl||''}" oninput="linkairdrop(${i},this.value)" class = "trade-url">
  ${airdropsurl? `<p><a href="${airdropsurl}" class = "url-redirect">View project's X account</a></p>`:''}
      <button onclick="airdropsdeletetodo(${i})">Delete</button>
      </div>
    `;
     /**the div result in the template strings is a short way of writing an if condition,that says if result(win./loss)print win or loss else ? */
    airdropstodohtml += airdropshtml;
  });

  document.querySelector('.js-project-list').innerHTML = airdropstodohtml;
  airdropsupdate();
}
function linkairdrop(index,airdropslink){
airdropstodo[index].airdropsurl = airdropslink.trim();
airdropsstored()
airdropsrendertodo()
}
function airdropsaddtodo() {
  const airdropsinput = document.querySelector('.text-todo');
  const airdropsusertext = airdropsinput.value.trim();
  const airdropsdate = document.querySelector('.duedate-js');
  const airdropsduedate = airdropsdate.value.trim();
  if (airdropsusertext === '' || airdropsduedate === '') {
    alert('Type in project name and date');
    return;
  }

  airdropstodo.push({ name: airdropsusertext, launchdate: airdropsduedate, result: null });
  airdropsinput.value = '';
  airdropsdate.value = '';
  recalculatedrop()
    airdropsrendertodo();
  airdropsstored();

}

function airdropsstored() {
  localStorage.setItem('airdropstodo', JSON.stringify(airdropstodo));
  localStorage.setItem('airdropswins', airdropswins);
  localStorage.setItem('airdropslosses', airdropslosses);
}

function airdropsshowstorage() {
  const airdropssavedtodo = localStorage.getItem('airdropstodo');
  const airdropssavedwins = localStorage.getItem('airdropswins');
  const airdropssavedlosses = localStorage.getItem('airdropslosses');

  if (airdropssavedtodo) airdropstodo = JSON.parse(airdropssavedtodo);
  if (airdropssavedwins) airdropswins = parseInt(airdropssavedwins);
  if (airdropssavedlosses) airdropslosses = parseInt(airdropssavedlosses);
}

function airdropsdeletetodo(i) {
airdropstodo.splice(i, 1);
  recalculatedrop()
  airdropsstored();
airdropsrendertodo();
}
function sure(i){
  const proceed = confirm('Are you sure you want to personally delete this project from your journal?')
  if(proceed){airdropsdeletetodo(i)};
}
function airdropsmarkwin(i) {
  airdropstodo[i].result = 'win'; 
  recalculatedrop()
  airdropsstored();
airdropsrendertodo();
}

function airdropsmarkloss(i) {
  airdropstodo[i].result = 'loss';
    recalculatedrop()
  airdropsstored();
airdropsrendertodo();
 

}

function airdropsupdate() {
  document.getElementById('airdropswins').textContent = `Wins: ${airdropswins}`;
  document.getElementById('airdropslosses').textContent = `Losses: ${airdropslosses}`;
}

function airdropswinrate() {
  airdropsstored();
  const total = airdropswins + airdropslosses;
  if (total === 0) return alert('No wins yet');
  const rate = ((airdropswins / total) * 100).toFixed(1);
  alert(`Your win rate is ${rate}%, Wins: ${airdropswins}, Losses: ${airdropslosses}`);
}
function recalculatedrop(){
  airdropswins = 0
  airdropslosses = 0
  airdropstodo.forEach(item=>{
if(item.result ==='win')airdropswins++
if(item.result ==='loss')airdropslosses++
})
airdropsupdate()
}
function airdropsdarkmode() {
  const body = document.querySelector('.airdropsbody');
  body.classList.toggle('dark-mode');
   document.querySelectorAll(`a`).forEach((link)=>{
  link.classList.toggle('link-color')
  })
 
}