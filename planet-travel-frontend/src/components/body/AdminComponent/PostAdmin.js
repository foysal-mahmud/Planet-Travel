/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Admin Travelling Stories Home Page.
              - Display all Travelling Stories.
              - Hide any Travelling Story.
              - Update any Travelling Story.
              - Delete any Travelling Story permanently.
              - Add Travelling Story Link.  
              - Trash Travelling Stories Link.                             
                                           
===================================================================*/

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { StoreContext } from "../../../storeContext/StoreContext";

const AdminHome = () => {
  //-- Context Define ----
  const { allPost, deleteData, deleteMessage, trashData, trashMessage } =
    useContext(StoreContext);

  const handleDelete = (id) => {
    const yes = window.confirm("Do you really want to Delete?");
    if (yes === true) deleteData(id);
  };

  const handleTrash = (id) => {
    const yes = window.confirm("Do you really want to Move it to Trash?");
    if (yes === true) trashData(id);
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

  let trashMsg;
  if (trashMessage !== "") {
    trashMsg = (
      <div class="container text-center alert alert-warning alert-dismissible alert-block">
        <button type="button" class="close" data-dismiss="alert">
          ×
        </button>
        <strong>
          {trashMessage}
          <a href="/admin/readTrash" class="alert-link">
            Click Here to see All Your Trash Items...
          </a>
        </strong>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <br />
      <div className="container-fluid">
        <hr />
        <h1 className="text-center">Travelling Stories - ADMIN</h1> <br />
        {deleteMsg}
        {trashMsg}
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Link to="/admin/create">
                <button class="btn btn-success btn-lg text-center p-3 ">
                  Write New Post
                </button>
              </Link>
            </div>

            <div className="col-md-6 text-right">
              <Link to="/admin/readTrash">
                <button className="btn btn-warning btn-lg text-center p-3">
                  My Trash Items
                </button>
              </Link>
            </div>
          </div>
        </div>
        <br />
      </div>
      <hr />
      <h1>All Travelling Stories:</h1> <br />
      <table className="table table-hover table-striped table-bordered shadow-lg">
        <thead className="thead-dark text-center">
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Date and Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {allPost.map((post) => {
            return (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.content.substring(0, 50)}</td>
                <td>{dateFormat(post.created_at, "dddd, mmmm dS, yyyy")}</td>
                <td>
                  <Link
                    to={`/admin/update/${post.id}`}
                    className="btn btn-primary"
                  >
                    Update
                  </Link>
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-warning"
                    onClick={() => handleTrash(post.id)}
                  >
                    Move to Trash
                  </button>
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(post.id)}
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
