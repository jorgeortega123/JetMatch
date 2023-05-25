import React, { useState } from "react";
import TypeMessage, { notifyAlert, notifyError, notifySuccess, notifyWarning } from "./messages/TypeMessage";

export interface MessageProps {
  type: "success" | "error" | "warning" | "alert";
  description: "";
}
function useM() {
  const showMessage = () => {
    return <TypeMessage />;
  };
  const changeProps = (dataMessage: MessageProps | undefined) => {
    const dark = window.matchMedia("(prefers-color-scheme:dark)");
    dataMessage?.type === "success" && notifySuccess(dark, dataMessage);
    dataMessage?.type === "warning" && notifyWarning(dark, dataMessage);
    dataMessage?.type === "error" && notifyError(dark, dataMessage);
    dataMessage?.type === "alert" && notifyAlert(dark, dataMessage);
  };
  return { showMessage, changeProps };
}
export default useM;