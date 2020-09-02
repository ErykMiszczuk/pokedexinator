import { useCallback } from 'react';
import eventEmitter from '../functions/eventEmitter';

function useEventEmitter(eventName, data={}, element = window) {
    const callback = useCallback(() => {
        eventEmitter(eventName, data, element);
    }, [eventName, data, element]);

    return callback;
}

export default useEventEmitter;
