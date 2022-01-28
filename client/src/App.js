import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./routes-nav/NavBar";
import Routes from "./routes-nav/Routes";
import { useState } from "react";
import JoblyApi from "./api/api";

function App() {
  const [token, setToken] = useState(null);

  /** Handles signup.
   *
   * Make sure you await this function and check its return value!
   */
  async function signup(signupData) {
    try {
      const token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (e) {
      return { success: false, errors: e };
    }
  }

  /** Handles login.
   *
   * Make sure you await this function and check its return value!
   */
  async function login(loginData) {
    try {
      const token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (e) {
      return { success: false, errors: e };
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes signup={signup} login={login} />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
