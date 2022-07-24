import React from "react";

const Label = (props) => {
  return <label className="relative px-2 top-3 left-3 w-fit bg-white text-gray-600 text-[10px] text-start">{props.label}</label>;
};

export { Label };
