import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import {router} from 'next/router'
export default function Signup(props) {
  const [user, setuser] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
    rpassword: "",
  });
  let host = "http://localhost:5000";
  // using navigate to push on next page //
  const navigate = useNavigate();

  // onchange function to type ina field //
  const onChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  // creating handle change function
  let handleChange = async (e) => {
    e.preventDefault(); // prevent from page reloading//
    if (user.password === user.rpassword) {

      // API Call by using fetch command //
      let res = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name:user.name,email: user.email,mobile:user.mobile,address:user.address, password: user.password }),
      });
      // console.log(id, title, description, tag);
      let data = await res.json();
      if (data.success) {
        props.loading(40)
        props.alert("success", data.message);
        setTimeout(() => {
          navigate("/login");
        props.loading(100)

        }, 1000);
      } 
      else {
        props.alert("error", data.message);
      }
      console.log(data);
    }
    else{
      props.alert("error","Password doesn't match!")
    }
  };
  window.scrollTo(0,0)

  return (
    <>
      <section className="vh-200 bg-image" style={{backgroundImage:"url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')"}}>
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card my-4" style={{borderRadius: "15px" }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      Create an account
                    </h2>

                    <form onSubmit={handleChange}>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form3Example1cg"
                          className="form-control p-3"
                          placeholder="Username"
                          name="name" required
                          onChange={onChange}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form3Example3cg"
                          className="form-control p-3"
                          placeholder="Email"
                          name="email" required
                          onChange={onChange}
                        />
                      </div>
                      
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4cg"
                          className="form-control p-3"
                          placeholder="Password" minLength={4}
                          name="password" required
                          onChange={onChange}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4cdg"
                          className="form-control p-3 "
                          placeholder="Confirm Password" minLength={4}
                          name="rpassword" required
                          onChange={onChange}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="number"
                          id="form3Example3cg"
                          className="form-control p-3"
                          placeholder="Mobile(Optional)" maxLength={11}
                          name="mobile"
                          onChange={onChange}
                        />
                      </div><div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form3Example3cg"
                          className="form-control p-3"
                          placeholder="Address (Optional)"
                          name="address" 
                          onChange={onChange}
                        />
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3g" required
                        />
                        <label className="form-check-label" htmlFor="form2Example3g">
                          I agree all statements in{" "}
                          <a href="#!" className="text-body">
                            <u>Terms of service</u>
                          </a>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-success btn-lg "
                        >
                          Register
                        </button>
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">
                        Have already an account?{" "}
                        <Link to="/login" className="fw-bold text-body">
                          <u>Login here</u>
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
