/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Join Member Club UI Design.                            
                                           
===================================================================*/

import React, { useContext } from "react";
import { StoreContext } from "../../../storeContext/StoreContext";

const AddSe = () => {
  //-- Context Define ----
  const { user, setUser, addData, userMessage } = useContext(StoreContext);

  // console.log(user);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addData();
    e.target.reset();
  };

  let alertMsg;
  if (userMessage !== "") {
    alertMsg = (
      <div class="container text-center alert alert-success alert-dismissible alert-block">
        <button type="button" class="close" data-dismiss="alert">
          ×
        </button>
        <strong>
          {userMessage}
          <a href="/memberclub/user" class="alert-link">
            See All Club Member...
          </a>
        </strong>
      </div>
    );
  }

  return (
    <div className="container">
      {alertMsg}
      <h2 class="text-primary text-center">Join our Member Club</h2> <br />
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
              onChange={handleChange}
              required
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group col-md-6">
            <label for="inputId4">
              Member NID
              <span className="text-danger">
                <strong>*</strong>
              </span>
            </label>
            <input
              type="number"
              className="form-control"
              name="member_id"
              id="inputId4"
              placeholder="Club Member NID"
              onChange={handleChange}
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
              id="inputCity"
            />
          </div>

          <div className="form-group col-md-6">
            <label for="inputMobile">
              Your Mobile Number{" "}
              <span className="text-secondary">(Optional)</span>
            </label>
            <input
              type="text"
              name="mobile_number"
              className="form-control"
              placeholder="Enter your Mobile number"
              onChange={handleChange}
              id="inputMobile"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Join to Member Club
        </button>
      </form>
      <br />
      <br /> <br />
    </div>
  );
};

export default AddSe;
