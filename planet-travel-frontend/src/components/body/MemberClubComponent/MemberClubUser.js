/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Display all Club Members info from User perspective.                           
                                           
===================================================================*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import demoPic from "../../../images/blank.jpg";

const SeHome = () => {
  const [allUser, setAllUser] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/se/read")
      .then((response) => setAllUser(response.data.value))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container-fluid">
      <br />
      <div className="text-center">
        <Link to="/memberclub/insert">
          <button className="btn btn-success btn-lg text-center p-3">
            Join Our Member Club
          </button>
        </Link>
      </div>
      <br />
      <hr />
      <h1 className="text-center">Our Club Members:</h1> <br />
      <div class="card-group">
        {allUser.map((user) => {
          return (
            <div class="col-md-6 col-lg-3">
              <div class="card" key={user.id}>
                <img
                  class="card-img-top"
                  height="300px"
                  weight="200px"
                  src={demoPic}
                  alt="user_pic"
                />
                <div class="card-body">
                  <h5 class="card-title">
                    {" "}
                    <span className="text-secondary">Name: </span>
                    {user.name}
                  </h5>
                  <h6>
                    {" "}
                    <span className="text-secondary">Member ID: </span>
                    {user.member_id}
                  </h6>
                  <p class="card-text">
                    {" "}
                    <span className="text-secondary">Email: </span>
                    {user.email}
                  </p>
                  <Link
                    to={`/memberclub/details/${user.id}`}
                    className="btn btn-info btn-block"
                  >
                    Details
                  </Link>
                </div>
                <div class="card-footer">
                  <small class="text-muted">
                    <span className="text-info">Joined Date: </span>
                    {dateFormat(user.joined_date, "dddd, mmmm dS, yyyy")}
                  </small>
                </div>
              </div>
              <br />
            </div>
          );
        })}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default SeHome;
