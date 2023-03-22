import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('form'),
  inputDelayEl: document.querySelector('.form input[name="delay"]'),
  inputStepEl: document.querySelector('.form input[name="step"]'),
  inputAmountEl: document.querySelector('.form input[name="amount"]'),
};

refs.formEl.addEventListener('submit', handleFormSubmitBtn);

function handleFormSubmitBtn(event) {
  event.preventDefault();

  for (let i = 0; i < refs.inputAmountEl.value; i += 1) {
    const position = i + 1;
    const delay = Number(refs.inputDelayEl.value) + refs.inputStepEl.value * i;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }

  refs.formEl.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
