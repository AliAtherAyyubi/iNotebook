import React, { useState } from "react";
import "../CSS/login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { HistoryRouterProps } from "react-router-dom";
export default function Login(props) {

  const [user, setuser] = useState({ email: "", password: "" });
  let host = "http://localhost:5000";

  // using navigate to push on next page //
  const navigate = useNavigate();

  // onchange function to type ina field //
  const onChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  // creating handle change
  let handleChange = async (e) => {
    e.preventDefault(); // prevent from page reloading//
    // API Call by using fetch command //
    let res = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email, password: user.password }),
    });
    // props.loading(50)

    // console.log(id, title, description, tag);
    let data = await res.json();
    if (data.success){
    props.loading(40)

      // props.alert("success", data.message);
        /// storing authontication token 
      localStorage.setItem('token',data.authtoken)
      setTimeout(() => {
        navigate("/");
        props.loading(100)

      }, 1000);
    } else {
      props.alert("error", data.message);
    }

    // props.loading(false)

    // console.log(data);

    // props.alert('success','Your Notes has been added successfully!')
  };
  return (
    <>
      <div className="container" id="container">
        <div className="form-container sign-in-container credentialbox">
          <form onSubmit={handleChange}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="/" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="/" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="/" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your account</span>
            <input
              type="email"
              placeholder="Email"
              name="email" required
              onChange={onChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password" required
              onChange={onChange}
            />

            <div className="signup">
              <p>
                Don't have an account?{" "}
                <Link className="mx-2 text-danger" to="/signup">Singn Up</Link>
              </p>

              <p style={{ marginTop: "-10px" }}>
                <a className="fw" href="/">
                  Forgot your password?
                </a>
              </p>
            </div>

            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </>
  );
}
