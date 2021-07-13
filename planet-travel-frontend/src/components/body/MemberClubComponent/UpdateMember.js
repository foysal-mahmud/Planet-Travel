/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Update a member details info.                            
                                           
===================================================================*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateSE = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    member_id: "",
    address: "",
    division: "",
    city: "",
    mobile_number: "",
  });

  let { id } = useParams();

  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/se/edit/" + id)
      .then((response) => setUser(response.data.value))
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const updateData = async () => {
    try {
      await axios
        .post(`http://localhost:8000/api/se/update/${id}`, user)
        .then((response) => {
          if (response.data.status === "success") {
            setUpdateMessage(response.data.updateMessage);
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

  console.log(user);

  // handle change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData();
  };

  let updateMsg;
  if (updateMessage !== "") {
    updateMsg = (
      <div class="container text-center alert alert-success alert-dismissible alert-block">
        <button type="button" class="close" data-dismiss="alert">
          ×
        </button>
        <strong>
          {updateMessage}
          <a href="/memberclub" class="alert-link">
            See All Club Members ...
          </a>
        </strong>
      </div>
    );
  }

  return (
    <div className="container">
      <br />
      {updateMsg}
      <h2 class="text-primary text-center">Update Club Member info:</h2>
      <br />
      <form onSubmit={handleSubmit} method="POST" className="shadow-lg p-4">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="inputEmail4">
              Email
              <span className="text-danger">
                <strong>*</strong>
              </span>
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="inputEmail4"
              placeholder="Enter Valid Email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label for="inputId4">
              Member ID
              <span className="text-danger">
                <strong>*</strong>
              </span>
            </label>
            <input
              type="number"
              className="form-control"
              name="member_id"
              id="inputId4"
              placeholder="BJIT Employee ID"
              onChange={handleChange}
              value={user.member_id}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label for="inputName">
            Name
            <span className="text-danger">
              <strong>*</strong>
            </span>
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="inputName"
            placeholder="Enter Full Name"
            onChange={handleChange}
            value={user.name}
            required
          />
        </div>
        <div className="form-group">
          <label for="inputAddress2">
            Address <span className="text-secondary">(Optional)</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="address"
            id="inputAddress2"
            placeholder="Your Present Address"
            onChange={handleChange}
            value={user.address}
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-3">
            <label for="inputState">
              Division <span className="text-secondary">(Optional)</span>
            </label>
            <select
              id="inputState"
              name="division"
              className="form-control"
              onChange={handleChange}
              value={user.division}
            >
              <option selected>Select Division</option>
              <option>Dhaka</option>
              <option>Barisal</option>
              <option>Khulna</option>
              <option>Rajshahi</option>
              <option>Chittagong</option>
              <option>Mymensingh</option>
              <option>Rangpur</option>
              <option>Sylhet</option>
            </select>
          </div>
          <div className="form-group col-md-3">
            <label for="inputCity">
              City <span className="text-secondary">(Optional)</span>
            </label>
            <input
              type="text"
              name="city"
              className="form-control"
              placeholder="Enter City Name"
              onChange={handleChange}
              value={user.city}
              id="inputCity"
            />
          </div>

          <div className="form-group col-md-4">
            <label for="inputZip">
              Mobile Number <span className="text-secondary">(Optional)</span>
            </label>
            <input
              type="text"
              name="mobile_number"
              className="form-control"
              placeholder="Enter 4 digit zip code"
              onChange={handleChange}
              value={user.mobile_number}
              id="inputZip"
            />
          </div>

          {/* <div className="form-group col-md-4">
            <label for="inputPic">
              Profile Picture
              <span className="text-danger">
                <strong>*</strong>
              </span>
            </label>
            <input
              type="file"
              name="image"
              className="form-control"
              id="inputPic"
            />
          </div> */}
        </div>
        <button type="submit" className="btn btn-primary">
          Update Club Member
        </button>
        &nbsp;&nbsp;&nbsp;
        <a href="/memberclub" className="btn btn-danger">
          Cancel
        </a>
      </form>
    </div>
  );
};

export default UpdateSE;
