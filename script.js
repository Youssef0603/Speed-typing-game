const RANDOM_QUOTE_API = "http://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const qouteInputElement = document.getElementById('quoteInput')
const timer = document.getElementById('timer')

qouteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = qouteInputElement.value.split('')
    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if(character == null){
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        }
        else if(character === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }else{
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })
    if(correct) renderNewQuote()
})

function getRandomQuote ()  {
  return fetch(RANDOM_QUOTE_API)
    .then((response) => response.json())
    .then((data) => data.content);
};

async function renderNewQuote () {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = '';
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  });

  
  qouteInputElement.value = null
    startTimer()

};
let startTime;
function startTimer(){
    timer.innerText = 0
    startTime = new Date()
    setInterval(()=>{
       timer.innerText = getTimerTime()
    },1000)
}

function getTimerTime(){
 return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote();
