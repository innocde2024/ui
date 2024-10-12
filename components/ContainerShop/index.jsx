import React from "react";

const Container = ({ children, className }) => (
  <div className={`${className} max-w-screen-xl mx-auto px-4 xl:px-0 py-10`}>
    {children}
  </div>
);

export default Container;
