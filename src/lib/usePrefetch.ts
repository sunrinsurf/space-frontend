import { useState, useEffect } from 'react'

const serverRendered = (window as any).__PRELOAD_SERVER__;
export let promises: { [key: string]: () => any } = {};
function usePrefetch<T>(name: string, func: (() => T) | (() => Promise<T>)) {

    const [data, setData] = useState<T | null>((serverRendered && serverRendered[name]) || null);
    const [error, setError] = useState<any | null>(null);

    if (global && (global as any).isSSR) {
        promises[name] = func;
    }
    useEffect(() => {
        if (data) return;
        Promise.resolve(func())
            .then(d => {
                setData(d);
            })
            .catch(e => {
                console.error(e);
                setError(e);
            })
    }, [data, func]);
    if (global && (global as any).ssrPreloads && (global as any).ssrPreloads[name]) {
        return [(global as any).ssrPreloads[name], null];
    }

    return [data, error];
}
export function clearPromises() {
    promises = {};
}
export default usePrefetch;