/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Display all Trash Travelling Story - ADMIN part. 
              - Restore any Travelling Story.
              - Delete any Travelling Story permanently from Trash.                           
                                           
===================================================================*/

import React, { useContext } from "react";
import dateFormat from "dateformat";
import { StoreContext } from "../../../storeContext/StoreContext";

const TrashHome = () => {
  //-- Context Define ----
  const {
    allTrashPost,
    deleteTrashMessage,
    deleteTrashData,
    restoreTrashMessage,
    restoreTrashData,
  } = useContext(StoreContext);

  const handleDelete = (id) => {
    const yes = window.confirm("Do you really want to Delete?");
    if (yes === true) {
      deleteTrashData(id);
    }
  };

  const handleRestore = (id) => {
    const yes = window.confirm("Do you really want to restore?");
    if (yes === true) restoreTrashData(id);
  };

  let restoreMsg;
  if (restoreTrashMessage !== "") {
    restoreMsg = (
      <div class="container text-center alert alert-success alert-dismissible alert-block">
        <button type="button" class="close" data-dismiss="alert">
          ×
        </button>
        <strong>
          {restoreTrashMessage}
          <a href="/postAdmin" class="alert-link">
            Click to Find Restore Post...
          </a>
        </strong>
      </div>
    );
  }

  let deleteMsg;
  if (deleteTrashMessage !== "") {
    deleteMsg = (
      <div class="container text-center alert alert-danger alert-dismissible alert-block">
        <button type="button" class="close" data-dismiss="alert">
          ×
        </button>
        <strong>{deleteTrashMessage}</strong>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <br />
      {restoreMsg}
      {deleteMsg}
      <a href="/postAdmin" className="btn btn-lg btn-warning">
        Back to All Post
      </a>
      <h1 className="text-center">All Trash Posts:</h1>

      <br />
      <table className="table table-hover table-striped table-bordered shadow-lg">
        <thead className="thead-dark text-center">
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Deleted Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody class="text-center">
          {allTrashPost.map((post) => {
            return (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.content.substring(0, 50)}</td>
                <td>
                  {dateFormat(
                    post.deleted_at,
                    "dddd, mmmm dS, yyyy, h:MM:ss TT"
                  )}
                </td>
                <td>
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-success"
                    onClick={() => handleRestore(post.id)}
                  >
                    Restore
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

export default TrashHome;
