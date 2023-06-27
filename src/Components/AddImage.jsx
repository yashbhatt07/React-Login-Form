import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "./AddImage.css";

function AddImage({ setSelectedImage }) {
  const [files, setFiles] = useState([]);
  // console.log("files displaying", files);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => {
          var reader = new FileReader();
          reader.onload = function (event) {
            var base64String = event.target.result;

            file.base64String = base64String;
            setSelectedImage(base64String);
          };
          reader.readAsDataURL(file);
          return file;
        })
      );
    },
  });
  return (
    <>
      <section className="container">
        <div {...getRootProps({ className: "dropZone" })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <div className="container button">
              <Button>+</Button>
              <br />
              Please add here
            </div>
          ) : (
            <div className="container button">
              <Button>+</Button>
              <br />
              Drag or Add Image
            </div>
          )}
        </div>
        {files.map((file) => (
          <img
            style={{ margin: "auto", display: "flex" }}
            key={file.name}
            src={file.base64String}
            alt={file.name}
            width={45}
          />
        ))}
      </section>
    </>
  );
}

AddImage.propTypes = {
  setSelectedImage: PropTypes.func.isRequired,
};

export default AddImage;
