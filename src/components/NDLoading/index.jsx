import React from "react";
import "./style.scss";

export default function NDLoading() {
  return (
    <div className="wrapper-loading">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
