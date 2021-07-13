/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Admin Tour Packages Home Page.
              - Display all Tour Packages.
              - Hide any package.
              - Update any package.
              - Delete any package permanently.
              - Add Tour Package Link.  
              - Hidden Packages Link. 
              - User Reservation Packages Link.                              
                                           
===================================================================*/

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../storeContext/StoreContext";

const AdminHome = () => {
  //-- Context Define ----
  const {
    allPackage,
    deletePackage,
    deletePackageMessage,
    trashPackage,
    trashPackageMessage,
  } = useContext(StoreContext);

  const handleDelete = (id) => {
    const yes = window.confirm("Do you really want to Delete?");
    if (yes === true) deletePackage(id);
  };

  const handleTrash = (id) => {
    const yes = window.confirm("Do you really want to Move it to Trash?");
    if (yes === true) trashPackage(id);
    // console.log(id);
  };

  let deleteMsg;
  if (deletePackageMessage !== "") {
    deleteMsg = (
      <div class="container text-center alert alert-danger alert-dismissible alert-block">
        <button type="button" class="close" data-dismiss="alert">
          ×
        </button>
        <strong>{deletePackageMessage}</strong>
      </div>
    );
  }

  let trashMsg;
  if (trashPackageMessage !== "") {
    trashMsg = (
      <div class="container text-center alert alert-warning alert-dismissible alert-block">
        <button type="button" class="close" data-dismiss="alert">
          ×
        </button>
        <strong>
          {trashPackageMessage}
          <a href="/admin/trashPackage" class="alert-link">
            Click Here to see All Your Package Trash Items...
          </a>
        </strong>
      </div>
    );
  }

  return (
    <div className="container">
      <br />
      <div className="container-fluid">
        <hr />
        <h1 className="text-center">Travelling Package - ADMIN</h1> <br />
        {deleteMsg}
        {trashMsg}
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Link to="/admin/package">
                <button className="btn btn-primary btn-lg text-center p-3">
                  Add Tour Package
                </button>
              </Link>
            </div>

            <div className="col-md-4 text-center">
              <Link to="/adminReservation">
                <button className="btn btn-info btn-lg text-center p-3">
                  User Reservation Packages
                </button>
              </Link>
            </div>

            <div className="col-md-4 text-right">
              <Link to="/admin/trashPackage">
                <button className="btn btn-warning btn-lg text-center p-3">
                  Hidden Tour Packages
                </button>
              </Link>
            </div>
          </div>
        </div>
        <br />
      </div>
      <hr />
      <h1>All Tour Packages:</h1> <br />
      <table className="table table-hover table-striped table-bordered shadow-lg">
        <thead className="thead-dark text-center">
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Available Travelling Stories</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {allPackage.map((aPackage) => {
            return (
              <tr key={aPackage.id}>
                <td>{aPackage.packageTitle}</td>
                <td>{aPackage.packagePrice}</td>
                <td>{aPackage.packageDay}</td>
                <td>{aPackage.tourDate}</td>
                <td>
                  <Link
                    to={`/post/details/${aPackage.packagePost}`}
                    className="btn btn-success"
                  >
                    View Package related Post
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/admin/packageUpdate/${aPackage.id}`}
                    className="btn btn-primary"
                  >
                    Update
                  </Link>
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-warning"
                    onClick={() => handleTrash(aPackage.id)}
                  >
                    Hide Package
                  </button>
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(aPackage.id)}
                  >
                    Delete Permanently
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

export default AdminHome;
