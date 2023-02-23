import { createMethodDecoratorFromHighOrderFn } from "./createMethodDecoratorFromHighOrderFn";

describe(createMethodDecoratorFromHighOrderFn.name, () => {
  it("should apply the high-level function to the decorated method", () => {
    // Define a high-level function that returns a function that adds 1 to its input
    const highLevelFunction = (originalMethod: Function) => {
      return function (this: any, ...args: any[]) {
        const result = originalMethod.apply(this, args);
        return result + 1;
      };
    };

    const MyDecorator = createMethodDecoratorFromHighOrderFn(highLevelFunction);

    // Define a class with a decorated method
    class TestClass {
      @MyDecorator
      testMethod(num: number): number {
        return num * 2;
      }
    }

    // Create an instance of the class and call the decorated method
    const instance = new TestClass();
    const result = instance.testMethod(3);

    // Verify that the high-level function was applied to the method
    expect(result).toBe(7);
  });
});
