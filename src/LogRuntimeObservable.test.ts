import { LogRuntimeObservable } from "./LogRuntimeObservable";
import { of, delay, take } from "rxjs";

// todo
fdescribe("LogRuntimeObservable", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation();
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should log the execution time of an async method", (done) => {
    class TestClass {
      @LogRuntimeObservable()
      testMethod() {
        return of("result").pipe(delay(10));
      }
    }

    const instance = new TestClass();
    instance
      .testMethod()
      .pipe(take(1))
      .subscribe(() => {
        expect(console.log).toHaveBeenCalledWith("Async method took 10 ms");
        done();
      });

    jest.advanceTimersByTime(10);
  });

  it("should log the execution time of an async method with a custom label", (done) => {
    class TestClass {
      @LogRuntimeObservable((result: string) => `Label for ${result}`)
      testMethod() {
        return of("result").pipe(delay(10));
      }
    }

    const instance = new TestClass();
    instance
      .testMethod()
      .pipe(take(1))
      .subscribe((result) => {
        expect(console.log).toHaveBeenCalledWith("Label for result took 10 ms");
        done();
      });

    jest.advanceTimersByTime(10);
  });

  it("should only log the execution time once even if the observable emits multiple times", (done) => {
    class TestClass {
      @LogRuntimeObservable()
      testMethod() {
        return of("result1", "result2").pipe(delay(10));
      }
    }

    // Let's rewrite with subscribe
    const instance = new TestClass();
    instance.testMethod().subscribe({
      complete: () => {
        expect(console.log).toHaveBeenCalledTimes(1);
        done();
      },
    });
    jest.advanceTimersByTime(10);
  });
});
