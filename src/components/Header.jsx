import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  FaBuilding,
  FaHistory,
  FaHouseUser,
  FaOutdent,
  FaUserAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logoblue from "../assets/logoblue.png";

const Header = () => {
  let navigate = useNavigate();
  const [token, setToken] = useState("");
  const [full_name, setFull_name] = useState("");
  const [image, setImage] = useState("");
  const [is_contractor, setIsContractor] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  useEffect(() => {
    const getIsContractor = localStorage.getItem("is_contractor");
    setIsContractor(getIsContractor);
  }, [is_contractor]);

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
        setImage(res.data.data.image_url);
        setFull_name(res.data.data.full_name);
      })
      .catch((err) => {
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token");
        }
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
      <div className="flex items-center font-bold gap-6">
        {/*sementara gini aja ya kalo mau logicnya untuk ganti nvbar klo blm ada tokennya bingung aku yg aku komentar yg mana biar gak eror*/}

        {token ? (
          <>
            <div className="dropdown">
              <button className="dropbtnd flex items-center">
                {full_name}
                <div className="ml-4 rounded-full w-8 h-8 overflow-hidden">
                  <img
                    src={image}
                    alt={full_name}
                    className="w-full self-center"
                  />
                </div>
              </button>
              <div className="dropdown-content w-full rounded-b-md">
                <Link to="/profile">
                  <div className="flex mr-2">
                    <FaUserAlt className="mt-2" />
                    <button className="w-full self-center">Profile</button>
                  </div>
                </Link>
                <Link to="/join-contractor">
                  <div className="flex mr-2">
                    <FaBuilding className="mt-2" />
                    <button className="w-full">Join Contractor</button>
                  </div>
                </Link>
                <Link to="/my-contractor-profile">
                  <div className="flex mr-2">
                    <FaBuilding className="mt-2" />
                    <button className="w-full">As Contractor</button>
                  </div>
                </Link>
                <Link to="/my-list-house">
                  <div className="flex mr-2">
                    <FaHouseUser className="mt-2" />
                    <button className="w-full">My List House</button>
                  </div>
                </Link>
                <Link to="/history">
                  <div className="flex mr-2">
                    <FaHistory className="mt-2" />
                    <button className="w-full">History</button>
                  </div>
                </Link>
                <div className="flex mr-2">
                  <FaOutdent className="mt-2" />
                  <button onClick={handleLogOut}>Log out</button>
                </div>
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
