import React, { useEffect, useState } from "react";
import {
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaMapMarker,
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaUserAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { BidderHouse } from "../components/Bidder";
import CustomButton from "../components/CustomButton";
import { Input } from "../components/Input";
import Layout from "../components/Layout";
import { TrTd, TrTdDescription } from "../components/TrTd";

import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../context/apiRequest";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import swal from "sweetalert";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "../../src/mycss.css";
import logo from "../assets/logoblue.png";

const defaultData = {
  title: "",
  price: 0,
  location: "",
  longitude: 0,
  latitude: 0,
  surface_area: 0,
  building_area: 0,
  bathroom: 0,
  bedroom: 0,
  certificate: "",
  description: "",
  image_url: [],
  phone_number: 0,
};

const DetailHouseList = () => {
  let navigate = useNavigate();
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
        phone_number: data.user.phone_number,
        full_name: data.user.full_name,
        email: data.user.email,
        address: data.user.address,
        img: data.user.image_url,
      };
      setLoading(false);
      setHouse(temp);
    });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      const decoded = jwtDecode(localStorage.getItem("token"));
      setUserId(decoded.userId);
    }
    fetchDetail();
  }, []);
  const handleSubmite = async (e) => {
    e.preventDefault();

    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    const body = {
      id_house: id,
      nego: Number(bidder),
      status: "negotiation",
    };
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
      })
      .finally(() => fetchDetail());
  };

  const position = {
    lat: house.longitude,
    lng: house.latitude,
  };

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

  if (loading) {
    return (
      <div className="flex justify-center content-center">
        <div className="flex flex-col h-screen justify-center ">
          <img
            src={logo}
            alt="Loading"
            width={200}
            height={200}
            className="animate-pulse"
          />
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
                <TrTd
                  title={"Cost:"}
                  content={new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(house.price)}
                />
                <TrTd
                  title={"Land Area:"}
                  content={`${house.surface_area} m^2`}
                />
                <TrTd
                  title={"Building Area:"}
                  content={`${house.building_area} m^2`}
                />
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
                      <p className="font-thin text-md">{house.full_name}</p>
                    </div>
                    <div className="flex gap-2">
                      <FaPhone className="text-md self-center" />{" "}
                      <p className="font-thin text-md">{house.phone_number}</p>
                    </div>
                    <div className="flex gap-2">
                      <FaEnvelope className="text-md self-center" />{" "}
                      <p className="font-thin text-md">{house.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <FaMapMarker className="text-md self-center" />{" "}
                      <p className="font-thin text-md">{house.address}r</p>
                    </div>
                  </div>
                  <img
                    src={house.img}
                    alt={house.full_name}
                    width={50}
                    height={50}
                    className="rounded-full self-center mr-2"
                  />
                </div>
                <div className="w-full mt-8 z-0">
                  <MapContainer
                    center={position}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: "250px" }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
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
                    onClick={() =>
                      window.open(
                        `https://wa.me/${house.phone_number}`,
                        "__blank"
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <div className="border-t border-dashed border-blue-400 w-full mt-16" />
            <p className="font-semibold text-2xl self-start">Bidder</p>
            <div className="self-start w-2/3 mb-10">
              {localStorage.getItem("token") ? (
                <BidderHouse id={id} user_id={userId} />
              ) : (
                <h1 className="font-bold text-md">
                  <Link to="/">
                    <span className="text-blue-500">Login</span>
                  </Link>{" "}
                  to see other people's offers
                </h1>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};

export default DetailHouseList;
