/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Display all available Tour Packages. 
              - Fetch all Travelling Stories to link each Tour Package image hover.
              - Without authentication, Make a Reservation button will be disable.                           
                                           
===================================================================*/

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../storeContext/StoreContext";
import "./package.css";

const TourPackage = () => {
  //-- Context Define ----
  const { allPost, allPackage } = useContext(StoreContext);

  let showReservationMsg;
  if (
    localStorage.getItem("isLogin") !== "isLogin" &&
    localStorage.getItem("isLogin") !== "isUserLogin"
  ) {
    showReservationMsg = (
      <div className="form-group">
        <button className="btn btn-info rounded-pill" disabled>
          Make a Reservation
        </button>
        <small class="form-text  text-danger">
          You have to <strong>log in </strong>for Reservation.
        </small>
      </div>
    );
  }

  return (
    <div>
      <div className="container">
        <br />
        <div className="jumbotron shadow-lg bg-light p-3">
          <h1 className="text-dark text-center">
            Our Available Travel Package
          </h1>
          <hr />
          <div class="card-group">
            {allPackage.map((aPackage) => {
              return (
                <div className="col-md-6 col-lg-4">
                  <div class="card p-2">
                    <div class="fall-item fall-effect">
                      <img
                        src={"http://localhost:8000/" + aPackage.image_path}
                        width="260px"
                        height="260px"
                        alt="img"
                      />
                      <div class="sale-div position-absolute badge badge-danger p-2 m-1">
                        {aPackage.packagePrice}
                      </div>
                      <div class="mask">
                        <h2>{aPackage.packageTitle}</h2>
                        {allPost
                          .filter((post) => post.id == aPackage.packagePost)
                          .map((filterPost) => {
                            return (
                              <p>{filterPost.content.substring(0, 195)}</p>
                            );
                          })}
                        <Link
                          to={`/post/details/${aPackage.packagePost}`}
                          className="btn btn-success"
                        >
                          Read More about it
                        </Link>
                      </div>
                    </div>
                    <h4 className="text-center">
                      <span className="text-secondary">Location: </span>{" "}
                      {aPackage.packageTitle}
                    </h4>
                    <p>
                      <div className="row">
                        <div className="col-md-6">
                          <h6 className="text-secondary text-left">
                            Duration:{" "}
                            <span className="text-success">
                              {aPackage.packageDay}
                            </span>{" "}
                            days
                          </h6>
                        </div>
                        <div className="col-md-6">
                          <h6 className="text-secondary text-right">
                            Date:{" "}
                            <span className="text-danger">
                              {aPackage.tourDate}
                            </span>
                          </h6>
                        </div>
                      </div>
                    </p>

                    {(localStorage.getItem("isLogin") === "isLogin" ||
                      localStorage.getItem("isLogin") === "isUserLogin") && (
                      <Link
                        to={`/admin/reservation/${aPackage.id}`}
                        className="btn btn-info rounded-pill"
                      >
                        Make a Reservation
                      </Link>
                    )}
                    {showReservationMsg}
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default TourPackage;
