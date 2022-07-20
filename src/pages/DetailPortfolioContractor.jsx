import React, { useState } from "react";

// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

import Layout from "../components/Layout";
import { TrTd, TrTdDescription } from "../components/TrTd";

const DetailPortfolioContractor = () => {
  const [current, setCurrent] = useState(0);

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
              <TrTd title={"Client:"} content={"John Due"} />
              <TrTd title={"Completed:"} content={"8 January 2021"} />
              <TrTd title={"Location:"} content={"Jawa Tengah"} />
              <TrTd title={"Cost:"} content={"2.000.000.000"} />
              <TrTdDescription
                title={"Description:"}
                content={"lorem ipsun diuyayacuyguwfwgeyfugwfgyw"}
              />
            </div>
            <div className="flex flex-col w-full lg:w-2/5 mt-8 lg:mt-0">
              <div className="w-full z-0">map</div>
              {/* <div className="w-full mt-8 z-0">
              <MapContainer center={[house.longitude, house.latitude]} zoom={13} scrollWheelZoom={false} style={{ height: "250px" }}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[house.longitude, house.latitude]}>
                  <Popup>{house.location}</Popup>
                </Marker>
              </MapContainer>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailPortfolioContractor;
