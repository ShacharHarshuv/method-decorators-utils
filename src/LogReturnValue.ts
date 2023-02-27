import { AfterReturn } from "./AfterReturn";

export const LogReturnValue = (label?: string): MethodDecorator =>
  AfterReturn((returnValue: any) => console.log(label, returnValue));
