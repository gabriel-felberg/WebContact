import { ToastContainer } from "react-toastify";
import { Start } from "./routes";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <section>
      <Start />
      <ToastContainer />
    </section>
  );
}

export default App;
