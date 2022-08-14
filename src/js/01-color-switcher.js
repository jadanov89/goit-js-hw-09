const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
  };

  let timerOn = null;
  refs.startBtn.addEventListener('click', onStartBtnClick);
  refs.stopBtn.addEventListener('click', onStopBtnClick);

  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

   function onStartBtnClick() {
    timerOn = setInterval(() => {
      refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
  }


  function onStopBtnClick () {
    clearInterval(timerOn);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
  }

