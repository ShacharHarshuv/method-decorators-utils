import { createMethodDecoratorFromHighOrderFn } from "./createMethodDecoratorFromHighOrderFn";

export const LogRuntimeAsync = (label?: string) =>
  createMethodDecoratorFromHighOrderFn(
    (fn: (...args: any[]) => Promise<any>) => {
      return async (...args: any[]) => {
        const start = performance.now();
        const result = await fn(...args);
        const end = performance.now();
        console.log(`${label || "Async method"} took ${end - start} ms`);
        return result;
      };
    }
  );
