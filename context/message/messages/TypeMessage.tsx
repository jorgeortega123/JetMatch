import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { MessageProps } from "../UseM";


export const notifySuccess = (
  dark: MediaQueryList,
  dataMessage: MessageProps | undefined
) => {
  toast.success(dataMessage?.description, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: dark ? "dark" : "light",
  });
};
export const notifyError = (
  dark: MediaQueryList,
  dataMessage: MessageProps | undefined
) => {
  toast.error(dataMessage?.description, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: dark ? "dark" : "light",
  });
};
export const notifyWarning = (
  dark: MediaQueryList,
  dataMessage: MessageProps | undefined
) => {
  toast.warn(dataMessage?.description, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: dark ? "dark" : "light",
  });
};
export const notifyAlert = (
  dark: MediaQueryList,
  dataMessage: MessageProps | undefined
) => {
  toast.info(dataMessage?.description, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: dark ? "dark" : "light",
  });
};
function TypeMessage() {
  return (
    <>
      <ToastContainer />
    </>
  );
}

export default TypeMessage;