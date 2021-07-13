/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Navigation bar UI Design with proper Route.  
              - Search club member by name                                  
                                           
===================================================================*/

import { Link } from "react-router-dom";
import React from "react";
import { StoreContext } from "../../storeContext/StoreContext";
import { useState, useContext } from "react";
import Marquee from "react-fast-marquee";

const Navigation = () => {
  //-- Context Define ----
  const { username, setUsername, getSearchData } = useContext(StoreContext);
  const [logoutMessage, setLogoutMessage] = useState("");

  const handleLogout = () => {
    // remove all
    localStorage.clear();
    setUsername("");
    setLogoutMessage(".......Successfully Logout........");
  };

  let logoutMsg;
  if (logoutMessage !== "") {
    logoutMsg = (
      <div class="container text-center alert alert-danger alert-dismissible alert-block">
        <button type="button" class="close" data-dismiss="alert">
          ×
        </button>
        <strong>
          {logoutMessage}
          <a href="/login" class="alert-link">
            Click Here to Login...
          </a>
        </strong>
      </div>
    );
  }

  // ------ Search Member by Name -----------
  const searchChangeHandler = (event) => {
    getSearchData(event.target.value);
  };

  let showAdminName;
  if (localStorage.getItem("isLogin") === "isLogin") {
    showAdminName = (
      <>
        <li className="nav-item">
          <Link
            className="nav-link btn btn-outline-primary text-light"
            to="/admin"
          >
            Admin
          </Link>
        </li>
        &nbsp;&nbsp;&nbsp;
        <li className="nav-item dropdown">
          <Link
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="text-warning">
              <strong>{username}</strong>
            </span>
          </Link>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <div class="dropdown-divider"></div>
            <Link
              className="nav-link btn btn-block btn-outline-danger text-dark text-center"
              onClick={handleLogout}
            >
              Log Out
            </Link>
          </div>
        </li>
      </>
    );
  }

  let showUserName;
  if (localStorage.getItem("isLogin") === "isUserLogin") {
    showUserName = (
      <>
        <li className="nav-item dropdown">
          <Link
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="text-warning">
              <strong>{username}</strong>
            </span>
          </Link>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link class="dropdown-item" to="/profile">
              Your Profile
            </Link>
            <Link class="dropdown-item" to="/userReservation">
              Your Reservation
            </Link>
            <div class="dropdown-divider"></div>
            <Link
              className="nav-link btn btn-block btn-outline-danger text-dark text-center"
              onClick={handleLogout}
            >
              Log Out
            </Link>
          </div>
        </li>
      </>
    );
  }

  let showLogin;
  if (
    localStorage.getItem("isLogin") !== "isLogin" &&
    localStorage.getItem("isLogin") !== "isUserLogin"
  ) {
    showLogin = (
      <>
        <li className="nav-item">
          <Link
            className="nav-link btn btn-outline-success text-light"
            to="/login"
          >
            Login
          </Link>
        </li>
        &nbsp;&nbsp;&nbsp;
        <li className="nav-item">
          <Link
            className="nav-link btn btn-outline-warning text-light"
            to="/registration"
          >
            Registration
          </Link>
        </li>
      </>
    );
  }

  return (
    <div className="container-fluid">
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#1b1d21" }}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand text-warning" href="#">
            <strong>Planet Travel</strong>
          </Link>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link className="nav-link btn btn-outline-info text-light" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            &nbsp;&nbsp;&nbsp;
            <li className="nav-item">
              <Link
                className="nav-link btn btn-outline-info text-light"
                to="/read"
              >
                Travelling Story
              </Link>
            </li>
            {/* &nbsp;&nbsp;&nbsp;
            <li className="nav-item">
              <Link
                className="nav-link btn btn-outline-primary text-light"
                to="/admin"
              >
                Admin
              </Link>
            </li> */}
            &nbsp;&nbsp;&nbsp;
            <li className="nav-item">
              <Link
                className="nav-link btn btn-outline-info text-light"
                to="/memberclub/user"
              >
                Member Club
              </Link>
            </li>
            &nbsp;&nbsp;&nbsp;
            <li className="nav-item">
              <Link
                className="nav-link btn btn-outline-info text-light"
                to="/tour/package"
              >
                Tour Packages
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            {showLogin}
            &nbsp;&nbsp;&nbsp;
            {showAdminName}
            {showUserName}
          </ul>
          &nbsp;&nbsp;
          <form method="GET" className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              name="searchUser"
              onChange={searchChangeHandler}
              type="search"
              placeholder="Search by Name"
              aria-label="Search"
              required
            />
            <Link to="/searchUser">
              <button
                className="btn btn-outline-primary my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </Link>
          </form>
        </div>
      </nav>

      {/* Marquee */}
      <Marquee speed="50" pauseOnHover="true" className="text-secondary">
        When you travel, the whole world opens up. Travel helped us to
        understand the meaning of life and it has helped us become better
        people. Each time we travel, we see the world with new eyes.
      </Marquee>

      {logoutMsg}
    </div>
  );
};

export default Navigation;
