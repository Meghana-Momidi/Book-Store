import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="loader spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
