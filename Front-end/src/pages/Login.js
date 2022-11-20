import React, { useContext, useRef } from "react";
import Hero from "../components/Hero";
import { loginCall } from "./apiCalls";
import { AuthContext } from '../context/AuthContext'
import { useHistory } from "react-router-dom";
import axious from 'axios'

export default function Login() {
  const email = useRef();
  const password = useRef();
  //isFetching - for loading
  const {
    // user,
    // isFetching, 
    // error, 
    dispatch } = useContext(AuthContext)

  let history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    //Send request to server to login
    loginCall({ email: email.current.value, password: password.current.value }, dispatch);

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

// export default class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       password: "",
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   handleSubmit(e) {
//     e.preventDefault();
//     const { email, password } = this.state;
//     console.log(email, password);
//     fetch("http://localhost:5015/api/auth/login", {
//       method: "POST",
//       crossDomain: true,
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data, "userRegister");
//         if (data.status === "ok") {
//           alert("login successful");
//           window.localStorage.setItem("token", data.data);
//           window.location.href = "./";
//         }
//       });
//   }
//   render() {
//     return (
//       <Hero hero="roomsHero">
//         <div className="auth-wrapper">
//       <form onSubmit={this.handleSubmit} className="auth-inner">
//         <h3>Sign In</h3>

//         <div className="mb-3">
//           <label>Email address</label>
//           <input
//             type="email"
//             className="form-control"
//             placeholder="Enter email"
//             onChange={(e) => this.setState({ email: e.target.value })}
//           />
//         </div>

//         <div className="mb-3">
//           <label>Password</label>
//           <input
//             type="password"
//             className="form-control"
//             placeholder="Enter password"
//             onChange={(e) => this.setState({ password: e.target.value })}
//           />
//         </div>

//         <div className="mb-3">
//           <div className="custom-control custom-checkbox">
//             <input
//               type="checkbox"
//               className="custom-control-input"
//               id="customCheck1"
//             />
//             <label className="custom-control-label" htmlFor="customCheck1">
//               Remember me
//             </label>
//           </div>
//         </div>

//         <div className="d-grid">
//           <button type="submit" className="btn btn-primary">
//             Submit
//           </button>
//         </div>
//         <p className="forgot-password text-right">
//           <a href="/register">Sign Up</a>
//         </p>
//       </form>
//       </div>
//       </Hero>
//     );
//   }
// }