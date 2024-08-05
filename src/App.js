import "./App.css";
import WelcomePage from "./components/WelcomePage";
import Modal from "react-modal";

function App() {
  return <WelcomePage />;
}

Modal.setAppElement("#root");

export default App;
