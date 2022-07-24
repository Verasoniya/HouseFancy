import React from "react";

const TrTd = (props) => {
  return (
    <div className="flex flex-col lg:flex-row border-y border-blue-300 py-2 px-3 w-full">
      <div className="font-semibold text-md w-1/2">{props.title}</div>
      <div className="w-1/2 text-md">{props.content}</div>
    </div>
  );
};
const TrTdDescription = (props) => {
  return (
    <div className="flex flex-col">
      <div className="font-semibold text-md border-y border-blue-300 py-2 px-3">{props.title}</div>
      <div className="border-y border-blue-300 py-2 px-3 text-md">{props.content}</div>
    </div>
  );
};

export { TrTd, TrTdDescription };
