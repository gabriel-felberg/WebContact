import { CounterProvider, IProviderProps } from "./counter";

const Providers = ({ children }:IProviderProps) => {
    return <CounterProvider>{children}</CounterProvider>
};

export default Providers;