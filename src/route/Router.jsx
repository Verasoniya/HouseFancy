import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import { TokenContext } from "../context/AuthContext";
import HomePage from "../pages/HomePage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import HomeContracktor from "../pages/HomeContracktor";
import DetailHouseList from "../pages/DetailHouseList";
import DetailPortfolioContractor from "../pages/DetailPortfolioContractor";
import Profile from "../pages/Profile";
import DetailContractorList from "../pages/DetailContractorList";
import History from "../pages/History";

axios.defaults.baseURL = "https://housefancy.site/";

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
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/homecontractor" element={<HomeContracktor />} />
            <Route path="/detail/:id/*" element={<DetailHouseList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<History />} />
            <Route
              path="/detailcontractor/:id"
              element={<DetailContractorList />}
            />
            <Route
              path="/detailportfolio/:id"
              element={<DetailPortfolioContractor />}
            />
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
