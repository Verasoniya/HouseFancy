import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoblue from "../assets/logoblue.png";

const Header = () => {
  const [token, setToken] = useState("");
  const [full_name, setFull_name] = useState("");

  useEffect(() => {
    let token = "";
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
      console.log(token);
      setToken(token);
    }
    axios
      .get(`https://housefancy.site/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setFull_name(res.data.data.full_name);
      });
  }, []);

  return (
    <nav className="sticky top-0 w-full px-2 py-2.5 bg-white flex justify-between shadow-lg z-10  ">
      <div className="flex items-center font-bold gap-6 ml-4">
        <Link to="/homepage">
          <img src={logoblue} alt="logoblue" className="w-15 h-10" />
        </Link>
        <Link to="/homecontractor">
          <div className="">Contractor</div>
        </Link>
      </div>
      <div className="flex items-center font-bold gap-6 mr-4">
        {/*sementara gini aja ya kalo mau logicnya untuk ganti nvbar klo blm ada tokennya bingung aku yg aku komentar yg mana biar gak eror*/}

        {token ? (
          <>
            <div className="dropdown">
              <button className="dropbtnd p-1 rounded-t-md">{full_name}</button>
              <div className="dropdown-content w-full rounded-b-md">
                <Link to="/profile">
                  <button className="w-full">Profile</button>
                </Link>
                <Link to="/join-contractor">
                  <button className="w-full">Join Contractor</button>
                </Link>
                <Link to="/my-list-house">
                  <button className="w-full">My List House</button>
                </Link>
                <Link to="/history">
                  <button className="w-full">History</button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/register">
              <div>Register</div>
            </Link>
            <Link to="/">
              <div>Login</div>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
