export function AfterReturn<G>(
  callback: (returnValue: G) => void
): MethodDecorator {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): void {
    const childFunction = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const returnedValue = childFunction.apply(this, args);
      if (returnedValue instanceof Promise) {
        return returnedValue.then((value) => {
          callback(value);
          return value;
        });
      }

      callback(returnedValue);
      return returnedValue;
    };
  };
}
