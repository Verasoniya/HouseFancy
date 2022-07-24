import React, { useContext, useEffect, useState } from "react";
import {
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaMapMarker,
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaUserAlt,
  FaWindows,
} from "react-icons/fa";

import { BidderHouse } from "../components/Bidder";
import CustomButton from "../components/CustomButton";
import { Input } from "../components/Input";
import Layout from "../components/Layout";
import { TrTd, TrTdDescription } from "../components/TrTd";
import logoblue from "../assets/logoblue.png";
import { useParams } from "react-router-dom";
import { apiRequest } from "../context/apiRequest";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import { TokenContext } from "../context/AuthContext";
import swal from "sweetalert";
import axios from "axios";
import jwtDecode from "jwt-decode";

const defaultData = {
  title: "",
  price: 0,
  location: "",
  longitude: "",
  latitude: "",
  surface_area: 0,
  building_area: 0,
  bathroom: 0,
  bedroom: 0,
  certificate: "",
  description: "",
  image_url: [],
};

const DetailHouseList = () => {
  const [house, setHouse] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [bidder, setBidder] = useState(0);
  const [userId, setUserId] = useState();
  // const [disabled, setDisabled] = useState(true);
  const { id } = useParams();
  const [token, setToken] = useState("");

  const fetchDetail = () => {
    apiRequest(`houses/${id}`, `GET`, {}).then((res) => {
      const { data } = res.data;
      console.log(data);
      const image = [];
      Object.keys(data.image_url).map((img) => image.push(data.image_url[img]));
      const temp = {
        title: data.title,
        price: data.price,
        location: data.location,
        longitude: data.longitude,
        latitude: data.latitude,
        surface_area: data.surface_area,
        building_area: data.building_area,
        bathroom: data.bathroom,
        bedroom: data.bedroom,
        certificate: data.certificate,
        description: data.description,
        image_url: image,
      };
      setHouse(temp);
    });
  };

  const handleSubmite = async (e) => {
    e.preventDefault();
    const body = {
      id_house: id,
      nego: Number(bidder),
      status: "negotiation",
    };
    console.log(body);
    axios
      .post(`https://housefancy.site/negotiations/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        swal({
          icon: "success",
          title: "Successfully to Add Bid",
          buttons: false,
        });
        window.location.reload(true);
      })
      .catch((err) => {
        swal({
          icon: "error",
          title: err.response.data.message,
        });
        console.log(err);
      })
      .finally(() => fetchDetail());
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    fetchDetail();
    const decoded = jwtDecode(localStorage.getItem("token"));
    setUserId(decoded.userId);
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

  // const position = [house.longitude, house.latitude];

  // console.log(position);
  return (
    <Layout>
      <div className="flex justify-center w-full mt-10">
        <div className="flex flex-col items-center w-5/6 gap-8">
          <p className="font-bold text-xl">Detail of House</p>
          <div className="flex justify-between w-full">
            <FaChevronCircleLeft
              className="text-5xl cursor-pointer select-none text-blue-300 hover:text-blue-500 self-center"
              onClick={prevSlide}
            />
            <div>
              {house.image_url.map((slide, index) => {
                return (
                  <div
                    className={index === current ? "slide active" : "slide"}
                    key={index}
                  >
                    {index === current && (
                      <img
                        src={slide.image_url}
                        alt="slide-img"
                        className="w-[800px] h-[200px] lg:h-[300px]"
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <FaChevronCircleRight
              className="text-5xl cursor-pointer select-none text-blue-300 hover:text-blue-500 self-center"
              onClick={nextSlide}
            />
          </div>
          <p className="font-bold text-lg self-start">{house.title}</p>
          <div className="flex flex-col lg:flex-row justify-between w-full">
            <div className="flex flex-col w-full lg:w-1/2">
              <TrTd title={"Location:"} content={house.location} />
              <TrTd title={"Cost:"} content={`Rp${house.price}`} />
              <TrTd title={"Land Area:"} content={house.surface_area} />
              <TrTd title={"Building Area:"} content={house.building_area} />
              <TrTd title={"Bedrooms:"} content={house.bedroom} />
              <TrTd title={"Bathrooms:"} content={house.bathroom} />
              <TrTd title={"Certificate:"} content={house.certificate} />
              <TrTdDescription
                title={"Description:"}
                content={house.location}
              />
            </div>
            <div className="flex flex-col w-full lg:w-2/5 mt-8 lg:mt-0">
              <div className="flex justify-between  bg-white shadow shadow-slate-700 p-4">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <FaUserAlt className="text-md self-center" />{" "}
                    <p className="font-thin text-md">Andaru Akbar</p>
                  </div>
                  <div className="flex gap-2">
                    <FaPhone className="text-md self-center" />{" "}
                    <p className="font-thin text-md">0831-2748-4826</p>
                  </div>
                  <div className="flex gap-2">
                    <FaEnvelope className="text-md self-center" />{" "}
                    <p className="font-thin text-md">name@mail.com</p>
                  </div>
                  <div className="flex gap-2">
                    <FaMapMarker className="text-md self-center" />{" "}
                    <p className="font-thin text-md">Sentul, Bogor</p>
                  </div>
                </div>
                <img
                  src={logoblue}
                  alt="logo"
                  width={50}
                  height={50}
                  className="rounded-full self-center mr-2"
                />
              </div>
              <div className="w-full mt-8 z-0">
                <MapContainer
                  center={[house.longitude, house.latitude]}
                  zoom={13}
                  scrollWheelZoom={false}
                  style={{ height: "250px" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[house.longitude, house.latitude]}>
                    <Popup>{house.location}</Popup>
                  </Marker>
                </MapContainer>
              </div>
              <div className="mt-5">
                <Input
                  id={"input-bidder"}
                  type={"text"}
                  placeholder={"Add Bid Amount"}
                  onChange={(e) => setBidder(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <CustomButton
                  id={"button-bidder"}
                  label={"BID NOW"}
                  color={"blue"}
                  onClick={(e) => handleSubmite(e)}
                />
              </div>
              <div className="mt-5">
                <CustomButton
                  id={"button-whatsapp"}
                  icon={<FaWhatsapp className="text-2xl mr-2" />}
                  label={"WHATSAPP"}
                  color={"green"}
                />
              </div>
            </div>
          </div>
          <div className="border-t border-dashed border-blue-400 w-full mt-16" />
          <p className="font-semibold text-2xl self-start">Bidder</p>
          <div className="self-start w-2/3 mb-5">
            <BidderHouse id={id} user_id={userId} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailHouseList;
