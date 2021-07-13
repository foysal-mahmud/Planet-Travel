/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Travelling Story Details.
               - Display all related comments below post.
               - Comment box to comment on this post.
                - Without authentication, Comment button will be disable.                            
                                           
===================================================================*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";

const DetailsPost = () => {
  let { id } = useParams();

  const [postDetails, setPostDetails] = useState([]);
  const [postComment, setPostComment] = useState({
    comment_content: "",
    post_id: id,
    comment_username: localStorage.getItem("username"),
  });
  const [commentMessage, setCommentMessage] = useState("");
  const [allComment, setAllComment] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/post/details/" + id)
      .then((response) => setPostDetails(response.data.value))
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const addComment = async () => {
    try {
      await axios
        .post(`http://localhost:8000/api/post/storeComment`, postComment)
        .then((response) => {
          if (response.data.status === "success") {
            setCommentMessage(response.data.message);
            setAllComment(response.data.value);
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

  // ---- Get Post data by id------------
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/post/getComment/" + id)
      .then((response) => setAllComment(response.data.value))
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleChange = (e) => {
    setPostComment({ ...postComment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addComment();
    e.target.reset();
  };

  let commentMsg;
  if (commentMessage !== "") {
    commentMsg = (
      <div class="container text-center alert alert-info alert-dismissible alert-block">
        <button type="button" class="close" data-dismiss="alert">
          ×
        </button>
        <strong>{commentMessage}</strong>
      </div>
    );
  }

  let showCommentBox;
  if (
    localStorage.getItem("isLogin") === "isLogin" ||
    localStorage.getItem("isLogin") === "isUserLogin"
  ) {
    showCommentBox = (
      <div className="form-group">
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </div>
    );
  } else {
    showCommentBox = (
      <div className="form-group">
        <button className="btn btn-success" disabled>
          Submit
        </button>
        <small class="form-text  text-danger">
          You have to <strong>log in </strong>for comment on this post
        </small>
      </div>
    );
  }

  return (
    <div>
      <div className="container">
        <br />
        <div className="jumbotron shadow-lg bg-light p-3" key={postDetails.id}>
          <div className="col-md-12">
            <h1 className="text-dark text-center">{postDetails.title}</h1>
            <span className="badge">
              Posted:&nbsp;
              {dateFormat(
                postDetails.created_at,
                "dddd, mmmm dS, yyyy, h:MM:ss TT"
              )}
            </span>
            <img
              src={"http://localhost:8000/" + postDetails.post_image_path}
              className="card-img-top"
              width="380px"
              height="500px"
              alt="User Pic"
            />
            <br />
            <br />
            <p className="text-wrap">
              <pre
                style={{
                  fontFamily: "sans-serif",
                  fontSize: "16px",
                  whiteSpace: "pre-wrap",
                  overflowWrap: "break-word",
                }}
              >
                {postDetails.content}
              </pre>
            </p>

            <hr />
            <div className="row">
              <div class="col-lg-5 col-md-12 mb-4 mb-md-0">
                {commentMsg}
                <h5 class="text-uppercase text-success text-center">
                  Comment Here
                </h5>
                <form onSubmit={handleSubmit} className="shadow-lg p-2">
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      name="comment_content"
                      placeholder="Write your comment..."
                      onChange={handleChange}
                      rows="2"
                      required
                    ></textarea>
                  </div>

                  {showCommentBox}
                </form>
              </div>
              <div class="col-lg-7 col-md-12 mb-4 mb-md-0">
                <h5 className="text-center text-info">
                  All Comments of This Post:
                  <hr />
                </h5>

                <div class="card-body">
                  {allComment.map((comment) => {
                    return (
                      <blockquote class="blockquote mb-0">
                        <p>{comment.comment_content}</p>
                        <footer class="blockquote-footer">
                          <span className="text-primary">
                            <strong>{comment.comment_username}</strong>
                          </span>
                          &nbsp; on &nbsp;
                          <cite title="Source Title">
                            {dateFormat(
                              comment.comment_date,
                              "dddd, mmmm dS, yyyy, h:MM:ss TT"
                            )}
                          </cite>
                        </footer>
                        <hr />
                      </blockquote>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default DetailsPost;
