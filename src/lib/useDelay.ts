import { useState, useEffect } from 'react';

function useDelay(time: number) {
    const [timeOvered, setTime] = useState(false);
    useEffect(() => {
        const id = setTimeout(() => {
            setTime(true);
        }, time);
        return () => {
            clearInterval(id);
        }
    }, []);
    return timeOvered;
}
export default useDelay;