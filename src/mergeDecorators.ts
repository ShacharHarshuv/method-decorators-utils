/**
 * @pure
 * */
export function mergeDecorators(
  ...decorators: MethodDecorator[]
): MethodDecorator {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): void {
    decorators.forEach((decorator) =>
      decorator(target, propertyKey, descriptor)
    );
  };
}
