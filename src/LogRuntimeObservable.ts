import { createMethodDecoratorFromHighOrderFn } from "./createMethodDecoratorFromHighOrderFn";
import { Observable, tap } from "rxjs";
import { StaticOrGetter, toGetter } from "to-getter";

export const LogRuntimeObservable = <Args extends any[], Result>(
  label?: StaticOrGetter<string, [Result, ...Args]>
) =>
  createMethodDecoratorFromHighOrderFn(
    (fn: (...args: Args) => Observable<Result>) => {
      return function (this: any, ...args: Args) {
        const start = performance.now();
        let emitted = false;
        return fn.call(this, ...args).pipe(
          tap((result: Result) => {
            if (emitted) {
              return;
            }

            emitted = true;
            const end = performance.now();
            console.log(
              `${toGetter(label)(result, ...args) || "Async method"} took ${
                end - start
              } ms`
            );
          })
        );
      };
    }
  );
