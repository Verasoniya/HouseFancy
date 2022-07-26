import React, { useEffect, useState } from "react";
import "../../src/";
import { Input } from "../components/Input";
import Layout from "../components/Layout";
import { CardHouse } from "../components/Card";
import { apiRequest } from "../context/apiRequest";
import swal from "sweetalert";

import axios from "axios";
import { useSearchParams } from "react-router-dom";
import logo from "../assets/logoblue.png";

const Location = [
  "Jakarta",
  "Bandung",
  "Surabaya",
  "Malang",
  "Yogyakarta",
  "Semarang",
  "Tangerang",
];

const Min = [
  {
    desc: "100jt",
    value: 100000000,
  },
  {
    desc: "250jt",
    value: 250000000,
  },
  {
    desc: "500jt",
    value: 500000000,
  },
  {
    desc: "750jt",
    value: 750000000,
  },
  {
    desc: "1 Milyar",
    value: 1000000000,
  },
];

const Max = [
  {
    desc: "100jt",
    value: 100000000,
  },
  {
    desc: "250jt",
    value: 250000000,
  },
  {
    desc: "500jt",
    value: 500000000,
  },
  {
    desc: "750jt",
    value: 750000000,
  },
  {
    desc: "1 Milyar",
    value: 1000000000,
  },
];

const HomePage = () => {
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState({
    location: undefined,
    min: undefined,
    max: undefined,
  });
  const [listHouse, setListHouse] = useState([]);
  const [loading, setLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchListHouse();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ search: true, keyword });
    const body = {
      keyword: keyword,
      location: filter.location,
      min_price: filter.min,
      max_price: filter.max,
    };
    setLoading(true);
    axios
      .get(`https://housefancy.site/houses/searches?keyword=${keyword}`, body)
      .then((res) => {
        setListHouse(res.data.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const fetchListHouse = async () => {
    apiRequest(`houses`, "GET", {})
      .then((res) => {
        const { data } = res.data;
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
              <form className="flex gap-6 mt-5" onSubmit={handleSearch}>
                <Input
                  id={"search-house"}
                  type={"text"}
                  placeholder={"Search..."}
                  required
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                  className="bg-blue-700 px-5 text-white p-2 rounded-lg"
                  // onClick={handleSearch}
                >
                  Search
                </button>
              </form>
              <div className="text-left mt-2">
                <div className="inline-flex items-center -space-x-px text-xs rounded-md">
                  <label className="relative" htmlFor="sort">
                    <span className="sr-only"> Sort </span>

                    <select
                      className="py-2 pl-5 pr-10 text-xs font-medium border-gray-200 rounded-l-md hover:z-10 focus:outline-none focus:border-indigo-600 focus:z-10 hover:bg-gray-50 focus:ring-0"
                      id="sort"
                      name="sort"
                      onChange={(e) => {
                        setFilter({
                          ...filter,
                          location: e.target.value,
                        });
                      }}
                    >
                      <option> Location </option>
                      {Location.map((loc) => (
                        <option value={loc} key={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="relative" htmlFor="sort">
                    <span className="sr-only"> Min </span>

                    <select
                      className="px-5 py-2 text-xs font-medium hover:z-10  focus:outline-none focus:border-indigo-600 focus:z-10 hover:bg-gray-50 active:opacity-75"
                      id="sort"
                      name="sort"
                      onChange={(e) => {
                        setFilter({
                          ...filter,
                          min: e.target.value,
                        });
                      }}
                    >
                      <option> Min </option>
                      {Min.map(({ desc, value }) => (
                        <option value={value} key={value}>
                          {desc}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="relative" htmlFor="sort">
                    <span className="sr-only"> Max </span>

                    <select
                      className="px-5 py-2 text-xs font-medium hover:z-10 rounded-r-md focus:outline-none focus:border-indigo-600 focus:z-10 hover:bg-gray-50 active:opacity-75"
                      id="sort"
                      name="sort"
                      onChange={(e) => {
                        setFilter({
                          ...filter,
                          max: e.target.value,
                        });
                      }}
                    >
                      <option> Max </option>
                      {Max.map(({ desc, value }) => (
                        <option value={value} key={value}>
                          {desc}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {searchParams.get("search") && (
        <h1 className="text-center mt-12 text-2xl font-bold">
          Search results "{searchParams.get("keyword")}"
        </h1>
      )}
      <div className="flex items-center my-10">
        {loading ? (
          <div className="flex justify-center content-center w-full">
            <div className="flex flex-col my-4 justify-center">
              <img
                src={logo}
                alt="Loading"
                width={200}
                height={200}
                className="animate-pulse mx-auto"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-flow-row auto-rows-max w-full gap-8 my-8 mx-10 lg:mx-36 grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 content-center">
            {listHouse.length === 0 && <h1>No house</h1>}
            {listHouse.map((item) => (
              <CardHouse
                key={item.id}
                id={item.id}
                titleHouse={item.title}
                cost={new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(item.price)}
                location={item.location}
                landArea={item.surface_area}
                buildingArea={item.building_area}
                imageHouse={item.image_url["1"]}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
