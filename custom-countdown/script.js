const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker')

// set Date input min with today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today)

console.log(today)

const datePickerFunction = (e) => {
  console.log(e.target.value)
} 

dateEl.addEventListener('change', datePickerFunction)

