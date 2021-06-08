import React, { useState } from "react";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { get } from "lodash";

import { Layout } from "./../../containers";
import connect from "./../../utils/connectFunction";
import action from "./../../utils/actions";
import { API } from "../../helper/constants";
import { wrapRequest } from "../../utils/api";

import "./login.sass";

const Login = (props) => {
  // console.log('props Login', props);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const inputFields = [
    {
      label: "email",
      type: "email",
      placeholder: "your@email.com",
    },
    {
      label: "password",
      type: "password",
      placeholder: "your password",
    },
  ];

  const handleChange = (value, label) => {
    switch (label) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      email,
      password,
    };
    const loginUser = await wrapRequest({
      method: "POST",
      url: `${API.URL}:${API.PORT}/login`,
      mode: "cors",
      cache: "default",
      data: payload,
    });
    const token = get(loginUser, "data.token");
    const userId = get(loginUser, "data.userId");
    if (token && userId) {
      props.dispatchSaveUserId("saveUserId", userId);
      localStorage.setItem("token", JSON.stringify(token));
      props.history.push("/user/dashboard");
    } else {
      console.log("Something went wrong...with login");
    }
  };

  return (
    <Layout>
      <div className="wrapper-landing-login">
        <Grid container spacing={0} justify="center" className="container-landing-login">
          <Grid item xs={4} sm={4}>
            <div className="landing-login">
              <form onSubmit={handleSubmit}>
                {inputFields.map((each, id) => (
                  <TextField
                    key={id}
                    id={each.label}
                    name={each.label}
                    label={each.label.toUpperCase()}
                    placeholder={each.placeholder}
                    inputProps={{
                      type: each.type,
                    }}
                    onChange={(e) => handleChange(e.target.value, each.label)}
                    style={{
                      marginBottom: "5px",
                    }}
                    fullWidth
                  />
                ))}
                <Button type="submit" variant="contained" color="primary">
                  Log In / Sign Up
                </Button>
              </form>
            </div>
          </Grid>
          <Grid item xs={4} sm={4}>
            <div className="landing-about">
              <Typography className="landing-about-content">
                Application allows you to make request for offers. Don't spend time on searching! Wait on proposals and
                choose the best one.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return { store: state };
};

const mapDispatchToProps = (dispatch) => {
  const actionData = (name, payload) => dispatch(action(name, payload));
  return {
    dispatchSaveUserId: actionData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
