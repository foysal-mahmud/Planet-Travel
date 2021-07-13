/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Admin Member Club Home Page.
              - Display all Club Members.
              - Details of Member info.
              - Update any Member
              - Delete any Member. 
              - Add New Member Link.
              - All Visitor messages Link.                                
                                           
===================================================================*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";

const SeHome = () => {
  const [allUser, setAllUser] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/se/read")
      .then((response) => setAllUser(response.data.value))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteData = async (id) => {
    try {
      await axios
        .get("http://localhost:8000/api/se/delete/" + id)
        .then((response) => {
          if (response.data.status === "success") {
            setDeleteMessage(response.data.message);
            setAllUser(response.data.value);
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

  const handleDelete = (id) => {
    const yes = window.confirm("Do you really want to Delete?");
    if (yes === true) deleteData(id);
    // console.log(id);
  };

  let deleteMsg;
  if (deleteMessage !== "") {
    deleteMsg = (
      <div class="container text-center alert alert-danger alert-dismissible alert-block">
        <button type="button" class="close" data-dismiss="alert">
          ×
        </button>
        <strong>{deleteMessage}</strong>
      </div>
    );
  }

  return (
    <div className="container">
      <hr />
      <h1 className="text-center">Member CLub - ADMIN</h1> <br />
      <div className="row">
        <div className="col-md-6">
          <Link to="/memberclub/insert">
            <button className="btn btn-success btn-lg text-center p-3">
              Add New Members
            </button>
          </Link>
        </div>
        <div className="col-md-6 text-right">
          <Link to="/visitorMessage/read">
            <button className="btn btn-info btn-lg text-center p-3">
              All Visitor Messages
            </button>
          </Link>
        </div>
      </div>
      <br />
      {deleteMsg}
      <hr />
      <h1>Our Club Members:</h1> <br />
      <table className="table table-hover table-striped table-bordered shadow-lg">
        <thead className="thead-dark text-center">
          <tr>
            <th>Member Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Joined Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {allUser.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.member_id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{dateFormat(user.joined_date, "dddd, mmmm dS, yyyy")}</td>
                <td>
                  <Link
                    to={`/memberclub/admin/details/${user.id}`}
                    className="btn btn-info"
                  >
                    Details
                  </Link>
                  &nbsp;&nbsp;
                  <Link
                    to={`/memberclub/update/${user.id}`}
                    className="btn btn-primary"
                  >
                    Update
                  </Link>
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default SeHome;
