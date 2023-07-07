import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "./AddImage.css";

function AddImage({ profile = "", setValue }) {
  const [file, setFile] = useState([]);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function getBase64(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function (error) {
        reject(error);
      };
    });
  }

  const onDrop = useCallback(async (acceptedFiles) => {
    for (const file of acceptedFiles) {
      if (file.size > 1024 * 1024) {
        console.log(file.size);
        setErrorMessage("Image Size should be smaller then 50Kb.");
        return;
      }
    }

    const images = [];
    setError("");
    for (const file of acceptedFiles) {
      const base64String = await getBase64(file);
      const img = new Image();
      img.src = URL.createObjectURL(file);

      const promise = new Promise((resolve, reject) => {
        img.onload = function () {
          const width = img.width;
          const height = img.height;
          const resolutionError =
            width > 1000 || height > 1000
              ? `Error: Image resolution should be 1000x1000 or smaller. (${width}x${height} detected)`
              : null;

          if (resolutionError) {
            reject(resolutionError);
          } else {
            resolve({ file, base64String, resolutionError });
          }
        };
      });

      images.push(promise);
    }

    try {
      const processedImages = await Promise.all(images);

      for (const image of processedImages) {
        if (image.resolutionError) {
          console.error(image.resolutionError);
          // setError(image.resolutionError);
        } else {
          const { file, base64String } = image;
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            base64String,
          });
          setValue("profile", base64String);
        }
      }

      setFile(acceptedFiles);
    } catch (error) {
      console.error("Error:", error);
      setError(" Image Resolution Must Be Less Then 1000*1000 Pixels");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop,
    // maxSize: 50 * 1024,
  });

  const thumbs = useCallback(() => {
    return file.map((file) => (
      <img
        key={file.name}
        width={50}
        height={50}
        src={file.preview}
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    ));
  }, [file]);

  return (
    <>
      <section className="container">
        <div {...getRootProps({ className: "dropZone" })}>
          <input name="profile" {...getInputProps()} />
          <div className="d-flex w-100 justify-content-between ">
            {isDragActive ? (
              <div className="container button">
                <br />
                Please add here
              </div>
            ) : file && file.length > 0 ? (
              <div className="container button">
                {thumbs()}
                <br />
                Drag or click here to change Image
              </div>
            ) : (
              <div className="container button">
                {profile ? (
                  <img width={50} height={50} src={profile} />
                ) : (
                  <Button>+</Button>
                )}
                <br />
                Drag or Add Image
              </div>
            )}
          </div>
          {error && (
            <div
              className="error-message"
              style={{ color: "red", textAlign: "center", fontSize: "12px" }}
            >
              {error}
            </div>
          )}{" "}
        </div>
        {errorMessage && (
          <div
            className="error-message"
            style={{ color: "red", textAlign: "center", fontSize: "12px" }}
          >
            {errorMessage}
          </div>
        )}{" "}
      </section>
    </>
  );
}

AddImage.propTypes = {
  setValue: PropTypes.func.isRequired,
  profile: PropTypes.string,
};

export default AddImage;
