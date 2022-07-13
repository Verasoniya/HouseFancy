import React from "react";
import logoblue from "../assets/logoblue.png";

const Header = () => {
  return (
    <nav className="sticky top-0 w-full px-2 py-2.5 bg-white flex justify-between shadow-lg z-10  ">
      <div className="flex items-center font-bold gap-6 ml-4">
        <img src={logoblue} alt="logoblue" className="w-15 h-10" />
        <div className="">Contractor</div>
      </div>
      <div className="flex items-center font-bold gap-6 mr-4">
        {/*sementara gini aja ya kalo mau logicnya untuk ganti nvbar klo blm ada tokennya bingung aku yg aku komentar yg mana biar gak eror*/}
        <div>Register</div>
        <div>Login</div>
      </div>
    </nav>
  );
};

export default Header;
