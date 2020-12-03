import { fromEvent, interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import './assets/css/index.css';
import { getTime, emitEvent } from './helper';
import Clock from './timer';
//@ts-ignore
import record from './assets/records/audioblocks-02_spearfisher_emotional-podcast_title-sequence-shorter_inst_SClsHCkVD_NWM.mp3';

const timers = [
    { time: 0.1, icon: require('./assets/images/citrus.png')},
    { time: 10, icon: require('./assets/images/mushroom.png') },
    { time: 15, icon: require('./assets/images/finocchio.png') },
    { time: 20, icon: require('./assets/images/asparagus.png') },
    { time: 25, icon: require('./assets/images/tomato.png') },
    { time: 30, icon: require('./assets/images/cucumber.png') },
    { time: 40, icon: require('./assets/images/raspberry.png') },
    { time: 50, icon: require('./assets/images/watermelon.png') },
    { time: 60, icon: require('./assets/images/hazelnut.png') },
];

const loader: any = document.getElementById("timer-loader");
const time: any  = document.getElementById("time");
const timerIcon: any = document.getElementById("timer-icon");
const timerButton: any = document.getElementById("timer-button");
const timerWrapper: any = document.getElementById("timer-wrapper");
const timerModal: any = document.getElementById("timer-modal");
const promot = document.getElementById('ask-promot');
const promotCountDown = document.getElementById('ask-promot-countDown');
const cancelTimer = document.getElementById('cancel-timer');

const puaseIcon = `<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-pause" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
</svg>`;

const playIcon = `<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-play" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
</svg>`;

const interval$ = interval(1000);

const startTimer: Observable<number> = fromEvent<any>(document, 'startTimer')
   .pipe(map(e => e.detail));

const timerFinshed = fromEvent<void>(document, 'timerFinshed');

const initPlayground = (currentTime: number) => {
    time.innerHTML = getTime(currentTime);

    Clock.setCurrentTime(currentTime - 1);
    Clock.setAudio(record);

    timerButton.innerHTML = puaseIcon;
    timerButton.dataset.current = 'puase';
    timerIcon.src = Clock.getActiveTimer.icon;
    //@ts-ignore
    $("#staticBackdrop").modal('show');
};

startTimer.subscribe((currentTime) => {
    initPlayground(Math.max(0, currentTime));
    Clock.setInterval = interval$.subscribe(() => {
        if(Clock.getCurrentTime === 0) {
            emitEvent('timerFinshed', {});
        }
        time.innerHTML = getTime(Clock.getCurrentTime); 
        loader.style.height = (100 - Clock.getCurrentTime * 100 / (Clock.getActiveTimer.time)) + '%';
        Clock.setCurrentTime(Clock.getCurrentTime - 1);
    });
});

timerFinshed.subscribe(() => {
    Clock.getInterval.unsubscribe();
    Clock.getAudio.play();

    ['ended', 'pause'].forEach((eventName) => {
        fromEvent(Clock.getAudio, eventName).subscribe(() => {
            //@ts-ignore
            $("#staticBackdrop").modal('hide');
        });
    });
});

timerWrapper.innerHTML = `${
    timers.map((timer) => {
       return (
            `<div data-time='${timer.time * 60}' data-icon='${timer.icon.default}' class='card item col-md-3 col-lg-3 justify-content-center align-items-center'>
                <img src='${timer.icon.default}' class='p-3'/>    
                ${timer.time} min
            </div>`
        )
    }).join("")
}`;

document.querySelectorAll('[data-time]').forEach((timer: any) => {
    fromEvent<any>(timer, 'click')
        .pipe(map(() => timer.dataset))
        .subscribe(activeTimer => {
            Clock.setActiveTimer(activeTimer);
            emitEvent('startTimer', activeTimer.time);
        });
});

fromEvent<any>(timerButton, 'click').pipe(map(() => timerButton.dataset.current ))
.subscribe(current => {
    if(current === 'puase'){
      Clock.getInterval.unsubscribe();
      timerButton.innerHTML = playIcon;  
      timerButton.dataset.current = 'play';
    } else {
      emitEvent('startTimer', Clock.getCurrentTime);
      timerButton.innerHTML = puaseIcon;
      timerButton.dataset.current = 'puase';
    }
});

fromEvent(timerModal, 'click').subscribe(() => {
    promot.hidden = undefined;

    if(Clock.getPromotInterval) {
        Clock.getPromotInterval.unsubscribe();
    }

    promotCountDown.innerText = '5s';

    Clock.setPromotInterval = interval$.subscribe((val) => {
       promotCountDown.innerText = (4 - val) + 's';
       if(5 - val === 1) {
           Clock.getPromotInterval.unsubscribe();
           promot.hidden = true;
       }
    });
});

fromEvent(cancelTimer, 'click').subscribe(() => {
    emitEvent('timerFinshed', {});
    promot.hidden = true;
    Clock.getAudio.pause();
});