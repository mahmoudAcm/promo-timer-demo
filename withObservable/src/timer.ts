import { Subscription } from 'rxjs';
class Timer {
    private interval: Subscription;
    private currentTimeInSeconds: number; 
    private activeTimer: { time: number, icon: string };
    private audio:  HTMLAudioElement;
    private promotInterval: Subscription;

    set setInterval(subscription: Subscription) {
        this.interval = subscription;
    }

    set setPromotInterval(subscription: Subscription) {
        this.promotInterval = subscription;
    }
    
    setCurrentTime(Time: number) {
        this.currentTimeInSeconds = Time;
    }

    setActiveTimer(ActiveTimer: { time: number, icon: string }) {
        this.activeTimer = ActiveTimer;
    }

    setAudio(src: string) {
        this.audio = new Audio(src);
    }

    get getInterval() {
        return this.interval;
    }

    get getPromotInterval() {
        return this.promotInterval;
    }

    get getCurrentTime() {
        return this.currentTimeInSeconds;
    }

    get getActiveTimer() {
        return this.activeTimer;
    }

    get getAudio() {
        return this.audio;
    }
}

export default new Timer();