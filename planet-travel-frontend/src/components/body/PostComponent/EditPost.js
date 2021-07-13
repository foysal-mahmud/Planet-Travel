/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Update Travelling Story - ADMIN part.                            
                                           
===================================================================*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  let { id } = useParams();

  const [updateMessage, setUpdateMessage] = useState("");

  // ---- Get Post data by id------------
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/admin/edit/" + id)
      .then((response) => setPost(response.data.value))
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // ---- Update Post data by id------------
  const updateData = async () => {
    try {
      await axios
        .post(`http://localhost:8000/api/admin/update/${id}`, post)
        .then((response) => {
          if (response.data.status === "success") {
            setUpdateMessage(response.data.updateMessage);
            console.log(response.data.value);
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

  // console.log(post);

  // handle change
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("here", post);
    updateData();
  };

  let updateMsg;
  if (updateMessage !== "") {
    updateMsg = (
      <div class="container text-center alert alert-success alert-dismissible alert-block">
        <button type="button" class="close" data-dismiss="alert">
          ×
        </button>
        <strong>
          {updateMessage}
          <a href="/postAdmin" class="alert-link">
            Click Here to see Updated Post...
          </a>
        </strong>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-primary text-center">Edit You Post Here:</h2>
      <br />
      {updateMsg}
      <div className="container">
        <form onSubmit={handleSubmit} method="POST" className="shadow-lg p-4">
          <div className="form-group w-50">
            <label for="inputTitle4">
              Title
              <span className="text-danger">
                <strong>*</strong>
              </span>
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="inputTitle4"
              placeholder="Enter Post Title"
              value={post.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="exampleFormControlTextarea1">Post Content</label>
            <textarea
              className="form-control"
              name="content"
              id="exampleFormControlTextarea1"
              placeholder="Write something about it"
              value={post.content}
              onChange={handleChange}
              rows="10"
            ></textarea>
          </div>

          <div className="row form-group">
            <div className="col-md-6">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Update Post
              </button>
            </div>
            <div className="col-md-6">
              <a href="/postAdmin" className="btn btn-danger btn-lg btn-block">
                Cancel
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
