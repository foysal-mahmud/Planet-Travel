/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Search any club members by typing their Name.                            
                                           
===================================================================*/

import React, { useContext } from "react";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import demoPic from "../../../images/blank.jpg";
import { StoreContext } from "../../../storeContext/StoreContext";

const SeHome = () => {
  //-- Context Define ----
  const { searchUser } = useContext(StoreContext);

  return (
    <div className="container-fluid">
      <br />
      <hr />
      <h1 className="text-center">Your Search Club Members:</h1> <br />
      <div class="card-group">
        {searchUser.map((user) => {
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
