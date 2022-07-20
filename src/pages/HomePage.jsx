import React, { useEffect, useState } from "react";
import "../../src/";
import { Input } from "../components/Input";
import Layout from "../components/Layout";
import { CardHouse } from "../components/Card";
import { apiRequest } from "../context/apiRequest";
import swal from "sweetalert";
import logoblue from "../assets/logoblue.png";

const HomePage = () => {
  const [listHouse, setListHouse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListHouse();
  }, []);

  const fetchListHouse = async () => {
    apiRequest(`houses`, "GET", {})
      .then((res) => {
        const { data } = res.data;
        console.log(data);
        setListHouse(data);
      })
      .catch((err) => {
        swal({
          icon: "error",
          title: err,
        });
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    <div className="flex justify-center content-center">
      <div className="flex flex-col h-screen justify-center">
        <img
          src={logoblue}
          alt="logo-loading"
          width={200}
          height={200}
          className="animate-pulse"
        />
      </div>
    </div>;
  } else {
    return (
      <Layout>
        <div>
          <div className="container bg-banner-image h-96 w-full bg-cover bg-center">
            <div className="flex flex-wrap py-10">
              <div className="w-full text-center px-10 mx-auto lg:w-1/2 lg:text-left">
                <div className="text-1xl font-semibold text-[#F6F6F6] lg:text-2xl">
                  Welcome to the
                </div>
                <h1 className="text-2xl font-bold text-[#F6F6F6] lg:text-3xl">
                  House Fancy
                </h1>
                <div className="text-xl font-medium text-[#F6F6F6]  ">
                  make your dream house
                </div>
                <div className="text-xl font-medium mt-5 text-[#F6F6F6]">
                  Healty Residence in the Greatest place
                </div>
              </div>
              <div className="w-full text-center px-10 mx-auto lg:w-1/2">
                <div className="flex gap-6 mt-5">
                  <Input
                    id={"search-house"}
                    type={"text"}
                    placeholder={"Search..."}
                  />
                  <button className="bg-blue-700 p-2 rounded-lg">Search</button>
                </div>
                <div className="text-left">
                  <div className="dropdown">
                    <button className="dropbtn p-1 rounded-t-md">
                      Location
                    </button>
                    <div class="dropdown-content w-full rounded-b-md">
                      <button className="w-full">Surabaya</button>
                      <button className="w-full">Jakarta</button>
                      <button className="w-full">Yogyakarta</button>
                    </div>
                  </div>
                  <div className="dropdown">
                    <button className="dropbtn p-1 rounded-t-md">
                      Minimum
                    </button>
                    <div class="dropdown-content w-full rounded-b-md">
                      <button className="w-full">0</button>
                      <button className="w-full">300.000.000</button>
                      <button className="w-full">500.000.000</button>
                    </div>
                  </div>
                  <div className="dropdown">
                    <button className="dropbtn p-1 rounded-t-md">
                      Maximum
                    </button>
                    <div class="dropdown-content w-full rounded-b-md">
                      <button className="w-full">300.000.000</button>
                      <button className="w-full">500.000.000</button>
                      <button className="w-full">~</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center my-10">
          <div className="grid grid-flow-row auto-rows-max w-full gap-8 my-8 mx-10 lg:mx-36 grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 content-center">
            {listHouse.map((item) => (
              <CardHouse
                key={item.id}
                id={item.id}
                titleHouse={item.title}
                cost={item.price}
                location={item.location}
                landArea={item.surface_area}
                buildingArea={item.building_area}
                imageHouse={item.image_url}
              />
            ))}
          </div>
        </div>
      </Layout>
    );
  }
};

export default HomePage;
