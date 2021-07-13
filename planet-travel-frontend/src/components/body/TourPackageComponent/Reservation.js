/*===============================================================
# Author: Md. Foysal Mahmud

# Description: User Reservation Form for any Tour Package.                           
                                           
===================================================================*/

import React, { useContext } from "react";
import { StoreContext } from "../../../storeContext/StoreContext";
import { useParams } from "react-router-dom";
import bgimg from "../../../images/travel1.jpg";
import creditcard from "../../../images/creditcard.png";

const Reservation = () => {
  //   -- Context Define ----
  const {
    allPackage,
    userReservation,
    setUserReservation,
    addReservationData,
    userReservationMessage,
  } = useContext(StoreContext);

  let { id } = useParams();

  const userId = localStorage.getItem("userId");

  const handleChange = (e) => {
    setUserReservation({ ...userReservation, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addReservationData(userId);
    e.target.reset();
  };

  let alertMsg;
  if (userReservationMessage !== "") {
    alertMsg = (
      <div class="container text-center alert alert-success alert-dismissible alert-block">
        <button type="button" class="close" data-dismiss="alert">
          ×
        </button>
        <strong>
          {userReservationMessage}
          <a href="/userReservation" class="alert-link">
            Click to see your all Reservation Package
          </a>
        </strong>
      </div>
    );
  }

  return (
    <div
      style={{
        background: `url(${bgimg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "150vh",
      }}
      className="container-fluid"
    >
      <br />
      <div className="card container bg-light">
        <br />
        {alertMsg}
        <h2 class="text-primary text-center">Tour Package Reservation</h2>{" "}
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="shadow-lg p-2 mb-3"
        >
          <div className="form-row">
            <div className="form-group col-md-6">
              <div className="form-group">
                <label for="inputName">
                  Full Name
                  <span className="text-danger">
                    <strong>*</strong>
                  </span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  id="inputName"
                  placeholder="Enter Full Name"
                  onChange={handleChange}
                  required
                />
              </div>
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
              <label for="inputMobile">
                Your Mobile Number{" "}
                <span className="text-danger">
                  <strong>*</strong>
                </span>
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
            <div className="col-md-1"></div>
            {/* Package details */}
            <div className="form-group col-md-5 mt-4">
              {allPackage
                .filter((packages) => packages.id == id)
                .map((aPackage) => {
                  return (
                    <div
                      class="card border-info mb-3"
                      style={{ maxWidth: "24rem" }}
                    >
                      <div class="card-header">Package Overview:</div>
                      <div class="card-body">
                        <h5 class="card-title">
                          <div class="input-group mb-3 w-75">
                            <div class="input-group-prepend">
                              <span class="input-group-text" id="basic-addon3">
                                Location:{" "}
                              </span>
                            </div>

                            <select
                              name="packageId"
                              className="form-control"
                              onChange={handleChange}
                            >
                              <option value={aPackage.id} selected>
                                {aPackage.packageTitle}
                              </option>
                            </select>
                          </div>
                        </h5>
                        <h6>
                          Price:{" "}
                          <span className="text-danger">
                            {aPackage.packagePrice}
                          </span>
                        </h6>
                        <h6>
                          Duration:{" "}
                          <span className="text-success">
                            {aPackage.packageDay}
                          </span>{" "}
                          days
                        </h6>
                        <h6>
                          Date:{" "}
                          <span className="text-danger">
                            {aPackage.tourDate}
                          </span>
                        </h6>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <hr />
          <h4>Billing Address:</h4>
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
              name="billingName"
              id="inputName"
              placeholder="Enter Full Name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="inputAddress2">
              Address{" "}
              <span className="text-danger">
                <strong>*</strong>
              </span>
            </label>
            <input
              type="text"
              className="form-control"
              name="billingAddress"
              id="inputAddress2"
              placeholder="Your Billing Address"
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label for="inputState">
                Division{" "}
                <span className="text-danger">
                  <strong>*</strong>
                </span>
              </label>
              <select
                id="inputState"
                name="billingDivision"
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
            <div className="form-group col-md-4">
              <label for="inputCity">
                City{" "}
                <span className="text-danger">
                  <strong>*</strong>
                </span>
              </label>
              <input
                type="text"
                name="billingCity"
                className="form-control"
                placeholder="Enter City Name"
                onChange={handleChange}
                id="inputCity"
              />
            </div>

            <div className="form-group col-md-4">
              <label for="inputZip">
                Zip Code <span className="text-secondary">(Optional)</span>
              </label>
              <input
                type="text"
                name="billingZip"
                className="form-control"
                placeholder="Enter Zip Code"
                onChange={handleChange}
                id="inputZip"
              />
            </div>
          </div>
          {/* Credit Card info */}
          <hr />
          <h4>Credit Card Information:</h4>
          <div className="form-group">
            <img src={creditcard} alt="Credit Card" />
          </div>
          <div className="form-row">
            <div className="form-group col-md-3">
              <label for="inputState">
                Select Card Type{" "}
                <span className="text-danger">
                  <strong>*</strong>
                </span>
              </label>
              <select
                id="inputState"
                name="card_type"
                className="form-control"
                onChange={handleChange}
              >
                <option value="Visa" selected>
                  Visa
                </option>
                <option value="Mastercard">Mastercard</option>
                <option value="Discover">Discover</option>
                <option value="American Express">American Express</option>
              </select>
            </div>
            <div className="form-group col-md-4">
              <label for="inputCardHolder">
                Card Holder Name{" "}
                <span className="text-danger">
                  <strong>*</strong>
                </span>
              </label>
              <input
                type="text"
                name="cardHolder_name"
                className="form-control"
                placeholder="Enter card holder name"
                onChange={handleChange}
                id="inputCardHolder"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-5">
              <label for="inputCardNumber">
                Card Number{" "}
                <span className="text-danger">
                  <strong>*</strong>
                </span>
              </label>
              <div class="input-group">
                <input
                  type="text"
                  name="card_number"
                  className="form-control"
                  placeholder="Enter card number"
                  onChange={handleChange}
                  id="inputCardNumber"
                />
                <div class="input-group-append">
                  <span class="input-group-text" id="basic-addon2">
                    <i class="fa fa-credit-card" aria-hidden="true"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="form-group col-md-4">
              <label for="inputCardMonth">
                Card Expiration Month:
                <span className="text-danger">
                  <strong>*</strong>
                </span>
              </label>
              <select
                id="inputCardMonth"
                name="card_expiration_month"
                className="form-control"
                onChange={handleChange}
              >
                <option value="January" selected>
                  January
                </option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
            <div className="form-group col-md-3">
              <label for="inputCardYear">
                Card Expiration Year:
                <span className="text-danger">
                  <strong>*</strong>
                </span>
              </label>
              <select
                id="inputCardYear"
                name="card_expiration_year"
                className="form-control"
                onChange={handleChange}
              >
                <option value="2021" selected>
                  2021
                </option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
              </select>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-md-6">
              <button
                type="submit"
                className="btn btn-success btn-lg btn-block"
              >
                Conform Reservation
              </button>
            </div>
            <div className="col-md-6">
              <a
                href="/tour/package"
                className="btn btn-danger btn-lg btn-block"
              >
                Cancel
              </a>
            </div>
          </div>
        </form>
      </div>
      <br />
      <br /> <br />
    </div>
  );
};

export default Reservation;
