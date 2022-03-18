import "./LoginRegister.css";
import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";

export default function LoginRegister() {
  let [type, setType] = useState("login");

  return (
    <div className="auth">
      {type === "login" ? <Login /> : <Register />}
      {type === "login" ? (
        <p>
          Haven`t account.{" "}
          <span onClick={() => setType("register")}>Register now</span>
        </p>
      ) : (
        <p>
          Have account. <span onClick={() => setType("login")}>Log in</span>
        </p>
      )}
    </div>
  );
}
