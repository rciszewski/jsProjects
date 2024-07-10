const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");
const countDownTitle = document.getElementById("countdown-title");
const countDownContainer = document.getElementById("countdown");
const countDownButtonReset = document.getElementById("countdown-button");
const titleInput = document.getElementById("title");
const timeElements = document.querySelectorAll("span");

let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// set Date input min with today's date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// Population countdown / Complete UI
const updateDOM = (newDate) => {
  countdownActive = setInterval(() => {
    countdownValue = new Date(newDate).getTime();
    const today = new Date().getTime();

    const timeDifference = countdownValue - today;

    const dayCountdown = Math.floor(timeDifference / day);
    const hourCountdown = Math.floor((timeDifference % day) / hour);
    const minuteCountdown = Math.floor((timeDifference % hour) / minute);
    const secondCountdown = Math.floor((timeDifference % minute) / second);

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
    });
  }, second);
};

const updateCountDown = (e) => {
  e.preventDefault();
  const newCountDownTitle = e.srcElement[0].value;
  const newDate = e.srcElement[1].value;

  if (!newCountDownTitle) {
    alert("Please create a title for the countdown.");
    return;
  } else if (!newDate) {
    alert("Please select a date for the countdown.");
    return;
  } else {
    countDownTitle.textContent = newCountDownTitle;
    countDownContainer.removeAttribute("hidden");
    inputContainer.setAttribute("hidden", true);
    titleInput.value = "";
    updateDOM(newDate);
  }
};

const resetCountDown = (e) => {
  inputContainer.removeAttribute("hidden");
  countDownContainer.setAttribute("hidden", true);
  countDownTitle.textContent = "";
  window.clearInterval(countdownActive);
  dateEl.value = "";
};

countdownForm.addEventListener("submit", updateCountDown);
countDownButtonReset.addEventListener("click", resetCountDown);
