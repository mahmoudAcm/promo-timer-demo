//adding some defaults behaviors 

document.querySelectorAll('img').forEach((img) => {
    img.setAttribute("draggable", "false");
});

//--------------------------------

const loader = document.getElementById("timer-loader");
const time = document.getElementById("time");
const timerIcon = document.getElementById("timer-icon");
const timerButton = document.getElementById("timer-button");
const timerWrapper = document.getElementById("timer-wrapper");
const timerModal = document.getElementById("timer-modal");
let interval = null, currentTimeInSeconds = 0, activeTimer = null, audio = null;

const puaseIcon = `<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-pause" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
</svg>`;

const playIcon = `<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-play" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
</svg>`;

document.addEventListener('startTimer', (e) => {
    clearTimer();
    audio = new Audio('/assets/records/audioblocks-02_spearfisher_emotional-podcast_title-sequence-shorter_inst_SClsHCkVD_NWM.mp3');
    currentTimeInSeconds = e.detail.time ;

    timerButton.innerHTML = puaseIcon;
    timerButton.dataset.current = 'puase';
    timerIcon.src = activeTimer.icon;
    $("#staticBackdrop").modal('show');

    interval = setInterval(() => {
       time.innerHTML = getTime(currentTimeInSeconds); 
       loader.style.height = (100 - currentTimeInSeconds * 100 / (activeTimer.time)) + '%';
       currentTimeInSeconds--; 
       if(currentTimeInSeconds == -1) {
        emitEvent('timerFinshed');
       }
    }, 1000);
});

const clearTimer = () => {
    if(interval !== null)
    clearInterval(interval);
}

document.addEventListener('timerFinshed', () => {
    clearTimer();
    audio.play();
});

document.addEventListener('stopTimer', () => {
    clearTimer();
});

document.addEventListener('resumeTimer', () => {
    clearTimer();
    emitEvent('startTimer', { detail: { time: currentTimeInSeconds }});
});

timerWrapper.innerHTML = `${
    timers.map((timer) => {
       return (
            `<div data-time='${timer.time * 60}' data-icon='${timer.icon}' class='card item col-md-3 col-lg-3 justify-content-center align-items-center'>
                <img src='${timer.icon}' class='p-3'/>    
                ${timer.time} min
            </div>`
        )
    }).join("")
}`;

document.querySelectorAll('[data-time]').forEach((timer) => {
    timer.addEventListener('click', () => {
        activeTimer = timer.dataset;
        emitEvent('startTimer', { detail: { time: activeTimer.time } });
    });
});