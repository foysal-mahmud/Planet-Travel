/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Login form UI design and check authentication.                           
                                           
===================================================================*/

import React, { useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../../storeContext/StoreContext";

const LoginForm = (props) => {
  const { setUsername, getUserProfile } = useContext(StoreContext);
  const [loginUser, setAuthUser] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const checkUser = async () => {
    try {
      await axios
        .post(`http://localhost:8000/api/login`, loginUser)
        .then((response) => {
          if (response.data.status === "success") {
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("isLogin", response.data.isLogin);
            setUsername(response.data.username);
            localStorage.setItem("userId", response.data.id);
            getUserProfile(response.data.id);
            props.history.push("/read");
          } else {
            setErrorMessage(response.data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setAuthUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkUser();
    e.target.reset();
  };

  let errorMsg;
  if (errorMessage !== "") {
    errorMsg = (
      <div class="container text-center alert alert-danger alert-dismissible alert-block">
        <button type="button" class="close" data-dismiss="alert">
          ×
        </button>
        <strong>{errorMessage}</strong>
      </div>
    );
  }

  return (
    <div>
      <br />
      {errorMsg}
      <h2 class="text-center">Login Form</h2>
      <br />
      <div class="container w-50">
        <form onSubmit={handleSubmit} method="POST" class="shadow-lg p-4">
          <div class="form-group">
            <label for="exampleInputEmail1">
              Email address
              <span class="text-danger">
                <strong>*</strong>
              </span>
            </label>
            <input
              type="email"
              class="form-control"
              name="email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter valid email here"
              onChange={handleChange}
              required
            />
            <small id="emailHelp" class="form-text text-muted">
              Use Your valid email address.
            </small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">
              Password
              <span class="text-danger">
                <strong>*</strong>
              </span>
            </label>
            <input
              type="password"
              class="form-control"
              name="password"
              id="exampleInputPassword1"
              placeholder="Enter Strong Password"
              onChange={handleChange}
              required
            />
          </div>
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1">
              Remember me
            </label>
          </div>
          <br />

          <button type="submit" class="btn btn-info btn-lg btn-block">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
