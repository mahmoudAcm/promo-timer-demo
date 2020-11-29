timerButton.addEventListener('click', () => {
  if(currentTimeInSeconds === -1) {

    if(!audio.paused) {
      audio.pause(); 
    }

    if(timerButton.dataset.current === 'puase') {
      timerButton.innerHTML = playIcon;  
      timerButton.dataset.current = 'play';
    }

    return;
  }

  if(timerButton.dataset.current === 'puase') {
    timerButton.innerHTML = playIcon;
    timerButton.dataset.current = 'play';
    emitEvent('stopTimer');
  } else {
    timerButton.innerHTML = puaseIcon;
    timerButton.dataset.current = 'puase';
    emitEvent('resumeTimer');
  }
});

const askPromot = document.getElementById("ask-promot");
const cancelTimer = document.getElementById("cancel-timer");
const askPromotCountDown = document.getElementById("ask-promot-countDown");
let countDownInterval = null, askPromotTimeout = null;

timerModal.addEventListener('click', () => {
  if(currentTimeInSeconds != -1) {
    askPromot.hidden = undefined;

    if(countDownInterval !== null) clearInterval(countDownInterval);
    if(askPromotTimeout !== null) clearTimeout(askPromotTimeout);

    askPromotCountDown.innerHTML = '5s';
    let countDown = 4;
    
    countDownInterval = setInterval(() => {
      askPromotCountDown.innerHTML = countDown + 's';
      countDown--;    
      if(countDown === 0) clearInterval(countDownInterval);
    }, 1000);

    askPromotTimeout = setTimeout(() => {
      askPromot.hidden = 'true';
    }, 5000);

  } else {
    if(!audio.paused) {
      audio.pause(); 
    }
    $("#staticBackdrop").modal('hide');
  }
});

cancelTimer.addEventListener('click', () => {
  emitEvent('cancel-timer');
});

document.addEventListener('cancel-timer', () => {
  clearTimer();
  if(!audio.paused) {
    audio.pause();
  }
  $("#staticBackdrop").modal('hide');
  askPromot.hidden = 'true';
  time.innerHTML = "00:00";
  loader.style.height = "0%";
});