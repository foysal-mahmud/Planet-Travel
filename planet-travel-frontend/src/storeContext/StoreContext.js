/*===============================================================
## Project Name: Planet Travel
# Author: Md. Foysal Mahmud

# Description: Context API - StoreContext
              - Authentication 
              - Fetch all travelling stories.
              - Create, Update, Delete, Hide operation on Travelling Story.
              - Fetch all Club Member
              - Fetch all Tour Packages. 
              - Create, Update, Delete, Hide operation on Tour Packages. 
              - Single User Profile
              - Fetch all User Reservation Data.
              - Search Club Member by name.                                
                                           
===================================================================*/

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  // -------- Admin Count All ---------------
  const [countPost, setCountPost] = useState("");
  const [countPackage, setCountPackage] = useState("");
  const [countMember, setCountMember] = useState("");
  const [countReservation, setCountReservation] = useState("");
  const [countMessages, setCountMessages] = useState("");

  const getCount = async () => {
    try {
      await axios
        .get("http://localhost:8000/api/getCount")
        .then((response) => {
          if (response.data.status === "success") {
            setCountPost(response.data.countPost);
            setCountPackage(response.data.countPackage);
            setCountMember(response.data.countMember);
            setCountReservation(response.data.countPendingReservation);
            setCountMessages(response.data.countMessages);
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

  useEffect(() => {
    getCount();
  }, []);

  // For Auth
  const [username, setUsername] = useState("");

  // =========== COMPONENT -> AdminHome.js ===========================
  // -------- All Post -------------
  const [allPost, setAllPost] = useState([]);

  const getAllPost = () => {
    axios
      .get("http://localhost:8000/api/read")
      .then((response) => setAllPost(response.data.value))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllPost();
  }, []);

  // ----- POST - Delete Button Action ----------------
  const [deleteMessage, setDeleteMessage] = useState("");

  const deleteData = async (id) => {
    try {
      await axios
        .get("http://localhost:8000/api/admin/delete/" + id)
        .then((response) => {
          if (response.data.status === "success") {
            setDeleteMessage(response.data.message);
            setAllPost(response.data.value);
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

  // ---------- Trash Button Action ------------------
  const [trashMessage, setTrashMessage] = useState("");

  const trashData = async (id) => {
    try {
      await axios
        .get("http://localhost:8000/api/admin/trash/" + id)
        .then((response) => {
          if (response.data.status === "success") {
            setTrashMessage(response.data.trashMessage);
            setAllPost(response.data.value);
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

  // =========== COMPONENT -> CreatePost.js ========================
  // ----------- Post Data --------------
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  const [message, setMessage] = useState("");

  const postData = async () => {
    try {
      await axios
        .post("http://localhost:8000/api/admin/create", post)
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
  };

  // =========== COMPONENT -> TrashHome.js POST ========================
  //------ Get Trash Post ----------
  const [allTrashPost, setAllTrashPost] = useState([]);

  const getData = async () => {
    try {
      await axios
        .get("http://localhost:8000/api/admin/readTrash")
        .then((response) => {
          if (response.data.status === "success") {
            setAllTrashPost(response.data.value);
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

  useEffect(() => {
    getData();
  }, []);

  // ---------- Delete Trash Post ---------------
  const [deleteTrashMessage, setDeleteTrashMessage] = useState("");

  const deleteTrashData = async (id) => {
    try {
      await axios
        .get("http://localhost:8000/api/admin/deletePermanently/" + id)
        .then((response) => {
          if (response.data.status === "success") {
            setDeleteTrashMessage(response.data.deleteMessage);
            setAllTrashPost(response.data.value);
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

  /// ------------- Restore Trash Post ------------
  const [restoreTrashMessage, setTrashRestoreMessage] = useState("");

  const restoreTrashData = async (id) => {
    try {
      await axios
        .get("http://localhost:8000/api/admin/restore/" + id)
        .then((response) => {
          if (response.data.status === "success") {
            setTrashRestoreMessage(response.data.restoreMessage);
            setAllTrashPost(response.data.value);
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

  //--------------------------------------------------
  //--------------------------------------------------

  // =========== COMPONENT -> AddMember.js ========================
  // ----- Add User------------
  const [user, setUser] = useState([]);

  const [userMessage, setUserMessage] = useState("");

  const addData = async () => {
    try {
      await axios
        .post(`http://localhost:8000/api/se/insert`, user)
        .then((response) => {
          if (response.data.status === "success") {
            setUserMessage(response.data.message);
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

  // ----- Authenticated User Profile -------
  const [profileUser, setProfileUser] = useState([
    {
      name: "",
      email: "",
    },
  ]);

  const getUserProfile = async (userId) => {
    try {
      await axios
        .get("http://localhost:8000/api/user/profile/" + userId)
        .then((response) => {
          if (response.data.status === "success") {
            setProfileUser(response.data.value);
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

  //================== TourPackage.js =============
  // get all tour packages
  const [allPackage, setAllPackage] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/admin/readPackage")
      .then((response) => setAllPackage(response.data.value))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // ----- PACKAGE - Delete Button Action ----------------
  const [deletePackageMessage, setDeletePackageMessage] = useState("");

  const deletePackage = async (id) => {
    try {
      await axios
        .get("http://localhost:8000/api/packageAdmin/delete/" + id)
        .then((response) => {
          if (response.data.status === "success") {
            setDeletePackageMessage(response.data.message);
            setAllPackage(response.data.value);
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

  // ---------- PACKAGE - Trash Button Action ------------------
  const [trashPackageMessage, setTrashPackageMessage] = useState("");

  const trashPackage = async (id) => {
    try {
      await axios
        .get("http://localhost:8000/api/packageAdmin/trash/" + id)
        .then((response) => {
          if (response.data.status === "success") {
            setTrashPackageMessage(response.data.trashPackageMessage);
            setAllPackage(response.data.value);
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

  // =========== COMPONENT -> TrashPackage.js PACKAGE ========================
  //------ Get Trash Package ----------
  const [allPackageTrash, setAllPackageTrash] = useState([]);

  const getPackageTrashData = async () => {
    try {
      await axios
        .get("http://localhost:8000/api/admin/readPackageTrash")
        .then((response) => {
          if (response.data.status === "success") {
            setAllPackageTrash(response.data.value);
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

  useEffect(() => {
    getPackageTrashData();
  }, []);

  // ---------- Delete Trash Post ---------------
  const [deletePackageTrashMessage, setDeletePackageTrashMessage] =
    useState("");

  const deletePackageTrashData = async (id) => {
    try {
      await axios
        .get("http://localhost:8000/api/admin/packageDeletePermanently/" + id)
        .then((response) => {
          if (response.data.status === "success") {
            setDeletePackageTrashMessage(response.data.deleteMessage);
            setAllPackageTrash(response.data.value);
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

  /// ------------- Restore Trash Post ------------
  const [restorePackageTrashMessage, setPackageTrashRestoreMessage] =
    useState("");

  const restorePackageTrashData = async (id) => {
    try {
      await axios
        .get("http://localhost:8000/api/admin/packageRestore/" + id)
        .then((response) => {
          if (response.data.status === "success") {
            setPackageTrashRestoreMessage(response.data.restoreMessage);
            setAllPackageTrash(response.data.value);
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

  // =========== COMPONENT -> Reservation.js ========================
  // ----- Make a Reservation------------
  const [userReservation, setUserReservation] = useState([]);

  const [userReservationMessage, setUserReservationMessage] = useState("");

  const addReservationData = async (userId) => {
    try {
      await axios
        .post(
          `http://localhost:8000/api/user/reservation/${userId}`,
          userReservation
        )
        .then((response) => {
          if (response.data.status === "success") {
            setUserReservationMessage(response.data.message);
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

  // ---------- User Reservation ---------------
  const [reservationData, setReservationData] = useState([]);

  const getReservationData = async () => {
    try {
      await axios
        .get("http://localhost:8000/api/package/reservation")
        .then((response) => {
          if (response.data.status === "success") {
            setReservationData(response.data.value);
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

  useEffect(() => {
    getReservationData();
  }, []);

  // -----------  Search Member club User -----------

  const [searchUser, setSearchUser] = useState([]);

  const getSearchData = async (searchItem) => {
    try {
      await axios
        .get(`http://localhost:8000/api/searchUser/${searchItem}`)
        .then((response) => {
          if (response.data.status === "success") {
            setSearchUser(response.data.value);
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

  // --------- Main Provider--------------
  return (
    <StoreContext.Provider
      value={{
        username, // Authentication
        setUsername,
        allPost, // fetch all post
        deleteData, // delete post
        deleteMessage,
        trashData, // trash a post
        trashMessage,
        message, // submit a post to DB
        postData,
        post,
        setPost,
        allTrashPost, // All Trash Post & alert message
        deleteTrashMessage,
        deleteTrashData,
        restoreTrashMessage,
        restoreTrashData,
        user, // fetch all member
        setUser,
        addData,
        userMessage,
        profileUser, //profile info
        setProfileUser,
        getUserProfile,
        allPackage, // Tour Packages
        deletePackage,
        trashPackage,
        trashPackageMessage,
        deletePackageMessage,
        allPackageTrash, // Package TRASH
        deletePackageTrashData,
        deletePackageTrashMessage,
        restorePackageTrashData,
        restorePackageTrashMessage,
        countPost, // count all
        countPackage,
        countMember,
        countReservation,
        countMessages,
        userReservation, // Reservation
        setUserReservation,
        addReservationData,
        userReservationMessage,
        reservationData, // all Reservation data
        setReservationData,
        searchUser, // Search Club Member by name
        getSearchData,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
