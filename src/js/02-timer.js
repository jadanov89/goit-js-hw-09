// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  buttonStartEl: document.querySelector('button[data-start]'),
  daysValueEl: document.querySelector('span[data-days]'),
  hoursValueEl: document.querySelector('span[data-hours]'),
  minutesValueEl: document.querySelector('span[data-minutes]'),
  secondsValueEl: document.querySelector('span[data-seconds]'),
};

refs.buttonStartEl.addEventListener('click', getSelectedTime);
refs.buttonStartEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};

function onClose(selectedDates) {
  const currentTime = Date.now();
  const ms = selectedDates[0] - currentTime;
  if (ms < 0) {
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    refs.buttonStartEl.removeAttribute('disabled', 'true');
  }
}

flatpickr(refs.inputEl, options);

function getSelectedTime() {
  timerStart();
  refs.buttonStartEl.disabled = true;
}

function timerStart() {
  refs.inputEl.disabled = true;
  const selectedDay = new Date(refs.inputEl.value);
  const selectedTimeMs = selectedDay.getTime();
  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedTimeMs - currentTime;

    if (deltaTime < 0 && deltaTime > -1000) {
      clearInterval(intervalId);
      refs.inputEl.disabled = true;
    } else {
      updateTime(convertMs(deltaTime));
    }
  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, '0');
}
function padDays(value) {
  if (value < 100) {
    return String(value).padStart(2, '0');
  }
  return String(value).padStart(3, '0');
}

function convertMs(time) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = padDays(Math.floor(time / day));
  const hours = pad(Math.floor((time % day) / hour));
  const minutes = pad(Math.floor(((time % day) % hour) / minute));
  const seconds = pad(Math.floor((((time % day) % hour) % minute) / second));

  const getTime = { days, hours, minutes, seconds };
  return getTime;
}

function updateTime({ days, hours, minutes, seconds }) {
  refs.daysValueEl.innerHTML = days;
  refs.hoursValueEl.innerHTML = hours;
  refs.minutesValueEl.innerHTML = minutes;
  refs.secondsValueEl.innerHTML = seconds;
}