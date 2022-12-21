import React, { useContext, useRef } from "react";
import Hero from "../components/Hero";
import { useHistory } from "react-router-dom";
import axious from 'axios'

// import { loginCall } from "./apiCalls";
// import { AuthContext } from '../context/AuthContext'

export default function Login() {
  const email = useRef();
  const password = useRef();

  // //isFetching - for loading
  // const {
  //   // user,
  //   // isFetching, 
  //   // error, 
  //   dispatch } = useContext(AuthContext)

  let history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    // //Send request to server to login
    // loginCall({ email: email.current.value, password: password.current.value }, dispatch);

    await axious.post("http://localhost:5015/api/auth/login",
      { email: email.current.value, password: password.current.value })
      .then((res) => {
        if (res.status !== 200) {
          window.localStorage.setItem("token", JSON.stringify(res.data));
          history.push("/")
          window.location.reload(false);
        } else {
          alert("Wrong email or password");
        }
      })
  }

  return (
    <Hero hero="roomsHero">
      <div className="auth-wrapper">
        <form onSubmit={handleClick} className="auth-inner">
          <h3>Sign In</h3>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              required
              ref={email}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              required
              ref={password}
            />
          </div>

          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right">
            <a href="/register">Sign Up</a>
          </p>
        </form>
      </div>
    </Hero>
  )
}