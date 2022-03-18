import React, { useEffect, useState } from "react";
import { loginFirebase, updateState } from "../api/auth";

function Login() {
  let classInput = ["auth__register-login", "auth-input"];

  let [login, setLogin] = useState({ value: "", error: [] });
  let [password, setPassword] = useState({ value: "", error: [] });
  let [seePassword, setSeePassword] = useState(false);

  let [valid, setValid] = useState(false);

  useEffect(() => {
    let firstBool = login.error.length === 0 && password.error.length === 0;
    let secondBool = login.value.length > 0 && password.value.length > 0;
    if (firstBool && secondBool) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [login, password]);

  function submit() {
    loginFirebase({ login: login.value, password: password.value });
  }

  return (
    <div className="auth__login auth">
      <div className="auth-title">
        <h1>Log in</h1>
      </div>
      <div
        className={`${classInput.join(" ")} ${
          login.error.length > 0 ? "error-input" : ""
        }`}
      >
        <p>Login:</p>
        <input
          type="text"
          value={login.value}
          onChange={(e) =>
            updateState(e.target.value, login, setLogin, "login")
          }
          placeholder="Your login"
        />
        <div className="login-error error">
          {login.error.map((elem, index) => {
            return (
              <div key={index}>
                <span>*{elem}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="auth__login-password auth-input">
        <p>Password:</p>
        <div className="auth-seePassword">
          <input
            type={seePassword ? "text" : "password"}
            value={password.value}
            onChange={(e) =>
              updateState(e.target.value, password, setPassword, "password")
            }
            placeholder="password"
          />
          {seePassword ? (
            <div className="watch-password">
              <img
                onClick={() => setSeePassword(false)}
                src="https://img.icons8.com/ios/452/closed-eye.png"
                alt="img"
              />
            </div>
          ) : (
            <div className="watch-password">
              <img
                onClick={() => setSeePassword(true)}
                src="https://cdn-icons-png.flaticon.com/512/64/64875.png"
                alt="img"
              />
            </div>
          )}
        </div>
        <div className="password-error error">
          {password.error.map((elem, index) => {
            return (
              <div key={index}>
                <span>*{elem}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="auth__login-submit auth-submit">
        <button disabled={!valid} onClick={submit}>
          Done
        </button>
      </div>
    </div>
  );
}

export default Login;
