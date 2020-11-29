/**
 * @description transforms the time from seconds to this foramt mm:ss
 * @param {number} time 
 */
const getTime = (time) => {
    let minutes = parseInt(time / 60);
    if(minutes < 10) minutes = "0" + minutes;

    let seconds = time % 60;
    if(seconds < 10) seconds = "0" + seconds;

    return minutes + ":" + seconds;
};

/**
 * @description create custom event
 * @param {string} eventName 
 * @param {any} eventDict 
 */
const emitEvent = (eventName, eventDict) => {
    const event = new CustomEvent(eventName, eventDict);
    document.dispatchEvent(event);
};