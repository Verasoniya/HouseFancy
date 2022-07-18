import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaEnvelope, FaPhone, FaUserAlt, FaChevronCircleLeft, FaChevronCircleRight, FaMapMarker } from "react-icons/fa";

import swal from "sweetalert";
import Layout from "../components/Layout";
import { Bidder, Owner } from "../components/Bidder";
import { TrTd, TrTdDescription } from "../components/TrTd";

import { withRouter } from "../context/navigations";

import logo from "../assets/logoblue.png";
import { apiRequest } from "../context/apiRequest";
import "../../src/mycss.css";

function HouseDetailSeller(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [house, setHouse] = useState([]);
  const [current, setCurrent] = useState(0);

  const SliderData = [
    {
      image: "https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      image: "https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80",
    },
    {
      image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
    },
    {
      image: "https://images.unsplash.com/photo-1475189778702-5ec9941484ae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80",
    },
    {
      image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
    },
  ];
  const length = SliderData.length;

  useEffect(() => {
    fetchHouseDetail();
  }, []);

  const fetchHouseDetail = () => {
    const { house_id } = props.params;
    apiRequest(`/houses/${house_id}`, "GET", {})
      .then((res) => {
        const { data } = res;
        setHouse(data);
        console.log(data);
      })
      .catch((err) => {
        swal({
          icon: "error",
          title: err,
        });
      })
      .finally(() => setLoading(false));
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(SliderData) || SliderData.length <= 0) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center content-center">
        <div className="flex flex-col h-screen justify-center ">
          <img src={logo} alt="Loading" width={200} height={200} className="animate-pulse" />
        </div>
      </div>
    );
  } else {
    return (
      <Layout>
        <div className="flex justify-center w-full mt-10">
          <div className="flex flex-col items-center w-5/6 gap-8">
            <p className="font-bold text-xl">Detail of House</p>
            <div className="flex justify-between w-full">
              <FaChevronCircleLeft className="text-5xl cursor-pointer select-none text-blue-300 hover:text-blue-500 self-center" onClick={prevSlide} />
              <div>
                {SliderData.map((slide, index) => {
                  return (
                    <div className={index === current ? "slide active" : "slide"} key={index}>
                      {index === current && <img src={slide.image} alt="travel image" className="w-[800px] h-[200px] lg:h-[300px]" />}
                    </div>
                  );
                })}
              </div>
              <FaChevronCircleRight className="text-5xl cursor-pointer select-none text-blue-300 hover:text-blue-500 self-center" onClick={nextSlide} />
            </div>
            <p className="font-bold text-lg self-start">{house.title}</p>
            <div className="flex flex-col lg:flex-row justify-between w-full">
              <div className="flex flex-col w-full lg:w-1/2">
                <TrTd title={"Location:"} content={house.location} />
                <TrTd title={"Cost:"} content={house.price} />
                <TrTd title={"Land Area:"} content={house.surface_area} />
                <TrTd title={"Building Area:"} content={house.building_area} />
                <TrTd title={"Bedrooms:"} content={house.bedroom} />
                <TrTd title={"Bathrooms:"} content={house.bathroom} />
                <TrTd title={"Certificate:"} content={house.certificate} />
                <TrTdDescription title={"Description:"} content={house.description} />
              </div>
              <div className="flex flex-col w-full lg:w-2/5 mt-8 lg:mt-0">
                <div className="flex justify-between  bg-white shadow shadow-slate-700 p-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                      <FaUserAlt className="text-md self-center" /> <p className="font-thin text-md">{house.user.full_name}</p>
                    </div>
                    <div className="flex gap-2">
                      <FaPhone className="text-md self-center" /> <p className="font-thin text-md">{house.user.phone_number}</p>
                    </div>
                    <div className="flex gap-2">
                      <FaEnvelope className="text-md self-center" /> <p className="font-thin text-md">{house.user.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <FaMapMarker className="text-md self-center" /> <p className="font-thin text-md">{house.user.lokasi}</p>
                    </div>
                  </div>
                  <img src={house.user.image_url} alt={house.user.image_url} width={50} height={50} className="rounded-full self-center mr-2" />
                </div>
                <div className="w-full mt-8 z-0">
                  <MapContainer center={[house.longitude, house.latitude]} zoom={13} scrollWheelZoom={false} style={{ height: "250px" }}>
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[house.longitude, house.latitude]}>
                      <Popup>{house.location}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            </div>
            <div className="border-t border-dashed border-blue-400 w-full mt-16" />
            <p className="font-semibold text-2xl self-start">Bidder</p>
            <div className="self-start w-2/3">
              <Bidder />
            </div>
            <p className="font-semibold text-2xl self-start">Owner</p>
            <div className="self-start w-2/3">
              <Owner />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default withRouter(HouseDetailSeller);
