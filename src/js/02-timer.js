import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let timerId = null;
let selectedDate = null;
let remainingMs = 0;
let remainingTime = null;

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', '');

flatpickr(document.querySelector('input#datetime-picker'), {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      refs.startBtn.setAttribute('disabled', '');
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.removeAttribute('disabled', '');
    }
  },
});

refs.startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    remainingMs = selectedDate - Date.now();
    remainingTime = convertMs(remainingMs);
    refs.days.textContent = addLeadingZero(remainingTime.days.toString());
    refs.hours.textContent = addLeadingZero(remainingTime.hours.toString());
    refs.minutes.textContent = addLeadingZero(remainingTime.minutes.toString());
    refs.seconds.textContent = addLeadingZero(remainingTime.seconds.toString());
    if (remainingMs <= 1000) {
      clearInterval(timerId);
      refs.startBtn.setAttribute('disabled', '');
    }
  }, 1000);
});

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

function addLeadingZero(value) {
  if (value.length > 2) {
    return value;
  }
  return value.padStart(2, '0');
}
