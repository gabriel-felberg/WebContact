import { createContext, useState } from "react";

export const CounterContext = createContext([]);

export const CounterProvider = ({ children }) => {
  const [ response, setResponse ] = useState([]);
  const [ token, setToken ] = useState({});

  function Transform(string) {
    let arr = [];
    string
      ?.split(",")
      ?.map((e) =>
        e === "[" || e === "]" || e === " " || e === ","
          ? null
          : arr.push(e)
      );
    if (arr.length !== 2) {
      arr.push("")
    }
    return arr;
  }

  return (
    <CounterContext.Provider
      value={{
        response,
        setResponse,
        token,
        setToken,
        Transform,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
};
