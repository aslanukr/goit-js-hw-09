const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

let timerId = null;
refs.stopBtn.setAttribute('disabled', '');

refs.startBtn.addEventListener('click', () => {
  startColorSwitcher(), 1000;
});

refs.stopBtn.addEventListener('click', () => {
  stopColorSwitcher();
});

function startColorSwitcher() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  if (timerId) {
    refs.startBtn.setAttribute('disabled', '');
    refs.stopBtn.removeAttribute('disabled', '');
  }
}

function stopColorSwitcher() {
  clearInterval(timerId);

  if (timerId) {
    refs.stopBtn.setAttribute('disabled', '');
    refs.startBtn.removeAttribute('disabled', '');
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
