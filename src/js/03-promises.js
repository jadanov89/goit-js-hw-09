import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('input[name="delay"]'),
  stepInput: document.querySelector('input[name="step"]'),
  amountInput: document.querySelector('input[name="amount"]'),
}

refs.form.addEventListener('submit', formSubmitOn);

function formSubmitOn (e) {
    e.preventDefault();
    let delay = Number(refs.delayInput.value);
    let step = Number(refs.stepInput.value);
    let amount = Number(refs.amountInput.value);

    for (let i = 1; i <= amount; i++) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
  })
  .catch(({ position, delay }) => {
    console.log();
    Notiflix.Notify.success(
        `❌ Rejected promise ${position} in ${delay}ms`
        );
  });
    delay += step;
    }
}

function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
  setTimeout(() => {
    if (shouldResolve) {
       resolve({position, delay})
        } else {
            reject({position, delay})
        }
        }, delay);
    });
}