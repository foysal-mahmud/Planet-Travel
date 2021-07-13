/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Registration Form UI Design and all possible validation.
              - Name Empty check.
              - Email Empty check, Valid Email Check and Exist Email Check.
              - Password Empty check and 8 character long check.                             
                                           
===================================================================*/

import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [authUser, setAuthUser] = useState([
    {
      name: "",
      email: "",
      password: "",
    },
  ]);

  const [authMessage, setAuthMessage] = useState("");

  const [regName, setRegName] = useState("");

  // form validation
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const emailRegex = /\S+@\S+\.\S+/;
  const enteredEmailIsValid = emailRegex.test(enteredEmail);
  const enteredEmailIsInvalid = !enteredEmailIsValid && enteredEmailTouched;
  // enteredEmail.includes("@");

  const enteredPasswordIsValid = enteredPassword.length > 8;
  const enteredPasswordIsInvalid =
    !enteredPasswordIsValid && enteredPasswordTouched;

  let formIsValid = false;

  const [emailExist, setEmailExist] = useState("false");

  // console.log(emailExist);

  if (
    enteredNameIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    emailExist === "false"
  ) {
    formIsValid = true;
  }

  // check email Exist or Not
  const checkEmailExist = async (emailExist) => {
    try {
      await axios
        .get(`http://localhost:8000/api/checkEmail/${emailExist}`)
        .then((response) => {
          if (response.data.status === "success") {
            setEmailExist("true");
          } else {
            setEmailExist("false");
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

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
    setAuthUser({ ...authUser, name: event.target.value });
  };

  const emailInputChangeHandler = (event) => {
    checkEmailExist(event.target.value);

    setAuthUser({ ...authUser, email: event.target.value });
    setEnteredEmail(event.target.value);
  };

  const passwordInputChangeHandler = (event) => {
    setAuthUser({ ...authUser, password: event.target.value });
    setEnteredPassword(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };

  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true);
  };

  const passwordInputBlurHandler = (event) => {
    setEnteredPasswordTouched(true);
  };

  const nameInputClasses = nameInputIsInvalid
    ? "form-control is-invalid"
    : "form-control is-valid";

  const emailInputClasses =
    enteredEmailIsInvalid || emailExist === "true"
      ? "form-control is-invalid"
      : "form-control is-valid";

  const passwordInputClasses = enteredPasswordIsInvalid
    ? "form-control is-invalid"
    : "form-control is-valid";

  const addUser = async () => {
    try {
      await axios
        .post(`http://localhost:8000/api/registration`, authUser)
        .then((response) => {
          if (response.data.status === "success") {
            setAuthMessage(response.data.message);
            setRegName(response.data.name);
          } else {
            console.log(response);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser();
    e.target.reset();
  };

  let authMsg;
  if (authMessage !== "") {
    authMsg = (
      <div class="container text-center alert alert-success alert-dismissible alert-block">
        <button type="button" class="close" data-dismiss="alert">
          ×
        </button>
        <strong>
          <h3 className="text-danger">{regName} </h3>
          {authMessage}
          <a href="/login" class="alert-link">
            Click here to Login ...
          </a>
        </strong>
      </div>
    );
  }

  return (
    <div>
      <br />
      {authMsg}
      <h2 class="text-dark text-center">Registration Form</h2> <br />
      <div class="container w-50">
        {/* Registration Form */}
        <form onSubmit={handleSubmit} method="POST" class="shadow-lg p-4">
          <div className="form-group invalid">
            <label for="inputTitle4">
              Name
              <span class="text-danger">
                <strong>*</strong>
              </span>
            </label>
            <input
              type="text"
              class={nameInputClasses}
              id="inputTitle4"
              placeholder="Enter Full Name"
              onChange={nameInputChangeHandler}
              onBlur={nameInputBlurHandler}
              value={enteredName}
              required
            />
            {nameInputIsInvalid && (
              <p className="invalid-feedback">Name can not be Empty.</p>
            )}
          </div>

          <div class="form-group">
            <label for="exampleInputEmail1">
              Email address
              <span class="text-danger">
                <strong>*</strong>
              </span>
            </label>
            <input
              type="email"
              class={emailInputClasses}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter valid email here"
              onChange={emailInputChangeHandler}
              onBlur={emailInputBlurHandler}
              value={enteredEmail}
              required
            />

            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>

            {enteredEmailIsInvalid && enteredEmail !== "" && (
              <p className="invalid-feedback">Please enter a valid email.</p>
            )}

            {enteredEmailTouched && enteredEmail === "" && (
              <p className="invalid-feedback">Email can not be Empty.</p>
            )}

            {emailExist === "true" && (
              <p className="invalid-feedback">
                Email already exist. Please use another email.
              </p>
            )}
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
              class={passwordInputClasses}
              id="exampleInputPassword1"
              placeholder="Enter Strong Password"
              onChange={passwordInputChangeHandler}
              onBlur={passwordInputBlurHandler}
              value={enteredPassword}
              required
            />
            {enteredPasswordIsInvalid && enteredPassword !== "" && (
              <p className="invalid-feedback">
                Password must be 8 character long
              </p>
            )}
            {enteredPasswordTouched && enteredPassword === "" && (
              <p className="invalid-feedback">Password can not be Empty.</p>
            )}
          </div>
          <br />

          <button
            disabled={!formIsValid}
            type="submit"
            class="btn btn-success btn-lg btn-block"
          >
            Sign UP
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
