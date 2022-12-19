import { ToastContainer } from "react-toastify";
import { Start } from "./routes";
import "react-toastify/dist/ReactToastify.min.css";
import Modal from 'react-modal';

Modal.setAppElement('#root')

function App() {
  return (
    <section>
      <Start />
      <ToastContainer />
    </section>
  );
}

export default App;
