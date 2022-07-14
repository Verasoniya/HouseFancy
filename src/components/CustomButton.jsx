import React from "react";


function CustomButton({ color, radius, border, borderWidth, textColor, padding, icon, id, label, loading, onClick }) {

  const mystyle = {
    backgroundColor: color,
    borderRadius: radius,
    borderColor: border,
    borderWidth: borderWidth,

 color: textColor,
    padding: padding,

    //Aku tambahin i di Radiusnya, px-2 w-full h-full
  };

  return (
    <button id={id} className={`flex bg-blue-700 text-white font-semibold py-2 px-6 rounded-[4px] ${loading && "bg-gray-700 cursor-not-allowed"}`} onClick={onClick} disabled={loading} style={mystyle}>
      {icon}
      {label}
    </button>
  );
}

export default CustomButton;
