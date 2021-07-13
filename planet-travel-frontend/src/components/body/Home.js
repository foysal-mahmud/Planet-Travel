/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Home Page UI Design with Visitor Message send form.
               - Carousel Slider, Welcome board, Popular destination with images
               - Location map, All Branches url Link
               - Footer which contains Contact us forms, Address & Quick links                                   
                                           
===================================================================*/

import React, { useState } from "react";
import axios from "axios";
import bgImage1 from "../../images/bg1.jpg";
import bgImage2 from "../../images/bg2.jpg";
import bgImage3 from "../../images/bg3.jpg";
import travel1 from "../../images/travel1.jpg";
import travel2 from "../../images/travel2.jpg";
import travel3 from "../../images/travel3.jpg";

const Home = () => {
  const [visitorMessage, setVisitorMessage] = useState([]);
  const [messageSuccess, setMessageSuccess] = useState("");

  const sendMessage = async () => {
    try {
      await axios
        .post(`http://localhost:8000/api/visitorMessage`, visitorMessage)
        .then((response) => {
          if (response.data.status === "success") {
            setMessageSuccess(response.data.message);
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

  let successMsg;
  if (messageSuccess !== "") {
    successMsg = (
      <div class="container text-center alert alert-success alert-dismissible alert-block">
        <button type="button" class="close" data-dismiss="alert">
          ×
        </button>
        <strong>{messageSuccess}</strong>
      </div>
    );
  }

  const handleChange = (e) => {
    setVisitorMessage({ ...visitorMessage, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
    e.target.reset();
  };

  return (
    <div className="container-fluid">
      {/* Carousel */}
      <div
        id="carouselExampleCaptions"
        class="carousel slide"
        data-ride="carousel"
      >
        <ol class="carousel-indicators">
          <li
            data-target="#carouselExampleCaptions"
            data-slide-to="0"
            class="active"
          ></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={bgImage1} class="d-block w-100 img-fluid" alt="..." />
            <div class="carousel-caption d-none d-md-block">
              <h3 className="text-dark">
                “The world is a book and those who do not travel read only one
                page.”
              </h3>
              <h5 className="text-dark">~ Saint Augustine</h5>
            </div>
          </div>
          <div class="carousel-item">
            <img src={bgImage2} class="d-block w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block">
              <h3 className="text-light">
                “Like all great travellers, I have seen more than I remember and
                remember more than I have seen.”
              </h3>
              <h5 className="text-light">~ Benjamin Disraeli</h5>
            </div>
          </div>
          <div class="carousel-item">
            <img src={bgImage3} class="d-block w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block">
              <h3 className="text-light">
                “Jobs fill your pocket but adventures fill your soul.”
              </h3>
              <h5 className="text-light">~ Jamie Lyn Beatty</h5>
            </div>
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleCaptions"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleCaptions"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>

      <br />
      <div className="jumbotron shadow-lg p-3">
        <h1 className="display-4 text-center">Planet Travel</h1>
        <h4 className="text-center">
          "Best travelling agency to explore the world"
        </h4>
        <hr className="my-4" />
        <div className="container-fluid">
          <h4>About US:</h4>
          <p>
            <strong>Planet Travel</strong> was established in 2021. Planet
            Travel provides some of the best and rare places travelling
            opportunities around the world. We offers different travelling
            packages with some blog content about that place so that you can
            easily figure out the place overall structure and also can make a
            Reservation for that package. We offer the best tour packages with
            cheap cost.
          </p>
        </div>
      </div>

      {/* -- Three popular destination -- */}
      <hr />
      <h2 class="text-center text-info">Popular Destination</h2>
      <hr />
      <div className="container-fluid">
        <div class="card-deck mb-4 text-center">
          <div class="card shadow-lg bg-white rounded">
            <img
              class="card-img-top"
              src={travel1}
              height="300px"
              width="200px"
              alt="blank"
            />
            <div class="card-body bg-info">
              <h5 class="card-title">The Pragser Wildsee</h5>
              <p class="card-text ">
                The Pragser Wildsee, or Lake Prags, Lake Braies (Italian: Lago
                di Braies; German: Pragser Wildsee) is a lake in the Prags
                Dolomites in South Tyrol, Italy. It belongs to the municipality
                of Prags which is located in the Prags Valley.
              </p>
            </div>
            <div class="card-footer">
              <small class="text-muted">
                <span className="text-info">Location: </span>Pragser Wildsee,
                Italy
              </small>
            </div>
          </div>
          &nbsp;&nbsp;&nbsp;
          <div class="card shadow-lg bg-white rounded">
            <img
              class="card-img-top"
              src={travel2}
              height="300px"
              width="200px"
              alt="blank"
            />
            <div class="card-body bg-warning">
              <h5 class="card-title">Machu Picchu, Peru</h5>
              <p class="card-text">
                The journey to Machu Picchu typically starts in the mountain
                city of Cusco, which was the capital city of the Inca Empire.
                Cusco is a fascinating place to explore-be sure to spend a few
                days there before or after your Machu Picchu adventure.
              </p>
            </div>
            <div class="card-footer">
              <small class="text-muted">
                <span className="text-warning">Location: </span>Northwest of
                Cuzco, Peru
              </small>
            </div>
          </div>
          <div class="card shadow-lg bg-white rounded">
            <img
              class="card-img-top"
              src={travel3}
              height="300px"
              width="200px"
              alt="blank"
            />
            <div class="card-body bg-success">
              <h5 class="card-title">The Inca Civilization</h5>
              <p class="card-text">
                The Inca Empire was a vast empire that flourished in the Andean
                region of South America from the early 15th century A.D.. Even
                after the conquest, Inca leaders continued to resist the
                Spaniards up until 1572, when its last city, Vilcabamba, was
                captured.
              </p>
            </div>
            <div class="card-footer">
              <small class="text-muted">
                <span className="text-success">Location: </span>Chile, North of
                the Maule River.
              </small>
            </div>
          </div>
        </div>
      </div>

      <hr />
      {/* -- Image Gallery -- */}
      <div class="container-fluid bg-light p-4 mb-4">
        <section class="">
          <div class="row">
            <div class="col-lg-2 col-md-12 mb-4 mb-md-0">
              <div
                class="bg-image hover-overlay ripple shadow-1-strong rounded"
                data-ripple-color="light"
              >
                <img
                  src="https://mdbootstrap.com/img/new/fluid/city/113.jpg"
                  class="w-100"
                  alt="pic gallery"
                />
                <a href="#!">
                  <div
                    class="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                  ></div>
                </a>
              </div>
            </div>
            <div class="col-lg-2 col-md-12 mb-4 mb-md-0">
              <div
                class="bg-image hover-overlay ripple shadow-1-strong rounded"
                data-ripple-color="light"
              >
                <img
                  src="https://mdbootstrap.com/img/new/fluid/city/111.jpg"
                  class="w-100"
                  alt="pic gallery"
                />
                <a href="#!">
                  <div
                    class="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                  ></div>
                </a>
              </div>
            </div>
            <div class="col-lg-2 col-md-12 mb-4 mb-md-0">
              <div
                class="bg-image hover-overlay ripple shadow-1-strong rounded"
                data-ripple-color="light"
              >
                <img
                  src="https://mdbootstrap.com/img/new/fluid/city/112.jpg"
                  class="w-100"
                  alt="pic gallery"
                />
                <a href="#!">
                  <div
                    class="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                  ></div>
                </a>
              </div>
            </div>
            <div class="col-lg-2 col-md-12 mb-4 mb-md-0">
              <div
                class="bg-image hover-overlay ripple shadow-1-strong rounded"
                data-ripple-color="light"
              >
                <img
                  src="https://mdbootstrap.com/img/new/fluid/city/114.jpg"
                  class="w-100"
                  alt="pic gallery"
                />
                <a href="#!">
                  <div
                    class="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                  ></div>
                </a>
              </div>
            </div>
            <div class="col-lg-2 col-md-12 mb-4 mb-md-0">
              <div
                class="bg-image hover-overlay ripple shadow-1-strong rounded"
                data-ripple-color="light"
              >
                <img
                  src="https://mdbootstrap.com/img/new/fluid/city/115.jpg"
                  class="w-100"
                  alt="pic gallery"
                />
                <a href="#!">
                  <div
                    class="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                  ></div>
                </a>
              </div>
            </div>
            <div class="col-lg-2 col-md-12 mb-4 mb-md-0">
              <div
                class="bg-image hover-overlay ripple shadow-1-strong rounded"
                data-ripple-color="light"
              >
                <img
                  src="https://mdbootstrap.com/img/new/fluid/city/116.jpg"
                  class="w-100"
                  alt="pic gallery"
                />
                <a href="#!">
                  <div
                    class="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                  ></div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <hr />
      <div class="row">
        <div class="col-md-6 mb-2">
          <div class="card card-cascade narrower">
            <div class="view view-cascade gradient-card-header peach-gradient">
              <h5 class="mb-0 text-center">Planet Travel Location Map</h5>

              <div className="container ml-5">
                <div className="card-body card-body-cascade text-center">
                  {/* --Google map-- */}
                  <div
                    style={{
                      overflow: "hidden",
                      background: "none!important",
                      height: "258px",
                      width: "498px",
                    }}
                  >
                    <iframe
                      title="map"
                      width="498"
                      height="258"
                      src="https://maps.google.com/maps?q=BJIT%20group,%20Dhaka&t=&z=11&ie=UTF8&iwloc=&output=embed"
                      frameborder="0"
                      scrolling="no"
                      marginheight="0"
                      marginwidth="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6 mb-2">
          <div class="card card-cascade narrower">
            <div class="card-body card-body-cascade text-center">
              <h4>Planet Travel other Branches:</h4>
              <ul class="list-group">
                <li class="list-group-item">
                  <a href="#" target="_blank">
                    Planet Travel - Japan
                  </a>
                </li>
                <li class="list-group-item">
                  <a href="#" target="_blank">
                    Planet Travel - USA
                  </a>
                </li>
                <li class="list-group-item">
                  <a href="#" target="_blank">
                    Planet Travel - Canada
                  </a>
                </li>
                <li class="list-group-item">
                  <a href="#" target="_blank">
                    Planet Travel - Singapore
                  </a>
                </li>
                <li class="list-group-item">
                  <a href="#" target="_blank">
                    Planet Travel - Germany
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div
        className="jumbotron-fluid p-3 rounded"
        style={{ backgroundColor: "#38353d" }}
      >
        <div class="container-fluid p-2">
          <div class="row">
            <div class="col-lg-5 col-md-12 mb-4 mb-md-0">
              <h5 class="text-uppercase text-light">Contact US</h5>
              {successMsg}
              <form onSubmit={handleSubmit} className="shadow-lg p-2">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="visitorEmail"
                    placeholder="Enter Your Email Address"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="visitorMessage"
                    placeholder="Write your Message..."
                    onChange={handleChange}
                    rows="2"
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-success btn-lg">
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto">
              <h5 class="text-uppercase text-light mb-4 ">ADDRESS</h5>
              <p className="text-light">
                <i class="fa fa-home mr-3"></i> Global Office: Tokyo, Japan
              </p>
              <p className="text-light">
                <i class="fa fa-home mr-3"></i> Dhaka, Bangladesh
              </p>
              <p className="text-light">
                <i class="fa fa-envelope mr-3"></i>{" "}
                foysal.planet.travel@gmail.com
              </p>
              <p className="text-light">
                <i class="fa fa-phone mr-3"></i> +88 01711223344
              </p>
              <p className="text-light">
                <i class="fa fa-print mr-3"></i> +88 01911223344
              </p>
            </div>

            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 class="text-uppercase mb-3 text-light">Quick Links</h5>

              <ul class="list-unstyled">
                <li class="mb-2">
                  <a href="/" class="text-white ">
                    Home
                  </a>
                </li>
                <hr className="p-0" />
                <li class="mb-2">
                  <a href="/read" class="text-white mb-2">
                    Travelling Stories
                  </a>
                </li>
                <hr className="p-0" />
                <li class="mb-2">
                  <a href="/memberclub/user" class="text-white mb-2">
                    Member Club
                  </a>
                </li>
                <hr className="p-0" />
                <li class="mb-2">
                  <a href="/tour/package" class="text-white mb-2">
                    Tour Packages
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* <!-- Grid container --> */}
        <div class="container p-2 pb-0 text-center">
          {/* <!-- Section: Social media --> */}
          <section class="mb-4">
            {/* <!-- Facebook --> */}
            <a
              class="btn btn-primary btn-floating m-1"
              style={{ backgroundColor: "#3b5998" }}
              href="#!"
              role="button"
            >
              {/* fa-spin fa-1x */}
              <i class="fa fa-facebook-f"></i>
            </a>

            {/* <!-- Twitter --> */}
            <a
              class="btn btn-primary btn-floating m-1"
              style={{ backgroundColor: "#55acee" }}
              href="#!"
              role="button"
            >
              <i className="fa fa-twitter" aria-hidden="true"></i>
            </a>

            {/* <!-- Google --> */}
            <a
              class="btn btn-primary btn-floating m-1"
              style={{ backgroundColor: "#dd4b39" }}
              href="#!"
              role="button"
            >
              <i class="fa fa-google"></i>
            </a>

            {/* <!-- Instagram --> */}
            <a
              class="btn btn-primary btn-floating m-1"
              style={{ backgroundColor: "#ac2bac" }}
              href="#!"
              role="button"
            >
              <i class="fa fa-instagram"></i>
            </a>

            {/* <!-- Linkedin --> */}
            <a
              class="btn btn-primary btn-floating m-1"
              style={{ backgroundColor: "#0082ca" }}
              href="#!"
              role="button"
            >
              <i className="fa fa-linkedin"></i>
            </a>

            {/* <!-- Github --> */}
            <a
              class="btn btn-primary btn-floating m-1"
              style={{ backgroundColor: "#333333" }}
              href="#!"
              role="button"
            >
              <i class="fa fa-github"></i>
            </a>
          </section>
          {/* <!-- Section: Social media --> */}
        </div>
        {/* <!-- Grid container --> */}
      </div>

      <br />
      <br />
    </div>
  );
};

export default Home;
