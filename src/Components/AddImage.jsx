// import React from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

function AddImage({ setSelectedImage }) {
  const [file, setFile] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFile(
        acceptedFiles.map((file) => {
          console.log("🚀 ~ file: AddImage.jsx:14 ~ AddImage ~ file:", file);
          var reader = new FileReader();
          reader.onload = function (event) {
            // event.target.result contains base64 encoded image
            var base64String = event.target.result;
            console.log(
              "🚀 ~ file: AddImage.jsx:19 ~ acceptedFiles.map ~ base64String:",
              base64String
            );
            file.base64String = base64String;
            setSelectedImage(base64String);
            //   handlePictureDropUpload(base64String ,fileName );
          };
          reader.readAsDataURL(file);
          return file;
        })
      );
    },
  });

  //   useEffect(() => {
  //     file.forEach((file) => URL.revokeObjectURL(file.preview));
  //   }, [file]);
  return (
    <>
      <section className="container">
        <div {...getRootProps({ className: "dropZone" })}>
          <input {...getInputProps()} />
          <Button> Drag Or Add Image</Button>
        </div>
        {file.map((file) => {
          console.log(file);
          <img key={file.name} src={file.base64String} alt={file.name} />;
        })}
      </section>
    </>
  );
}

AddImage.PropTypes = {
  setSelectedImage: PropTypes.func.isRequired,
};

export default AddImage;
