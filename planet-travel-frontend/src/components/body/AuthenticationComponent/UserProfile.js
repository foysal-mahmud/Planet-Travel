/*===============================================================
# Author: Md. Foysal Mahmud

# Description: User Profile UI Design.
              - Display User Name, Email and Join date.
              - Password change feature.                             
                                           
===================================================================*/

import React, { useState, useEffect, useContext } from "react";
import dateFormat from "dateformat";
import image1 from "../../../images/blank.jpg";
import { StoreContext } from "../../../storeContext/StoreContext";
import axios from "axios";

const UserProfile = () => {
  const { profileUser, getUserProfile } = useContext(StoreContext);

  let userId = localStorage.getItem("userId");
  useEffect(() => {
    getUserProfile(userId);
  }, []);

  const [currentUser, setCurrentUser] = useState([]);

  const [passwordMessage, setPasswordMessage] = useState("");

  const changePassword = async () => {
    try {
      await axios
        .post(
          `http://localhost:8000/api/user/changePassword/${userId}`,
          currentUser
        )
        .then((response) => {
          if (response.data.status === "success") {
            setPasswordMessage(response.data.message);
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

  const handleChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changePassword();
    e.target.reset();
  };

  let passwordMsg;
  if (passwordMessage !== "") {
    passwordMsg = (
      <div class="container text-center alert alert-warning alert-dismissible alert-block">
        <button type="button" class="close" data-dismiss="alert">
          ×
        </button>
        <strong>{passwordMessage}</strong>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="jumbotron shadow-lg bg-light p-3">
        {passwordMsg}
        <div className="col-md-12">
          <h1 className="text-center">
            <span className="text-success">
              {localStorage.getItem("username")}
            </span>{" "}
            Profile:
          </h1>
          <div className="row">
            <br />
            <div className="col-md-4 p-3">
              <img
                src={image1}
                className="img-thumbnail rounded ml-2"
                width="380px"
                height="380px"
                alt="User Pic"
              />
              <br />
            </div>
            <div className="col-md-8">
              <br />
              <ul class="list-group">
                <li class="list-group-item list-group-item-primary">
                  <h4>Full Name: {profileUser[0].name}</h4>
                </li>
                <li class="list-group-item list-group-item-info">
                  <h5>Email: {profileUser[0].email}</h5>
                </li>
                <li class="list-group-item list-group-item-success">
                  <h5>
                    Joined Date: &nbsp;
                    {dateFormat(
                      profileUser[0].created_at,
                      "dddd, mmmm dS, yyyy, h:MM:ss TT"
                    )}
                  </h5>
                </li>
                <br />
                <li class="list-group-item list-group-item bg-dark shadow-lg">
                  <h5 className="text-light">Change Your Password: </h5>
                  <form
                    onSubmit={handleSubmit}
                    method="POST"
                    class="shadow-lg p-4"
                  >
                    <div class="form-group">
                      <label for="exampleInputPassword1" className="text-light">
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

                    <br />

                    <button
                      type="submit"
                      class="btn btn-success btn-lg btn-block"
                    >
                      Change Password
                    </button>
                  </form>
                </li>
              </ul>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
