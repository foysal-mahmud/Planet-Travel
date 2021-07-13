/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Display all Travelling Story.                            
                                           
===================================================================*/

import React, { useContext } from "react";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../storeContext/StoreContext";

const ShowAllPost = () => {
  //-- Context Define ----
  const { allPost } = useContext(StoreContext);

  return (
    <div>
      <br></br>
      <h1 className="text-center text-primary">Our Travelling Stories:</h1>{" "}
      <hr />
      <div className="container">
        {allPost.map((post) => {
          return (
            <div className="jumbotron shadow-lg bg-light p-3" key={post.id}>
              <div className="col-md-12">
                <h1 className="text-info">{post.title}</h1>
                <p>
                  {post.content.substring(0, 200)} &nbsp;
                  <Link to={`/post/details/${post.id}`}>
                    <span className="badge">
                      <h5 className="text-success">
                        Read more <i class="fa fa-chevron-down"></i>
                      </h5>
                    </span>
                  </Link>
                  &nbsp;
                </p>

                <div className="row">
                  <div className="col-md-5">
                    <span className="badge">
                      Posted:{" "}
                      {dateFormat(
                        post.created_at,
                        "dddd, mmmm dS, yyyy, h:MM:ss TT"
                      )}
                    </span>
                  </div>
                  <div class="col-md-6 text-right">
                    <span class="badge badge-primary">Primary</span>&nbsp;
                    <span class="badge badge-secondary">Secondary</span>&nbsp;
                    <span class="badge badge-success">Success</span>&nbsp;
                    <span class="badge badge-danger">Danger</span>&nbsp;
                    <span class="badge badge-warning">Warning</span>&nbsp;
                    <span class="badge badge-info">Info</span>&nbsp;
                    <span class="badge badge-dark">Dark</span>&nbsp;
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <br></br>
      <br></br>
    </div>
  );
};

export default ShowAllPost;
