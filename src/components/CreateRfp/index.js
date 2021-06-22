import React, { useState, useEffect } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import { DropZone } from "..";
import connect from "../../utils/connectFunction";
import action from "../../utils/actions";
import { API } from "../../helper/constants";
import { wrapRequest } from "../../utils/api";

import "./createRfp.sass";

const CreateRfp = (props) => {
  // console.log("props CreateRfp", props);

  const [acceptedFiles, setAcceptedFiles] = useState([]);

  const inputFields = [
    {
      label: "title",
      name: "title",
      type: "text",
      placeholder: "your title",
    },
    {
      label: "preferred price",
      name: "preferred_price",
      type: "text",
      placeholder: "your preferred price",
    },
    {
      label: "description",
      name: "description",
      type: "text",
      placeholder: "your description",
    },
  ];

  const handleSubmit = async (values) => {
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
            photo: url,
            ...values,
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

  const validationSchema = yup.object({
    title: yup.string("Enter your title").required("Title is required"),
    preferred_price: yup.string("Enter your preferred price").required("Preferred price is required"),
    description: yup.string("Enter your description").required("Description is required"),
    files: yup.mixed().required("Image is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      preferred_price: "",
      description: "",
      files: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <div className="wrapper-create-rfp">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={0} justify="center" className="container-create-rfp">
          <Grid item xs={4} sm={4}>
            <div className="create-rfp">
              {inputFields.map((each, id) => (
                <TextField
                  key={id}
                  id={each.label}
                  style={{
                    marginBottom: "5px",
                  }}
                  fullWidth
                  name={each.name}
                  label={each.label.toUpperCase()}
                  placeholder={each.placeholder}
                  inputProps={{
                    type: each.type,
                  }}
                  value={formik.values[each.name]}
                  onChange={formik.handleChange}
                  error={formik.touched[each.name] && Boolean(formik.errors[each.name])}
                  helperText={formik.touched[each.name] && formik.errors[each.name]}
                />
              ))}
              <Button type="submit" variant="contained" color="primary">
                Create RFP
              </Button>
            </div>
          </Grid>
          <Grid item xs={4} sm={4}>
            <DropZone name="files" formik={formik} setAcceptedFiles={setAcceptedFiles} />
          </Grid>
        </Grid>
      </form>
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
