import React from "react";
import { Link } from "react-router-dom";
import logoblue from "../assets/logoblue.png";

const Header = () => {
  return (
    <nav className="sticky top-0 w-full px-2 py-2.5 bg-white flex justify-between shadow-lg z-10  ">
      <div className="flex items-center font-bold gap-6 ml-4">
        <img src={logoblue} alt="logoblue" className="w-15 h-10" />
        <Link to="/homepage">
          <div className="">Contractor</div>
        </Link>
      </div>
      <div className="flex items-center font-bold gap-6 mr-4">
        {/*sementara gini aja ya kalo mau logicnya untuk ganti nvbar klo blm ada tokennya bingung aku yg aku komentar yg mana biar gak eror*/}
        <Link to="/register">
          <div>Register</div>
        </Link>
        <Link to="/">
          <div>Login</div>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
