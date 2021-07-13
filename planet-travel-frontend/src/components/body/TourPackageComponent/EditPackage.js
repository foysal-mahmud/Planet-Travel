/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Update Tour Package - ADMIN part.                         
                                           
===================================================================*/

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../../storeContext/StoreContext";
import { useParams } from "react-router-dom";

const EditPackage = () => {
  //-- Context Define ----
  const { allPost } = useContext(StoreContext);

  const [allPackage, setAllPackage] = useState({
    packageTitle: "",
    packagePrice: "",
    packagePost: "",
    packageDay: "",
    tourDate: "",
  });

  let { id } = useParams();

  const [updatePackageMessage, setUpdatePackageMessage] = useState("");

  // ---- Get Post data by id------------
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/admin/editPackage/" + id)
      .then((response) => setAllPackage(response.data.value))
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // ---- Update Post data by id------------
  const updateData = async () => {
    try {
      await axios
        .post(`http://localhost:8000/api/admin/updatePackage/${id}`, allPackage)
        .then((response) => {
          if (response.data.status === "success") {
            setUpdatePackageMessage(response.data.updateMessage);
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
    setAllPackage({ ...allPackage, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("here", post);
    updateData();
  };

  let updateMsg;
  if (updatePackageMessage !== "") {
    updateMsg = (
      <div class="container text-center alert alert-success alert-dismissible alert-block">
        <button type="button" class="close" data-dismiss="alert">
          ×
        </button>
        <strong>
          {updatePackageMessage}
          <a href="/packageAdmin" class="alert-link">
            Click Here to see Updated Post...
          </a>
        </strong>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-primary text-center">Update Tour Package:</h2>
      <br />
      {updateMsg}
      <div className="container">
        <form onSubmit={handleSubmit} method="POST" className="shadow-lg p-4">
          <div className="row">
            <div className="col-md-6 form-group w-50">
              <label for="inputState">
                Available Travelling Stories{" "}
                <span className="text-danger">
                  <strong>*</strong>
                </span>
              </label>
              <select
                id="inputState"
                name="packagePost"
                className="form-control"
                onChange={handleChange}
                required
              >
                {allPost
                  .filter((post) => post.id == allPackage.packagePost)
                  .map((filterPost) => {
                    return (
                      <option value={filterPost.id} selected>
                        {filterPost.title}
                      </option>
                    );
                  })}
                {allPost.map((post) => {
                  return <option value={post.id}>{post.title}</option>;
                })}
              </select>
            </div>

            <div className="col-md-6 form-group w-50">
              <label for="inputTitle4">
                Package Title
                <span className="text-danger">
                  <strong>*</strong>
                </span>
              </label>
              <input
                type="text"
                className="form-control"
                name="packageTitle"
                id="inputTitle4"
                placeholder="Enter Package Name"
                value={allPackage.packageTitle}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <label for="inputCity">
                Price{" "}
                <span className="text-danger">
                  <strong>*</strong>
                </span>
              </label>
              <input
                type="text"
                name="packagePrice"
                className="form-control"
                placeholder="Enter Package Price"
                value={allPackage.packagePrice}
                onChange={handleChange}
                id="inputCity"
              />
              <small class="form-text text-muted">Like "$1200"</small>
            </div>

            <div className="form-group col-md-4">
              <label for="inputMobile">
                Duration{" "}
                <span className="text-danger">
                  <strong>*</strong>
                </span>
              </label>
              <input
                type="text"
                name="packageDay"
                className="form-control"
                placeholder="Enter Total duration"
                value={allPackage.packageDay}
                onChange={handleChange}
                id="inputMobile"
              />
              <small class="form-text text-muted">
                Total amount of tour days. Like "3-4 days"
              </small>
            </div>

            <div className="form-group col-md-4">
              <label for="inputMobile">
                Tour Date{" "}
                <span className="text-danger">
                  <strong>*</strong>
                </span>
              </label>
              <input
                type="date"
                name="tourDate"
                className="form-control"
                placeholder="Enter your Mobile number"
                value={allPackage.tourDate}
                onChange={handleChange}
                id="inputMobile"
              />
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-6">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Update Tour Package
              </button>
            </div>
            <div className="col-md-6">
              <a
                href="/packageAdmin"
                className="btn btn-danger btn-lg btn-block"
              >
                Cancel
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPackage;
