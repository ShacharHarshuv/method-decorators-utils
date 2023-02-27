import { OnCall } from "./OnCall";

describe("OnCall", () => {
  it("should call the callback function before calling the decorated method", () => {
    // Define a callback function that sets a flag when called
    let flag = false;
    const callback = () => {
      flag = true;
    };

    // Define a class with a decorated method
    class TestClass {
      @OnCall(callback)
      testMethod(): void {
        // empty method
      }
    }

    // Create an instance of the class and call the decorated method
    const instance = new TestClass();
    instance.testMethod();

    // Verify that the callback function was called before the method
    expect(flag).toBe(true);
  });

  it("should pass arguments to the decorated method", () => {
    // Define a class with a decorated method that takes an argument
    class TestClass {
      @OnCall(() => {})
      testMethod(arg: number): number {
        return arg * 2;
      }
    }

    // Create an instance of the class and call the decorated method with an argument
    const instance = new TestClass();
    const result = instance.testMethod(3);

    // Verify that the decorated method received the argument and returned the expected result
    expect(result).toBe(6);
  });
});
