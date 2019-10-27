import { useState, useEffect, createContext, useContext } from "react";

const serverRendered = (window as any).__PRELOAD_SERVER__;

export interface PrefetchContextInterface {
  promises: {
    [key: string]: () => any;
  };
  preloads: {
    [key: string]: any;
  };
}
export const PrefetchContext = createContext<PrefetchContextInterface | null>(
  null
);
function usePrefetch<T>(
  name: string,
  func: (() => T) | (() => Promise<T>)
): [T | null, any] {
  const [data, setData] = useState<T | null>(
    (serverRendered && serverRendered[name]) || null
  );
  const [error, setError] = useState<any | null>(null);
  const context = useContext(PrefetchContext);

  useEffect(() => {
    if (data) return;
    Promise.resolve(func())
      .then(d => {
        setData(d);
      })
      .catch(e => {
        console.error(e);
        setError(e);
      });
  }, [data, func]);

  if (context) {
    context.promises[name] = func;
  }
  if (context && context.preloads) {
    return [context.preloads[name], null];
  }

  return [data, error];
}

export default usePrefetch;
