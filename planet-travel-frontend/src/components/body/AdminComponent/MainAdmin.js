/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Admin Home Page with 3 section overview. 
              - Travelling Stories
              - Travel Packages
              - Member Club info                                  
                                           
===================================================================*/

import React, { useContext } from "react";
import "./admin.css";
import { Link } from "react-router-dom";
import story1 from "../../../images/story1.jpg";
import story2 from "../../../images/story2.jpg";
import story3 from "../../../images/story3.jpg";
import { StoreContext } from "../../../storeContext/StoreContext";

const MainAdmin = () => {
  //-- Context Define ----
  const {
    countPost,
    countPackage,
    countMember,
    countReservation,
    countMessages,
  } = useContext(StoreContext);

  return (
    <div>
      <div className="container">
        <br />
        <h1 className="text-center"> Admin Home</h1> <hr />
        <div className="row mt-lg-4">
          <div className="col-md-4">
            {/* Card 1 */}
            <Link to="/postAdmin">
              <div className="card1">
                <div class="image1">
                  <img src={story1} alt="Travelling Stories" />
                </div>

                <div class="details bg-info">
                  <div class="center">
                    <h1>
                      Travelling Stories
                      <br />
                      <br />
                      <span>Travelling Stories Overview:</span>
                    </h1>
                    <h4>Total Stories: {countPost}</h4>
                    <br />
                    <h6 className="text-secondary">Available action:</h6>
                    <ul>
                      <li>
                        <a href="#">
                          <i class="fa fa-address-book" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-user-plus" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i
                            class="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-user-times" aria-hidden="true"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <h3 className="text-dark text-center">Travelling Stories</h3>
              </div>
            </Link>
          </div>
          <div className="col-md-4">
            {/* Card 2 */}
            <Link to="/packageAdmin">
              <div className="card1">
                <div class="image1">
                  <img src={story2} alt="Tour Package" />
                </div>

                <div class="details">
                  <div class="center">
                    <h1>
                      Travel Packages
                      <br />
                      <br />
                      <span>Travelling Package Overview:</span>
                    </h1>
                    <h5 className="text-danger">
                      Pending Reservation: {countReservation}
                    </h5>
                    <h5>Total Packages: {countPackage}</h5>
                    <br />
                    <h6 className="text-secondary">Available action:</h6>
                    <ul>
                      <li>
                        <a href="#">
                          <i class="fa fa-address-book" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-user-plus" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i
                            class="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-user-times" aria-hidden="true"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <h3 className="text-dark text-center">Tour Package</h3>
              </div>
            </Link>
          </div>
          <div className="col-md-4">
            {/* Card 3 */}
            <Link to="/memberclub">
              <div className="card1">
                <div class="image1">
                  <img src={story3} alt="Member Club" />
                </div>

                <div class="details bg-success">
                  <div class="center">
                    <h1>
                      Member Club
                      <br />
                      <br />
                      <span>Member Club Overview:</span>
                    </h1>
                    <h4>Total Members: {countMember}</h4>
                    <h5 className="text-info">
                      Visitor Messages: {countMessages}
                    </h5>
                    <br />
                    <h6 className="text-secondary">Available action:</h6>
                    <ul>
                      <li>
                        <a href="#">
                          <i class="fa fa-address-book" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-user-plus" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i
                            class="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-user-times" aria-hidden="true"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <h3 className="text-dark text-center">Member Club</h3>
              </div>
            </Link>
          </div>
        </div>
        <br />
        <br /> <hr />
      </div>
    </div>
  );
};

export default MainAdmin;
