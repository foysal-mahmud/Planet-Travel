/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Create Travelling Story UI Design. 
              - Form value: Post Title, Post Content and Post Picture                           
                                           
===================================================================*/

import React, { useState } from "react";
import axios from "axios";

const CreatePost = (props) => {
  //-- Context Define ----
  // const { post, setPost, message, postData } = useContext(StoreContext);

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");

  async function postData(event) {
    event.preventDefault();
    console.log(postTitle, postContent, file);

    const formData = new FormData();

    formData.append("title", postTitle);
    formData.append("content", postContent);
    formData.append("file", file);

    try {
      await axios
        .post("http://127.0.0.1:8000/api/admin/create", formData)
        .then((response) => {
          if (response.data.status === "success") {
            setMessage(response.data.message);
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
  }

  let alertMsg;
  if (message !== "") {
    alertMsg = (
      <div class="container text-center alert alert-success alert-dismissible alert-block">
        <button type="button" class="close" data-dismiss="alert">
          ×
        </button>
        <strong>
          {message}
          <a href="/postAdmin" class="alert-link">
            Click Here to see All Post...
          </a>
        </strong>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-primary text-center">Write New Post Here:</h2>
      <br />
      {alertMsg}
      <div className="container w-75">
        <form className="shadow-lg p-4">
          <div className="row">
            <div className="col-md-6 form-group w-50">
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
                onChange={(e) => setPostTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>
                {" "}
                Post Image{" "}
                <span className="text-danger">
                  <strong>*</strong>
                </span>
              </label>
              <input
                type="file"
                placeholder="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <label for="exampleFormControlTextarea1">
              Post Content
              <span className="text-danger">
                <strong>*</strong>
              </span>
            </label>
            <textarea
              className="form-control"
              name="content"
              id="exampleFormControlTextarea1"
              placeholder="Write something about it"
              onChange={(e) => setPostContent(e.target.value)}
              rows="10"
            ></textarea>
          </div>

          <div className="row form-group">
            <div className="col-md-6">
              <button
                type="submit"
                className="btn btn-success btn-lg btn-block"
                onClick={postData}
              >
                Submit Post
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

export default CreatePost;
