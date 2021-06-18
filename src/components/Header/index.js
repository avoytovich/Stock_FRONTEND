import React, { useRef } from "react";
import { Grid, Typography } from "@material-ui/core";
import { withRouter, Link } from "react-router-dom";

import { CreateRfp, Modal } from "./../../components";
import connect from "./../../utils/connectFunction";
import action from "./../../utils/actions";
import isAuth from "./../../helper/redirections";
import SVG from "./../../helper/customizeIcon";

import imageLogo from "./../../assets/images/logo.svg";
import imageAvatar from "./../../assets/images/avatar.svg";

import "./header.sass";

const Header = (props) => {
  // console.log("props Header", props);

  const modal = useRef(null);

  const handleLogOut = () => localStorage.setItem("token", JSON.stringify(null));

  const authLinks = [
    {
      title: "How it works",
      route: "/",
    },
    {
      title: "Dashboard",
      route: "/user/dashboard",
    },
    {
      title: "Create RFP",
      route: "#",
    },
    {
      title: "Log Out",
      route: "/",
    },
  ];

  const freeLinks = [
    {
      title: "How it works",
      route: "/",
    },
    {
      title: "Log In / Sign Up",
      route: "/login",
    },
  ];

  const links = isAuth() ? authLinks : freeLinks;

  const resolveOnClickLink = (title) => {
    props.dispatchActiveLink("setActiveLink", title);
    switch (title) {
      case "Create RFP":
        modal.current.open();
        break;
      case "Log Out":
        handleLogOut();
        props.dispatchActiveLink("setActiveLink", "How it works");
        break;
      default:
        break;
    }
  };

  return (
    <div className="wrapper-header">
      <Grid container spacing={0} justify="center">
        <Grid item xs={10} sm={10} className="container-header">
          <Grid container spacing={0} justify="center">
            <Grid item xs={4} sm={4} className="container-info">
              <Grid container spacing={0} justify="center">
                <Grid item xs={2} sm={2} className="container-info-logo">
                  <SVG className="info-logo" width="64px" height="64px" source={imageLogo} />
                </Grid>
                <Grid item xs={10} sm={10} className="container-info-title">
                  <Typography className="info-title">Get Offers</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8} sm={8} className="container-link">
              {links.map((item) => {
                return (
                  <Link
                    to={item.route}
                    className={
                      item.title === props.store.activeLink && item.title !== "Log Out" ? "link -active" : "link"
                    }
                    onClick={() => resolveOnClickLink(item.title)}
                  >
                    <Typography className="link-title">{item.title}</Typography>
                  </Link>
                );
              })}
              {isAuth() && <SVG className="link-avatar" width="48px" height="48px" source={imageAvatar} />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modal ref={modal}>
        <CreateRfp modalClose={() => modal.current.close()} />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { store: state };
};

const mapDispatchToProps = (dispatch) => {
  const actionData = (name, payload) => dispatch(action(name, payload));
  return {
    dispatchActiveLink: actionData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
