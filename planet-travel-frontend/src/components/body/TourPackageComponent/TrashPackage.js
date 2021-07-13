/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Display all Hidden Tour Packages. 
              - Restore any Tour Package.
              - Delete any Tour Package permanently from Trash.                           
                                           
===================================================================*/

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../storeContext/StoreContext";

const TrashPackage = () => {
  //-- Context Define ----
  const {
    allPackageTrash,
    deletePackageTrashMessage,
    deletePackageTrashData,
    restorePackageTrashMessage,
    restorePackageTrashData,
  } = useContext(StoreContext);

  const handleDelete = (id) => {
    const yes = window.confirm("Do you really want to Delete?");
    if (yes === true) {
      deletePackageTrashData(id);
    }
  };

  const handleRestore = (id) => {
    const yes = window.confirm("Do you really want to restore?");
    if (yes === true) restorePackageTrashData(id);
  };

  let restoreMsg;
  if (restorePackageTrashMessage !== "") {
    restoreMsg = (
      <div class="container text-center alert alert-success alert-dismissible alert-block">
        <button type="button" class="close" data-dismiss="alert">
          ×
        </button>
        <strong>
          {restorePackageTrashMessage}
          <a href="/packageAdmin" class="alert-link">
            Click to Find Restore Post...
          </a>
        </strong>
      </div>
    );
  }

  let deleteMsg;
  if (deletePackageTrashMessage !== "") {
    deleteMsg = (
      <div class="container text-center alert alert-danger alert-dismissible alert-block">
        <button type="button" class="close" data-dismiss="alert">
          ×
        </button>
        <strong>{deletePackageTrashMessage}</strong>
      </div>
    );
  }

  return (
    <div className="container">
      <br />
      {restoreMsg}
      {deleteMsg}
      <a href="/packageAdmin" className="btn btn-lg btn-warning">
        Back to All Post
      </a>
      <h1 className="text-center">TRASH - Tour Package</h1>

      <br />
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
        <tbody class="text-center">
          {allPackageTrash.map((aPackage) => {
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
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-success"
                    onClick={() => handleRestore(aPackage.id)}
                  >
                    Restore
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

export default TrashPackage;
