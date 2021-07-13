/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Single Member Details info - Admin Site.                            
                                           
===================================================================*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";
import image1 from "../../../images/blank.jpg";

const DetailsSe = () => {
  const [userArr, setUser] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/se/details/" + id)
      .then((response) => setUser(response.data.value))
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="card shadow-lg container">
      <br />
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
        </div>

        <div className="col-md-8">
          <div className="card-header">
            <h3 className="text-info">Club Member Details Info:</h3>
          </div>
          {userArr.map((user) => {
            return (
              <div>
                <div className="card-body">
                  <h4 className="card-title">
                    <span className="text-secondary">Name: </span>
                    {user.name}
                  </h4>
                  <hr />
                  <h5 className="card-title">
                    <span className="text-secondary">Email: </span>
                    {user.email}
                  </h5>
                  <hr />
                  <h5 className="card-title">
                    <span className="text-secondary">Club Member ID: </span>
                    {user.member_id}
                  </h5>
                  <hr />
                  <h6 className="card-text">
                    <span className="text-secondary">Address: </span>
                    {user.address}
                  </h6>
                  <hr />
                  <h6 className="card-text">
                    <span className="text-secondary">Division: </span>
                    {user.division}
                  </h6>
                  <hr />
                  <h6 className="card-text">
                    <span className="text-secondary">City: </span>
                    {user.city}
                  </h6>
                  <hr />
                  <h6 className="card-text">
                    <span className="text-secondary">Mobile Number: </span>
                    {user.mobile_number}
                  </h6>
                  <hr />
                  <a href="/memberclub" className="btn btn-lg btn-warning">
                    Back to the List
                  </a>
                </div>
                <div className="card-footer text-muted">
                  Joined Date: &nbsp; &nbsp;
                  {dateFormat(
                    user.joined_date,
                    "dddd, mmmm dS, yyyy, h:MM:ss TT"
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DetailsSe;
