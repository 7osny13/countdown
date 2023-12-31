const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60 ;
const hour = minute * 60 ;
const day = hour * 24 ;

// set min date at date picker

const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// populate countdown / complete UI

function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now ;
        
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        // hide input
        inputContainer.hidden = true ;

        // show complete if countdown finished
        if(distance < 0 ) {

            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} Finished on ${countdownDate}`;
            completeEl.hidden = false;

        } else {
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;

            completeEl.hidden = true;
            countdownEl.hidden = false;

        }


        
    },second)
}


// take values from form

function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;

    // put title and date in object

    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };

    // setItem to local storage

    localStorage.setItem('countdown' , JSON.stringify(savedCountdown));

    // check for valiud date
    if(countdownDate === ''){
        alert('please select a date');
    } else {
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

function reset() {
    // hide countdown & show input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;

    // stop countdown
    clearInterval(countdownActive);

    // reset title & date
    countdownTitle = '';
    countdownDate = '';

    localStorage.removeItem('countdown');

}

function restorePreviousCountdown() {
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event Listners

countdownForm.addEventListener('submit' , updateCountdown)
countdownBtn.addEventListener('click' , reset);
completeBtn.addEventListener('click' , reset)


restorePreviousCountdown()