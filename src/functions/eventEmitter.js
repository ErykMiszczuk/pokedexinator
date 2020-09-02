function eventEmitter(eventName, data = {}, element = window) {
    const customEvent = new CustomEvent(eventName, {detail: data});
    element.dispatchEvent(customEvent)
}

export default eventEmitter;