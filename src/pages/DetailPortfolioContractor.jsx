import axios from "axios";
import React, { useEffect, useState } from "react";

// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { useParams } from "react-router-dom";

import Layout from "../components/Layout";
import { TrTd, TrTdDescription } from "../components/TrTd";

const defaultData = {
  client_name: "",
  location: "",
  finish_date: "",
  longitude: 0,
  latitude: 0,
  price: 0,
  description: "",
  img_url: [],
};

const DetailPortfolioContractor = () => {
  const [current, setCurrent] = useState(0);
  const [portfolio, setPortfolio] = useState(defaultData);
  const { id } = useParams();
  const [token, setToken] = useState("");

  const fetchDetail = async () => {
    axios
      .get(`https://housefancy.site/portfolios/details/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { data } = res.data.data;
        console.log(data);
        const image = [];
        Object.keys(data.image_url).map((img) =>
          image.push(data.image_url[img])
        );
        const temp = {
          client_name: data.client_name,
          location: data.location,
          longitude: data.longitude,
          latitude: data.latitude,
          price: data.price,
          finish_date: data.finish_date,
          description: data.description,
          image_url: image,
        };
        setPortfolio(temp);
      });
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  const SliderData = [
    {
      image:
        "https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1475189778702-5ec9941484ae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
    },
  ];
  const length = SliderData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(SliderData) || SliderData.length <= 0) {
    return null;
  }

  return (
    <Layout>
      <div className="flex justify-center w-full mt-10">
        <div className="flex flex-col items-center w-5/6 gap-8">
          <p className="font-bold text-xl">Detail of Portfolio</p>
          <div className="flex justify-between w-full">
            <FaChevronCircleLeft
              id="button-slidePrev"
              className="text-5xl cursor-pointer select-none text-blue-300 hover:text-blue-500 self-center"
              onClick={prevSlide}
            />
            <div>
              {SliderData.map((slide, index) => {
                return (
                  <div
                    className={index === current ? "slide active" : "slide"}
                    key={index}
                  >
                    {index === current && (
                      <img
                        src={slide.image}
                        alt="img-slider"
                        className="w-[800px] h-[200px] lg:h-[300px]"
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <FaChevronCircleRight
              id="button-slideNext"
              className="text-5xl cursor-pointer select-none text-blue-300 hover:text-blue-500 self-center"
              onClick={nextSlide}
            />
          </div>
          <p className="font-bold text-lg self-start">
            {"Elegant house with strategic location"}
          </p>
          <div className="flex flex-col lg:flex-row justify-between w-full">
            <div className="flex flex-col w-full lg:w-1/2">
              <TrTd title={"Client:"} content={portfolio.client_name} />
              <TrTd title={"Completed:"} content={portfolio.finish_date} />
              <TrTd title={"Location:"} content={portfolio.location} />
              <TrTd title={"Cost:"} content={portfolio.price} />
              <TrTdDescription
                title={"Description:"}
                content={portfolio.description}
              />
            </div>
            <div className="flex flex-col w-full lg:w-2/5 mt-8 lg:mt-0 lg:self-start">
              <div className="w-full mt-8 lg:mt-0">
                <MapContainer
                  center={[portfolio.longitude, portfolio.latitude]}
                  zoom={13}
                  scrollWheelZoom={false}
                  style={{ height: "250px" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[portfolio.longitude, portfolio.latitude]}>
                    <Popup>{portfolio.location}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailPortfolioContractor;
