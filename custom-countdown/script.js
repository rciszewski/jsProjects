const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countDownTitle = document.getElementById("countdown-title");
const countDownContainer = document.getElementById("countdown");
const countDownButtonReset = document.getElementById("countdown-button");
const titleInput = document.getElementById("title");
const timeElements = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-btn");

let countdownValue = Date;
let countdownActive;
let countdownTitle = "";
let savedCountDown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// set Date input min with today's date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// Population countdown / Complete UI
const updateDOM = (countDownDate) => {
  countdownActive = setInterval(() => {
    countdownValue = new Date(countDownDate).getTime();
    const today = new Date().getTime();

    const timeDifference = countdownValue - today;

    const dayCountdown = Math.floor(timeDifference / day);
    const hourCountdown = Math.floor((timeDifference % day) / hour);
    const minuteCountdown = Math.floor((timeDifference % hour) / minute);
    const secondCountdown = Math.floor((timeDifference % minute) / second);

    if (timeDifference < 0) {
      countDownContainer.setAttribute("hidden", true);
      completeEl.removeAttribute("hidden");
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} finished on ${countDownDate}`;
    } else {
      timeElements.forEach((span, idx) => {
        if (idx === 0) {
          span.textContent = dayCountdown;
        }
        if (idx === 1) {
          span.textContent = hourCountdown;
        }
        if (idx === 2) {
          span.textContent = minuteCountdown;
        }
        if (idx === 3) {
          span.textContent = secondCountdown;
        }
        completeElInfo.hidden = true;
        countDownContainer.hidden = false;
      });
    }
  }, second);
};

const updateCountDown = (e) => {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  const countDownDate = e.srcElement[1].value;
  savedCountDown = {
    title: countdownTitle,
    date: countDownDate,
  };
  localStorage.setItem("countdown", JSON.stringify(savedCountDown));

  if (!countdownTitle) {
    alert("Please create a title for the countdown.");
    return;
  } else if (!countDownDate) {
    alert("Please select a date for the countdown.");
    return;
  } else {
    countDownTitle.textContent = countdownTitle;
    countDownContainer.removeAttribute("hidden");
    inputContainer.setAttribute("hidden", true);
    titleInput.value = "";
    updateDOM(countDownDate);
  }
};

const resetCountDown = (e) => {
  inputContainer.removeAttribute("hidden");
  countDownContainer.setAttribute("hidden", true);
  countDownTitle.textContent = "";
  window.clearInterval(countdownActive);
  dateEl.value = "";
  completeEl.hidden = true;
  localStorage.removeItem("countdown");
};

function restorePreviousCountdown() {
  //get countdown from local storage if available
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountDown = JSON.parse(localStorage.getItem("countdown"));
    countDownTitle.textContent = savedCountDown.title;
    updateDOM(savedCountDown.date);
  }
}

countdownForm.addEventListener("submit", updateCountDown);
countDownButtonReset.addEventListener("click", resetCountDown);
completeBtn.addEventListener("click", resetCountDown);

restorePreviousCountdown();
