import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./routes-nav/NavBar";
import Routes from "./routes-nav/Routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
