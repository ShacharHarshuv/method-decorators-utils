export type HigherOrderFunction<T extends (...args: any) => any> = (fn: T) => T;

/**
 * @pure
 * */
export function createMethodDecoratorFromHighOrderFn<
  T extends (...args: any) => any
>(highLevelFunction: HigherOrderFunction<T>) {
  // Return a method decorator function that uses the high-level function
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value as T;
    descriptor.value = highLevelFunction(originalMethod);
    return descriptor;
  };
}
