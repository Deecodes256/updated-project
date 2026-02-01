let futurestodo = [
  { name: 'BTC/USDT', launchdate: '2025-10-28', result: null,futurestradeurl: '',pnl:''},
  { name: 'SOL/USDT', launchdate: '2025-10-24', result:null,futurestradeurl:'',pnl : '' }
];

let futureswins = 0;
let futuresloss = 0;

futuresshowstorage();// Load from localStorage
recalculatefutures();
futuresrendertodo();
showcapital();
totalprofit()

function futuresrendertodo() {
  let futurestodohtml = '';
  futurestodo.forEach((item, i) => {
    const { name, launchdate, result ,futurestradeurl} = item;
    const futureshtml = `
  <div class = "users-class">   
   <div>${name}</div>
      <div>${launchdate}</div>

      <button onclick="futuresmarkwin(${i})"class="win-button">Win</button>
      <button onclick="futuresmarkloss(${i})" class="loss-button">Loss</button>
       <input type="text" name="futurestrade" placeholder="Trading view url" value="${futurestradeurl||''}" oninput = "futurestradelink(${i},this.value)" class = "trade-url">
    ${futurestradeurl? `<p><a href="${futurestradeurl}" target="_blank" class = "url-redirect">View trade</a></p>`:'' } 


 <input type="text" name="" id="" placeholder="pnl for this trade" class="input-pnl"   >
        <button class="save-pnl" onclick="tradepnl(${i})">save</button>
        <span class="pnl-display">${item.pnl || ''}</span>
      <button onclick="sure(${i})">Delete</button>

    </div>`;
    futurestodohtml += futureshtml;
  });

  document.querySelector('.js-project-list').innerHTML = futurestodohtml;
  document.querySelectorAll('.input-pnl').forEach((input,index)=>{
  input.addEventListener('keydown',(e)=>{
    if (e.key === 'Enter'){
      e.preventDefault()
      tradepnl(index)
    }
  })
})

futuresupdate();
}


function tradepnl(index){
const userpnl = document.querySelectorAll('.input-pnl')[index];

 const trimmedpnl = parseFloat(userpnl.value.trim());

 if (isNaN(trimmedpnl)) {alert('Type in a valid pnl in numerals');
return;
 }
futurestodo[index].pnl = trimmedpnl
userpnl.value = '';
futuresstored()
futuresrendertodo()
totalprofit()

}

function totalprofit(){
  let totalpnl = 0
futurestodo.forEach((item)=>
{const  value = parseFloat(item.pnl)

if(!isNaN(value)){totalpnl+= value}
}
)
const displaypnl = document.querySelector('.total-profit-display')
if (totalpnl > 0 ) {displaypnl.innerHTML = `+$${totalpnl}`}
else if(totalpnl < 0){displaypnl.innerHTML = `-$${Math.abs(totalpnl)}`}
else{displaypnl.innerHTML = `$0.00`;
}
}
function futurestradelink(index,futuresurl){
  futurestodo[index].futurestradeurl = futuresurl.trim()
  futuresstored()
  futuresrendertodo()
}
function futuresaddtodo() {
  const futuresinput = document.querySelector('.text-todo');
  const futuresusertext = futuresinput.value.trim();
  const futuresdate = document.querySelector('.duedate-js');
  const futuresduedate = futuresdate.value.trim();

  if (futuresusertext === '' || futuresduedate === '') {
    alert('Type in project name and date');
return;
  }

  futurestodo.push({ name: futuresusertext, launchdate: futuresduedate, result: null,pnl:'' });
  futuresinput.value = '';
  futuresdate.value = '';
recalculatefutures()
  futuresstored();
  futuresrendertodo();
  totalprofit();
  weeklygrowth()
}
const enterinput = document.querySelector('.text-todo');

enterinput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    futuresaddtodo();
  }
});

function futuresstored() {
  localStorage.setItem('futurestodo', JSON.stringify(futurestodo));
  localStorage.setItem('futureswins', futureswins);
  localStorage.setItem('futuresloss', futuresloss);
}

function futuresshowstorage() {
  const futuressavedtodo = localStorage.getItem('futurestodo');
  const futuressavedwins = localStorage.getItem('futureswins');
  const futuressavedloss = localStorage.getItem('futuresloss');

  if (futuressavedtodo) futurestodo = JSON.parse(futuressavedtodo);
  if (futuressavedwins) futureswins = parseInt(futuressavedwins);
  if (futuressavedloss) futuresloss =  parseInt(futuressavedloss);
}
function futuresdeletetodo(i) {
  futurestodo.splice(i, 1);
      recalculatefutures()
        futuresstored();
  futuresrendertodo();
totalprofit();
}
function sure(i){
  const proceed = confirm('Are you sure you want to personally delete this pair from your journal?')
  if (proceed){futuresdeletetodo(i)};
}
function futuresmarkwin(i) {

  futurestodo[i].result = 'wins';
      recalculatefutures()
        futuresstored();
  futuresrendertodo();

}

function futuresmarkloss(i) {
  futurestodo[i].result = 'loss';
recalculatefutures()
        futuresstored();
  futuresrendertodo();
weeklygrowth()
}
function futuresupdate() {
  document.getElementById('wins').textContent = `wins: ${futureswins}`;
  document.getElementById('losses').textContent = `loss: ${futuresloss}`;
}

function futureswinrate() {

  const total = futureswins + futuresloss;
  if (total === 0) return alert('No wins yet');
  const rate = ((futureswins / total) * 100).toFixed(1);
  alert(`Your win rate is ${rate}%, Wins: ${futureswins}, Losses: ${futuresloss}`);
 
}
function recalculatefutures(){
  futureswins = 0
  futuresloss = 0
futurestodo.forEach(item=>{
if (item.result === 'wins')futureswins++
if(item.result ==='loss')futuresloss++

}) 
futuresupdate()
}

function futuresdarkmode() {
  const body = document.querySelector('.futuresbody');
  body.classList.toggle('dark-mode');
   document.querySelectorAll(`a`).forEach((link)=>{
  link.classList.toggle('link-color')
  }) 
}

function balance(){
 
const usercapital = document.querySelector('.input-capital')
const trimmed = usercapital.value.trim();
 if (!trimmed) return;
document.querySelector('.capital-display').innerHTML=`$${trimmed}`; 
 usercapital.value = ''
    localStorage.setItem('trimmed',JSON.stringify(trimmed))
}
const entercapital = document.querySelector('.input-capital');
entercapital.addEventListener('keydown',(e)=>{
if (e.key === 'Enter') {
  e.preventDefault()
  balance()
}


}


)
function showcapital(){
 const savedbalance = localStorage.getItem('trimmed')
 if (savedbalance) {document.querySelector('.capital-display').innerHTML = `$${(JSON.parse(savedbalance))}`
 }
}
