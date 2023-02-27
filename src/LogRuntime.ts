import { AfterReturn } from "./AfterReturn";
import { mergeDecorators } from "./mergeDecorators";
import { OnCall } from "./OnCall";

export const LogRuntime = (label?: string): MethodDecorator =>
  mergeDecorators(
    OnCall(() => console.time(label)),
    AfterReturn(() => console.timeEnd(label))
  );
