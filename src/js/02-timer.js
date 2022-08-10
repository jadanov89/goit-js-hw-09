// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const refs = {
    inputEl: document.querySelector("#datetime-picker"),
    startButton: document.querySelector("[data-start]"),
    timerEl: document.querySelector(".timer"),
    daysEl: document.querySelector("[data-days]"),
    hoursEl: document.querySelector("[data-hours]"),
    minutesEl: document.querySelector("[data-minutes]"),
    secondsEl: document.querySelector("[data-seconds]"),
}


const countDate = flatpickr("#datetime-picker", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
})


refs.startButton.addEventListener('click', onStartClick)
refs.inputEl.addEventListener('input', onInputClick)


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function pad(value) {
    return String(value).padStart(2, '0')
}


function onInputClick() {
    const today = new Date();
    if (today >= countDate.selectedDates[0]) {
        Notiflix.Notify.failure('Choose the future date, please');
        return 
    }
    refs.startButton.removeAttribute('disabled')
}


function onStartClick() {
    Notiflix.Notify.success('Сountdown has started');
    const intervalId = setInterval(() => {
        const today = new Date();
        const countDowndDifference = countDate.selectedDates[0] - today
        const countDown = convertMs(countDowndDifference)
        refs.daysEl.textContent = pad(countDown.days)
        refs.hoursEl.textContent = pad(countDown.hours)
        refs.minutesEl.textContent = pad(countDown.minutes)
        refs.secondsEl.textContent = pad(countDown.seconds)
    }, 1000)
}