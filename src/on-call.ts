import { createMethodDecoratorFromHighOrderFn } from './create-method-decorator-from-high-order-fn';

export function OnCall(callback: (...args: any[]) => void): MethodDecorator {
  return createMethodDecoratorFromHighOrderFn((childFunction: (...args: any[]) => any) => {
    return function(this: any, ...args: any[]) {
      callback(...args);
      return childFunction.apply(this, args);
    };
  });
}
