import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./routes-nav/NavBar";
import Routes from "./routes-nav/Routes";
import { useState, useEffect } from "react";
import JoblyApi from "./api/api";
import jwt_decode from "jwt-decode";
import UserContext from "./auth/UserContext";
import Loading from "./common/Loading";
import useLocalStorage from "./hooks/useLocalStorage";

/** Jobly application.
 *
 * - infoLoaded: has user data been pulled from API?
 *   (this manages spinner for "loading...")
 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 * App -> Routes
 */

function App() {
  const [token, setToken] = useLocalStorage("auth-token");

  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);

  // re run dependency for token
  useEffect(() => {
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  // Load user info from API when user login and and has a token.
  async function getCurrentUser() {
    if (token) {
      try {
        JoblyApi.token = token;
        let { username } = jwt_decode(token);
        let currentUser = await JoblyApi.getCurrentUser(username);
        setCurrentUser(currentUser);
      } catch (e) {
        console.error("loadUserInfo: problem loading", e);
        setCurrentUser(null);
      }
    }
    setInfoLoaded(true);
  }

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

  /** Handles login. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Handle edit user info */
  async function updateProfile(username, data) {
    try {
      delete data.confirmPassword;
      const user = await JoblyApi.updateUser(username, data);
      setCurrentUser(user);
      return { success: true };
    } catch (e) {
      console.log("er", e);
      return { success: false, errors: e };
    }
  }

  if (!infoLoaded) return <Loading />;

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, updateProfile }}>
          <NavBar logout={logout} />
          <main>
            <Routes signup={signup} login={login} />
          </main>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
