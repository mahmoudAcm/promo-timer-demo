/**
 * @description transforms the time from seconds to this foramt mm:ss
 * @param {number} time 
 */
export const getTime = (time: number) => {
    let minutes: any = Math.floor(time / 60);
    if(minutes < 10) minutes = "0" + minutes;

    let seconds: any = time % 60;
    if(seconds < 10) seconds = "0" + seconds;

    return minutes + ":" + seconds;
};

/**
 * @description create custom event
 * @param {string} eventName 
 * @param {any} eventDict 
 */
export const emitEvent = (eventName: string, payload: any) => {
    const event = new CustomEvent(eventName, { detail: payload });
    document.dispatchEvent(event);
};