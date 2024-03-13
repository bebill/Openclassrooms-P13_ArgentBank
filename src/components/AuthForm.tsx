import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as authActions from "../redux/slices/authSlice";
import { login } from "../services/fetchData";

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(authActions.loginStart());

    if (!username || !password) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const token = await login(username, password);
      dispatch(authActions.loginSuccess({ token }));
      navigate("/profile");

      if (rememberMe) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      dispatch(authActions.loginFailure({ error: error.message }));
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (!username && !password && storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (rememberMe) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [rememberMe, username, password]);

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-remember">
        <input
          type="checkbox"
          id="remember-me"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label htmlFor="remember-me">Remember me</label>
      </div>

      <button className="sign-in-button" type="submit">
        Sign In
      </button>
    </form>
  );
};

export default AuthForm;
