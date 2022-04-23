import React from "react";
import loading from "../../assets/img/loading.gif";

const PageLoader = props => {
  return (
    <div className="min-h-screen antialiased bg-gray-200"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    > 
    <div className="flex flex-col">
      <h1 className="font-bold text-center text-4xl text-gray-500 mt-32 -mb-32">Cell<span className="text-blue-500">Store</span></h1>
      <img src={loading} style={{filter:'grayscale(1)'}} alt="…" height="250" width="500" />
    </div>
    </div>
  );
};

PageLoader.propTypes = {};

export default PageLoader;