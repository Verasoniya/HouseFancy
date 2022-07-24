import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  FaEnvelope,
  FaPhone,
  FaUserAlt,
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaMapMarker,
} from "react-icons/fa";

import swal from "sweetalert";
import Layout from "../components/Layout";
import { Bidder, Owner } from "../components/Bidder";
import CustomButton from "../components/CustomButton";
import { TrTd, TrTdDescription } from "../components/TrTd";

import { withRouter } from "../context/navigations";

import "../../src/mycss.css";
import logo from "../assets/logoblue.png";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../context/apiRequest";
import { TokenContext } from "../context/AuthContext";

function HouseDetailSeller(props) {
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const { house_id } = props.params;
  const [loading, setLoading] = useState(true);
  const [house, setHouse] = useState([]);
  const [bidder, setBidder] = useState([]);
  const [offset, setOffset] = useState(13);
  const [current, setCurrent] = useState(0);
  const [image_slider, setImageSlider] = useState([]);
  // const [status, setStatus] = useState("");
  const length = image_slider.length;

  useEffect(() => {
    fetchHouseDetail();
  }, []);

  const fetchHouseDetail = () => {
    apiRequest(`/houses/${house_id}`, "GET", {})
      .then((res) => {
        const { data } = res.data;
        const image = [];
        Object.keys(data.image_url).map((img) =>
          image.push(data.image_url[img])
        );
        setHouse(data);
        setImageSlider(image);
        console.log(image);
      })
      .catch((err) => {
        const { data } = err.response;
        if ([401, 403].includes(data.code)) {
          localStorage.removeItem("token");
          setToken("0");
          navigate("/login");
        }
        swal({
          icon: "error",
          title: data.message,
        });
      })
      .finally(() => fetchBidder());
  };

  const fetchBidder = () => {
    apiRequest(`/negotiations/${house_id}?limit=12&offset=0`, "GET", {})
      .then((res) => {
        const { data } = res.data;
        setBidder(data);
        console.log(data);
      })
      .catch((err) => {
        const { data } = err.response;
        if ([401, 403].includes(data.code)) {
          localStorage.removeItem("token");
          setToken("0");
          navigate("/login");
        }
        swal({
          icon: "error",
          title: data.message,
        });
      })
      .finally(() => setLoading(false));
  };

  const fetchMoreListBidder = async () => {
    const newOffset = offset + 12;
    apiRequest(`/negotiations/${house_id}?limit=12&offset=${offset}`, "GET", {})
      .then((res) => {
        const { data } = res.data;
        console.log(res);
        const temp = bidder.slice();
        temp.push(...data);
        setBidder(temp);
        console.log(temp);
        setOffset(newOffset);
      })
      .catch((err) => {
        const { data } = err.response;
        if ([401, 403].includes(data.code)) {
          localStorage.removeItem("token");
          setToken("0");
          navigate("/login");
        }
        swal({
          icon: "error",
          title: data.message,
        });
      });
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(image_slider) || image_slider.length <= 0) {
    return null;
  }

  const handleChatBidder = (item) => {
    window.open(
      `https://wa.me/62${item}?text=Halo%20Saya%20pemilik%20rumah%20${house.title}.`,
      "_blank"
    );
  };

  const handleDeal = (item) => {
    const status = "owned";
    const body = {
      status,
    };

    apiRequest(`/negotiations/${item}`, "PUT", body)
      .then((res) => {
        console.log(status);
        swal({
          icon: "success",
          title: "House Sold Out",
        });
      })
      .catch((err) => {
        const { data } = err.response;
        if ([401, 403].includes(data.code)) {
          localStorage.removeItem("token");
          setToken("0");
          navigate("/login");
        }
        swal({
          icon: "error",
          title: data.message,
        });
      })
      .finally(() => fetchHouseDetail());
  };

  const handleCancel = (item) => {
    const status = "cancel";
    const body = {
      status,
    };

    apiRequest(`/negotiations/${item}`, "PUT", body)
      .then((res) => {
        swal({
          icon: "success",
          title: "Bid Canceled",
        });
      })
      .catch((err) => {
        const { data } = err.response;
        if ([401, 403].includes(data.code)) {
          localStorage.removeItem("token");
          setToken("0");
          navigate("/login");
        }
        swal({
          icon: "error",
          title: data.message,
        });
      })
      .finally(() => fetchHouseDetail());
  };

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
                {image_slider.map((slide, index) => {
                  // {
                  //   console.log(slide);
                  // }
                  return (
                    <div
                      className={index === current ? "slide active" : "slide"}
                      key={index}
                    >
                      {index === current && (
                        <img
                          src={slide.image_url}
                          alt="House Image"
                          className="w-auto h-[200px] lg:h-[300px]"
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
                <TrTd title={"Cost:"} content={house.price} />
                <TrTd title={"Surface Area:"} content={house.surface_area} />
                <TrTd title={"Building Area:"} content={house.building_area} />
                <TrTd title={"Bedrooms:"} content={house.bedroom} />
                <TrTd title={"Bathrooms:"} content={house.bathroom} />
                <TrTd title={"Certificate:"} content={house.certificate} />
                <TrTdDescription
                  title={"Description:"}
                  content={house.description}
                />
              </div>
              <div className="flex flex-col w-full lg:w-2/5 mt-8 lg:mt-0">
                <div className="flex justify-between  bg-white shadow shadow-slate-700 p-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                      <FaUserAlt className="text-md self-center" />{" "}
                      <p className="font-thin text-md">
                        {house.user.full_name}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <FaPhone className="text-md self-center" />{" "}
                      <p className="font-thin text-md">
                        {house.user.phone_number}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <FaEnvelope className="text-md self-center" />{" "}
                      <p className="font-thin text-md">{house.user.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <FaMapMarker className="text-md self-center" />{" "}
                      <p className="font-thin text-md">{house.user.address}</p>
                    </div>
                  </div>
                  <img
                    src={house.user.image_url}
                    alt={house.user.image_url}
                    width={50}
                    height={50}
                    className="rounded-full self-center mr-2"
                  />
                </div>
                <div className="w-full mt-8 z-0">
                  <MapContainer
                    center={[house.latitude, house.longitude]}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: "250px" }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[house.latitude, house.longitude]}>
                      <Popup>{house.location}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            </div>
            <div className="border-t border-dashed border-blue-400 w-full mt-16" />
            {house.status === "Sold Out" ? (
              <div className="self-start w-2/3 mb-10">
                {console.log(bidder[0].user)}
                <p className="font-semibold text-2xl mb-6">Owner</p>
                <Owner
                  imageProfile={bidder[0].user.image_url}
                  fullname={bidder[0].user.full_name}
                  bidNominal={bidder[0].nego}
                  phone={bidder[0].user.phone_number}
                  email={bidder[0].user.email}
                />
              </div>
            ) : (
              <div className="self-start w-2/3 mb-10">
                <p className="font-semibold text-2xl mb-6">Bidder</p>
                {bidder.map((item) => (
                  <Bidder
                    key={item.id}
                    imageProfile={item.user.image_url}
                    fullname={item.user.full_name}
                    bidNominal={item.nego}
                    onClickChat={() =>
                      handleChatBidder(item.user.phone_number.substring(1))
                    }
                    onClickDeal={() => handleDeal(item.id)}
                    onClickCancel={() => handleCancel(item.id)}
                  />
                ))}
                <div className="w-20 mb-10">
                  <CustomButton
                    label={"More"}
                    onClick={() => fetchMoreListBidder()}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
  }
}

export default withRouter(HouseDetailSeller);
