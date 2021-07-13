/*===============================================================
# Author: Md. Foysal Mahmud

# Description: Define all the Route for frontend.
             - Admin and Authenticated User route also define separately.                                     
                                           
===================================================================*/

import React, { useContext } from "react";
import { Route, Switch } from "react-router";
import CreatePost from "./PostComponent/CreatePost";
import ShowAllPost from "./PostComponent/ShowAllPost";
import PostAdmin from "./AdminComponent/PostAdmin";
import PackageAdmin from "./AdminComponent/PackageAdmin";
import EditPost from "./PostComponent/EditPost";
import DetailsPost from "./PostComponent/DetailsPost";
import Home from "./Home";
import TrashHome from "./PostComponent/TrashHome";
import MemberClubHome from "./AdminComponent/MemberClubAdmin";
import MemberClubUser from "./MemberClubComponent/MemberClubUser";
import SearchMemberClubUser from "./MemberClubComponent/SearchMemberClubUser";
import AddMember from "./MemberClubComponent/AddMember";
import DetailsMember from "./MemberClubComponent/DetailsMember";
import DetailsMemberAdmin from "./MemberClubComponent/DetailsMemberAdmin";
import UpdateMember from "./MemberClubComponent/UpdateMember";
import LoginForm from "./AuthenticationComponent/LoginForm";
import RegistrationForm from "./AuthenticationComponent/RegistrationForm";
import UserProfile from "./AuthenticationComponent/UserProfile";
import TourPackage from "./TourPackageComponent/TourPackage";
import UserReservation from "./TourPackageComponent/UserReservation";
import AdminReservation from "./TourPackageComponent/AdminReservation";
import TrashPackage from "./TourPackageComponent/TrashPackage";
import EditPackage from "./TourPackageComponent/EditPackage";
import { StoreContext } from "../../storeContext/StoreContext";
import CreateTourPackage from "./TourPackageComponent/CreateTourPackage";
import Reservation from "./TourPackageComponent/Reservation";
import MainAdmin from "./AdminComponent/MainAdmin";
import VisitorMessageAdmin from "./AdminComponent/VisitorMessageAdmin";

const Body = () => {
  //-- Context Define ----
  const { setUsername } = useContext(StoreContext);

  let adminSection;
  if (localStorage.getItem("isLogin") === "isLogin") {
    setUsername(localStorage.getItem("username"));
    adminSection = (
      <>
        <Route path="/admin" exact component={MainAdmin} />
        <Route path="/postAdmin" exact component={PostAdmin} />
        <Route path="/packageAdmin" exact component={PackageAdmin} />
        <Route
          path="/visitorMessage/read"
          exact
          component={VisitorMessageAdmin}
        />
        <Route path="/admin/create" exact component={CreatePost} />
        <Route path="/admin/update/:id" exact component={EditPost} />
        <Route path="/admin/readTrash" exact component={TrashHome} />

        <Route path="/admin/package" exact component={CreateTourPackage} />
        <Route path="/admin/trashPackage" exact component={TrashPackage} />
        <Route path="/admin/packageUpdate/:id" exact component={EditPackage} />
        <Route path="/adminReservation" exact component={AdminReservation} />
        <Route path="/memberclub" exact component={MemberClubHome} />
        <Route path="/memberclub/update/:id" exact component={UpdateMember} />
        <Route path="/admin/reservation/:id" exact component={Reservation} />
        <Route
          path="/memberclub/admin/details/:id"
          exact
          component={DetailsMemberAdmin}
        />
      </>
    );
  }

  let userSection;
  if (localStorage.getItem("isLogin") === "isUserLogin") {
    setUsername(localStorage.getItem("username"));
    userSection = (
      <>
        <Route path="/profile" exact component={UserProfile} />
        <Route path="/userReservation" exact component={UserReservation} />
        <Route path="/admin/reservation/:id" exact component={Reservation} />
      </>
    );
  }

  let authSection;
  if (
    localStorage.getItem("isLogin") !== "isLogin" &&
    localStorage.getItem("isLogin") !== "isUserLogin"
  ) {
    authSection = (
      <>
        <Route path="/login" exact component={LoginForm} />
        <Route path="/registration" exact component={RegistrationForm} />
      </>
    );
  }

  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />

        <Route path="/read" exact component={ShowAllPost} />
        <Route path="/memberclub/user" exact component={MemberClubUser} />
        <Route path="/searchUser" exact component={SearchMemberClubUser} />

        <Route path="/tour/package" exact component={TourPackage} />

        <Route path="/memberclub/insert" exact component={AddMember} />
        <Route path="/memberclub/details/:id" exact component={DetailsMember} />

        <Route path="/post/details/:id" exact component={DetailsPost} />

        {authSection}

        {userSection}

        {adminSection}
      </Switch>
    </div>
  );
};

export default Body;
