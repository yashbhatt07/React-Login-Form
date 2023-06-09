import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToastNotification() {
  return <ToastContainer style={{ marginTop: "45px" }} />;
}

export const showToast = () => {
  toast.error("Request Failed, Something Went Wrong With The API", {
    position: "top-center",
    autoClose: 2000,
    closeOnClick: true,
    theme: "dark",
  });
};

export default ToastNotification;
