import React, { useEffect, useState, useRef } from "react";
import { RootRef, Paper } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import BackupIcon from "@material-ui/icons/Backup";

import "./dropzone.sass";

const DropZone = ({ name, formik, setAcceptedFiles }) => {
  const [files, setFiles] = useState([]);

  const meta = formik.getFieldMeta(name);
  const hasError = meta?.touched && meta?.error;

  const uploadContainer = useRef(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setAcceptedFiles(acceptedFiles);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      formik.setFieldValue("files", acceptedFiles);
    },
  });
  const { ref, ...rootProps } = getRootProps();

  const editImage = (image, done) => {
    const imageFile = image.doka ? image.doka.file : image;
    const imageState = image.doka ? image.doka.data : {};
    create({
      // recreate previous state
      ...imageState,

      // load original image file
      src: imageFile,
      outputData: true,

      onconfirm: ({ file, data }) => {
        Object.assign(file, {
          doka: { file: imageFile, data },
        });
        done(file);
      },
    });
  };

  const thumbs = files.map((file, index) => (
    <div className="thumb" key={file.name}>
      <div className="thumbInner">
        <img className="img" src={file.preview} alt="" />
      </div>
      <button
        className="thumbButton"
        onClick={() =>
          editImage(file, (output) => {
            const updatedFiles = [...files];

            // replace original image with new image
            updatedFiles[index] = output;

            // revoke preview URL for old image
            if (file.preview) URL.revokeObjectURL(file.preview);

            // set new preview URL
            Object.assign(output, {
              preview: URL.createObjectURL(output),
            });

            // update view
            setFiles(updatedFiles);
          })
        }
      >
        edit
      </button>
    </div>
  ));

  const UploadPlaceholder = () => {
    return (
      <>
        <BackupIcon fontSize="large" />
        <p>Drop your image here, or click</p>
        <p>supports JPG, PNG</p>
      </>
    );
  };

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  useEffect(() => {
    if (!files.length && hasError) {
      uploadContainer.current.style.color = "#ea4633";
      uploadContainer.current.style.borderColor = "#ea4633";
    } else {
      uploadContainer.current.style.color = "#000000";
      uploadContainer.current.style.borderColor = "#5d5d5d";
    }
  }, [files.length, hasError]);

  return (
    <RootRef rootRef={ref}>
      <Paper {...rootProps}>
        <input {...getInputProps()} />
        <div className="wrapper-upload">
          <div className="container-upload" ref={uploadContainer}>
            {files.length ? thumbs : <UploadPlaceholder />}
          </div>
          {hasError && <p className="upload-validation">{hasError}</p>}
        </div>
      </Paper>
    </RootRef>
  );
};

export default DropZone;
