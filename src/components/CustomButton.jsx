import React from "react";

function CustomButton({
  color,
  radius,
  border,
  borderWidth,
  id,
  label,
  loading,
  onClick,
}) {
  const mystyle = {
    backgroundColor: color,
    borderRadius: radius,
    borderColor: border,
    borderWidth: borderWidth,
    //Aku tambahin i di Radiusnya, px-2 w-full h-full
  };
  return (
    <button
      id={id}
      className={`bg-blue-700 text-white font-bold py-2 px-2 rounded-sm w-full h-full ${
        loading && "bg-gray-700 cursor-not-allowed"
      }`}
      onClick={onClick}
      disabled={loading}
      style={mystyle}
    >
      {label}
    </button>
  );
}

export default CustomButton;
