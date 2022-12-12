import { CounterProvider } from "./counter";

const Providers = ({ children }) => {
    return <CounterProvider>{children}</CounterProvider>
};

export default Providers;