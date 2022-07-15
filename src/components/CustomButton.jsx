import React from "react";

function CustomButton({ color, radius, border, borderWidth, textColor, padding, icon, id, label, loading, onClick }) {
  const mystyle = {
    backgroundColor: color,
    borderRadius: radius,
    borderColor: border,
    borderWidth: borderWidth,

    color: textColor,
    padding: padding,

    //Aku tambahin justify-center w-full py-1
  };

  return (
    <button id={id} className={`flex justify-center w-full bg-blue-700 text-white font-semibold py-1 px-6 rounded-[4px] ${loading && "bg-gray-700 cursor-not-allowed"}`} onClick={onClick} disabled={loading} style={mystyle}>
      {icon}
      {label}
    </button>
  );
}

export default CustomButton;
