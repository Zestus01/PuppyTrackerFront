import React, { useState, useRef } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../context/GlobalState";
import jwtDecode from "jwt-decode";

const Login = () => {

  const [state, dispatch] = useGlobalState();

  const passRef = useRef(null);
  const userRef = useRef(null);
  let username, password;
  const handleLogin = (e) => {
    e.preventDefault();
    username = userRef.current.value;
    password = passRef.current.value;
    AuthService.login(username, password).then(async (resp) => {
      let data = jwtDecode(resp.access);
      await dispatch({
        currentUserToken: resp.access,
        currentUser: data,
      });
    });
  };

  return (
    <div className="c-form">
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            ref={userRef}
            required
          />
        </div>
        <div>
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            id="pass"
            name="password"
            required
            ref={passRef}
          />
        </div>
        <input type="submit" value="Sign in" />
      </form>
    </div>
  );
};

export default Login;
