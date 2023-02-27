import { OnCall } from "./OnCall";

export const LogArguments = (label?: string): MethodDecorator =>
  OnCall((...args: any[]) => console.log(label, args));
