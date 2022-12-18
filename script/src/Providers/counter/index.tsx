import { createContext, ReactNode, useState } from "react";

interface IContextProps {
  Transform(string: string): Array<string>;
}
export const CounterContext = createContext({} as IContextProps);

export interface IProviderProps {
  children: ReactNode;
}
export const CounterProvider = ({ children }: IProviderProps) => {
  

  function Transform(string: string): string[] {
    let arr: string[] = [];
    string
      ?.split(",")
      ?.map((e: string) =>
        e === "[" || e === "]" || e === " " || e === "," ? null : arr.push(e)
      );
    if (arr.length !== 2) {
      arr.push("");
    }
    return arr;
  }

  return (
    <CounterContext.Provider
      value={{ Transform }}
    >
      {children}
    </CounterContext.Provider>
  );
};
