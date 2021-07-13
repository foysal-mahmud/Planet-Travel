/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Display All User Reservation Details - ADMIN part.
              - Display all user reservation.
              - Approved/Decline any reservation package.
              - After Decline, again Approved any reservation package feature.                            
                                           
===================================================================*/

import React, { useContext } from "react";
import { StoreContext } from "../../../storeContext/StoreContext";
import dateFormat from "dateformat";
import axios from "axios";

const AdminReservation = () => {
  //-- Context Define ----
  const { reservationData, allPackage, setReservationData } =
    useContext(StoreContext);

  const handleApproved = async (inputStatus, userId, packageId) => {
    try {
      await axios
        .post(
          `http://localhost:8000/api/admin/reservationStatus/${inputStatus}/${userId}/${packageId}`
        )
        .then((response) => {
          if (response.data.status === "success") {
            setReservationData(response.data.value);
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

  return (
    <div>
      <div className="container">
        <br />
        <div className="jumbotron shadow-lg bg-light p-3">
          <h1 className="text-dark text-center">
            All User Reservation Packages - [ADMIN Section]
          </h1>
          <hr />
          <div class="card-group">
            {reservationData.map((aReservation) => {
              return (
                <div className="col-md-12 col-lg-12">
                  <div class="card shadow-lg">
                    <h5 class="card-header">
                      <div className="row">
                        <div className="col-md-3">
                          Status:{" "}
                          {aReservation.reservation_status === "Pending" && (
                            <span className="text-danger">Pending</span>
                          )}
                          {aReservation.reservation_status === "Approved" && (
                            <span className="text-success">Approved</span>
                          )}
                          {aReservation.reservation_status === "Decline" && (
                            <span className="text-danger">
                              <del>Decline</del>
                            </span>
                          )}
                        </div>
                        <div className="row col-md-4">
                          <div className="col-md-6">
                            {aReservation.reservation_status === "Pending" && (
                              <button
                                className="btn btn-block btn-success"
                                onClick={() =>
                                  handleApproved(
                                    "Approved",
                                    aReservation.userId,
                                    aReservation.packageId
                                  )
                                }
                              >
                                <i class="fa fa-check" aria-hidden="true"></i>{" "}
                                Approved
                              </button>
                            )}{" "}
                          </div>
                          <div className="col-md-6">
                            {aReservation.reservation_status === "Pending" && (
                              <button
                                className="btn btn-block btn-danger"
                                onClick={() =>
                                  handleApproved(
                                    "Decline",
                                    aReservation.userId,
                                    aReservation.packageId
                                  )
                                }
                              >
                                <i class="fa fa-check" aria-hidden="true"></i>{" "}
                                Declined
                              </button>
                            )}
                          </div>

                          {aReservation.reservation_status === "Approved" && (
                            <button
                              className="btn btn-block btn-danger"
                              onClick={() =>
                                handleApproved(
                                  "Decline",
                                  aReservation.userId,
                                  aReservation.packageId
                                )
                              }
                            >
                              <i
                                class="fa fa-window-close"
                                aria-hidden="true"
                              ></i>{" "}
                              Decline
                            </button>
                          )}
                          {aReservation.reservation_status === "Decline" && (
                            <button
                              className="btn btn-block btn-success"
                              onClick={() =>
                                handleApproved(
                                  "Approved",
                                  aReservation.userId,
                                  aReservation.packageId
                                )
                              }
                            >
                              <i
                                class="fa fa-check-square-o"
                                aria-hidden="true"
                              ></i>{" "}
                              Again Approved
                            </button>
                          )}
                        </div>
                        <div className="col-md-5 text-right">
                          <span className="text-secondary">
                            Reservation Time:
                          </span>{" "}
                          {dateFormat(
                            aReservation.created_at,
                            "dddd, mmmm dS, yyyy"
                          )}
                        </div>
                      </div>
                    </h5>
                    <div class="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <div class="card border-primary mb-3">
                            <div class="card-header">
                              <h6> General Information:</h6>
                            </div>
                            <div class="card-body">
                              {allPackage
                                .filter(
                                  (packages) =>
                                    packages.id == aReservation.packageId
                                )
                                .map((aPackage) => {
                                  return (
                                    <h6 class="card-title text-info">
                                      <span className="text-secondary">
                                        Package Name:{" "}
                                      </span>
                                      {aPackage.packageTitle}
                                    </h6>
                                  );
                                })}
                              <h6 class="card-title">
                                <span className="text-secondary">
                                  Full Name:{" "}
                                </span>
                                {aReservation.fullName}
                              </h6>
                              <h6 class="card-title">
                                <span className="text-secondary">Email: </span>
                                {aReservation.email}
                              </h6>
                              <h6 class="card-title">
                                <span className="text-secondary">
                                  Mobile No.:{" "}
                                </span>
                                {aReservation.mobile_number}
                              </h6>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="card border-info mb-3">
                            <div class="card-header">
                              <h6>Billing Address: </h6>
                            </div>
                            <div class="card-body">
                              <h6 class="card-title">
                                <span className="text-secondary">Name: </span>
                                {aReservation.billingName}
                              </h6>
                              <h6 class="card-title">
                                <span className="text-secondary">
                                  Address:{" "}
                                </span>
                                {aReservation.billingAddress}
                              </h6>
                              <h6 class="card-title">
                                <span className="text-secondary">
                                  Division:{" "}
                                </span>
                                {aReservation.billingDivision}
                              </h6>
                              <h6 class="card-title">
                                <span className="text-secondary">City: </span>
                                {aReservation.billingCity}
                              </h6>
                              <h6 class="card-title">
                                <span className="text-secondary">
                                  Zip Code:{" "}
                                </span>
                                {aReservation.billingZip}
                              </h6>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="card border-warning mb-3">
                            <div class="card-header">
                              <h6>Credit Card Information:</h6>
                            </div>
                            <div class="card-body">
                              <h6 class="card-title">
                                <span className="text-secondary">
                                  Card Type:{" "}
                                </span>
                                {aReservation.card_type}
                              </h6>
                              <h6 class="card-title">
                                <span className="text-secondary">
                                  Card Holder Name:{" "}
                                </span>{" "}
                                {aReservation.cardHolder_name}
                              </h6>
                              <h6 class="card-title">
                                <span className="text-secondary">
                                  Card Number:{" "}
                                </span>
                                {aReservation.card_number}
                              </h6>
                              <h6 class="card-title">
                                <span className="text-secondary">
                                  Expiration Month:{" "}
                                </span>{" "}
                                {aReservation.card_expiration_month}
                              </h6>
                              <h6 class="card-title">
                                <span className="text-secondary">
                                  Expiration Year:{" "}
                                </span>{" "}
                                {aReservation.card_expiration_year}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
              );
            })}
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default AdminReservation;
