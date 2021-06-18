import React, { useState, useEffect } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import { DropZone } from "..";
import connect from "../../utils/connectFunction";
import action from "../../utils/actions";
import { API } from "../../helper/constants";
import { wrapRequest } from "../../utils/api";

import "./createRfp.sass";

const CreateRfp = (props) => {
  // console.log("props CreateRfp", props);

  const [title, setTitle] = useState("");
  const [preferredPrice, setPreferredPrice] = useState("");
  const [description, setDescription] = useState("");
  const [acceptedFiles, setAcceptedFiles] = useState([]);

  const inputFields = [
    {
      label: "title",
      type: "text",
      placeholder: "your title",
    },
    {
      label: "preferred price",
      type: "text",
      placeholder: "your preferred price",
    },
    {
      label: "description",
      type: "text",
      placeholder: "your description",
    },
  ];

  const handleChange = (value, label) => {
    switch (label) {
      case "title":
        setTitle(value);
        break;
      case "preferred price":
        setPreferredPrice(value);
        break;
      case "description":
        setDescription(value);
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("single", file);
    });
    await wrapRequest({
      method: "POST",
      url: `${API.URL}:${API.PORT}/user/${props.store.userId}/ask_create/upload`,
      mode: "cors",
      cache: "default",
      data: formData,
    })
      .then((data) => {
        const {
          data: { url },
        } = data;
        if (url) {
          const payload = {
            title,
            preferred_price: preferredPrice,
            description,
            photo: url,
          };
          wrapRequest({
            method: "POST",
            url: `${API.URL}:${API.PORT}/user/${props.store.userId}/ask_create`,
            mode: "cors",
            cache: "default",
            data: payload,
          }).then((data) => {
            const {
              data: { message },
            } = data;
            props.dispatchSuccessNotifiction("successNotification", { message });
            props.modalClose();
          });
        }
      })
      .catch((e) => {
        const {
          response: {
            data: { message },
          },
        } = e;
        props.dispatchErrorNotification("errorNotification", { message });
      });
  };

  return (
    <div className="wrapper-create-rfp">
      <Grid container spacing={0} justify="center" className="container-create-rfp">
        <Grid item xs={4} sm={4}>
          <div className="create-rfp">
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
                Create RFP
              </Button>
            </form>
          </div>
        </Grid>
        <Grid item xs={4} sm={4}>
          <DropZone setAcceptedFiles={setAcceptedFiles} />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { store: state };
};

const mapDispatchToProps = (dispatch) => {
  const actionData = (name, payload) => dispatch(action(name, payload));
  return {
    dispatchErrorNotification: actionData,
    dispatchSuccessNotifiction: actionData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateRfp));
