export const throttle = (fn: (...args: any[]) => void, delay = 100) => {
  let timer: NodeJS.Timer | null = null;
  return (...args: any) => {
    if (timer) return;
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
};