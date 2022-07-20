import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import { TokenContext } from "../context/AuthContext";
import HouseDetailSeller from "../pages/HouseDetailSeller";
import MyListHouse from "../pages/MyListHouse";
import EditHouse from "../pages/MyListHouse";
import Register from "../pages/Register";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import JoinContractor from "../pages/JoinContractor";
import MyContractorProfile from "../pages/MyContractorProfile";
import EditPortfolio from "../pages/EditPortfolio";
import AddPortfolio from "../pages/AddPortfolio";
import AddHouse from "../pages/AddHouse";

axios.defaults.baseURL = "https://housefancy.site/";
// axios.defaults.baseURL = "https://virtserver.swaggerhub.com/faizalsundara/Kelompok1/1.0.0/";

const RoutesHouseFancy = () => {
  const [token, setToken] = useState(null);
  const jwtToken = useMemo(() => ({ token, setToken }), [token]);

  useEffect(() => {
    const getToken = localStorage.getItem("token") || "0";
    setToken(getToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken}`;
  }, [token]);

  if (token) {
    return (
      <TokenContext.Provider value={jwtToken}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            {/* <Route path="/homepage" element={<HomePage />} /> */}

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/house-detail-seller/:house_id" element={<HouseDetailSeller />} />
            <Route path="/houses/:house_id" element={<EditHouse />} />
            <Route path="/my-list-house" element={<MyListHouse />} />
            <Route path="/add-house" element={<AddHouse />} />

            <Route path="/portfolios/details/:portfolio_id" element={<EditPortfolio />} />
            <Route path="/add-portfolio" element={<AddPortfolio />} />

            <Route path="/my-contractor-profile" element={<MyContractorProfile />} />
            <Route path="/join-contractor" element={<JoinContractor />} />

            <Route
              path="*"
              element={
                <main style={{ padding: "4rem" }}>
                  <p>Sorry! There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </BrowserRouter>
      </TokenContext.Provider>
    );
  }
};

export { RoutesHouseFancy };
