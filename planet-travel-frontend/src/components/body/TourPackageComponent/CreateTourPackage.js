/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Create Tour Package - ADMIN part.
              - Fetch all Travelling Stories to link Tour Package.                           
                                           
===================================================================*/

import React, { useContext, useState } from "react";
import { StoreContext } from "../../../storeContext/StoreContext";
import axios from "axios";

const CreateTourPackage = (props) => {
  //-- Context Define ----
  const { allPost } = useContext(StoreContext);

  const [packageTitle, setPackageTitle] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [packagePost, setPackagePost] = useState("");
  const [packageDay, setPackageDay] = useState("");
  const [tourDate, setTourDate] = useState("");
  const [file, setFile] = useState("");

  const [message, setMessage] = useState("");

  async function postData(event) {
    event.preventDefault();

    console.log(packagePost);

    const formData = new FormData();

    formData.append("packageTitle", packageTitle);
    formData.append("packagePrice", packagePrice);
    formData.append("packagePost", packagePost);
    formData.append("packageDay", packageDay);
    formData.append("tourDate", tourDate);
    formData.append("file", file);

    try {
      await axios
        .post("http://127.0.0.1:8000/api/admin/addPackage", formData)
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
          <a href="/tour/package" class="alert-link">
            Click Here to see All Tour Package...
          </a>
        </strong>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-primary text-center">Add New Tour Package:</h2>
      <br />
      {alertMsg}
      <div className="container w-75">
        <form className="shadow-lg p-4">
          <div className="form-group w-50">
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
              onChange={(e) => setPackagePost(e.target.value)}
              required
            >
              <option selected>Must Select a Travelling Story</option>
              {allPost.map((post) => {
                return <option value={post.id}>{post.title}</option>;
              })}
            </select>
            <small class="form-text text-muted">
              Not found. Then First add a Travelling story about this Package
              Place.
            </small>
          </div>
          <div className="row">
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
                onChange={(e) => setPackageTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>
                Tour Package Image
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
                onChange={(e) => setPackagePrice(e.target.value)}
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
                onChange={(e) => setPackageDay(e.target.value)}
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
                onChange={(e) => setTourDate(e.target.value)}
                id="inputMobile"
              />
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-6">
              <button
                type="submit"
                className="btn btn-success btn-lg btn-block"
                onClick={postData}
              >
                Submit Tour Package
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

export default CreateTourPackage;
