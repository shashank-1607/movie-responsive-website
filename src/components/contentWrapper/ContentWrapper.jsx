import React from "react";
import "./style.scss";

//This is used to align the item in the center
const ContentWrapper = ({ children }) => {
    // below div is High Order Component
    return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;

