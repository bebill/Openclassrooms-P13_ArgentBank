import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as authActions from "../redux/slices/authSlice";
import { apiUrl } from "../redux/utils/url";

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(authActions.loginStart());

    axios
      .post(`${apiUrl}/login`, {
        email: username,
        password,
      })
      .then((response) => {
        dispatch(authActions.loginSuccess({ token: response.data.body.token }));
        navigate("/profile");
      })
      .catch((error) => {
        dispatch(authActions.loginFailure({ error: error.message }));
      });
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>

      <button className="sign-in-button" type="submit">
        Sign In
      </button>
    </form>
  );
};

export default AuthForm;
