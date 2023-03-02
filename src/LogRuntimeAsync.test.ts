import { LogRuntimeAsync } from "./LogRuntimeAsync";

describe("MyClass", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("logs the runtime of the decorated async method with a custom label", async () => {
    class MyClass {
      @LogRuntimeAsync("myAsyncMethod")
      async myAsyncMethod() {
        await new Promise((resolve) => setTimeout(resolve, 100)); // simulate some async work
        return "done";
      }
    }

    const myClass = new MyClass();

    jest.spyOn(console, "log").mockImplementation();

    const resultPromise = myClass.myAsyncMethod();
    jest.advanceTimersByTime(100);

    const result = await resultPromise;

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("myAsyncMethod took 100 ms")
    );
    expect(result).toBe("done");
  });

  it("logs the runtime of the decorated async method with a default label", async () => {
    class MyClassWithDefaultLabel {
      @LogRuntimeAsync()
      async myAsyncMethod() {
        await new Promise((resolve) => setTimeout(resolve, 100)); // simulate some async work
        return "done";
      }
    }

    const myClass = new MyClassWithDefaultLabel();

    jest.spyOn(console, "log").mockImplementation();

    const resultPromise = myClass.myAsyncMethod();
    jest.advanceTimersByTime(100);

    const result = await resultPromise;

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("Async method took 100 ms")
    );
    expect(result).toBe("done");
  });
});
