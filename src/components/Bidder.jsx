import React, { useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa";
import CustomButton from "./CustomButton";
import { FaEnvelope } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import logo from "../assets/background-banner.jpg";
import { apiRequest, apiRequestWithHeaders } from "../context/apiRequest";
import axios from "axios";
import swal from "sweetalert";

const Bidder = (props) => {
  return (
    <div className="flex gap-4">
      <div className="w-[50px] h-[50px]">
        <img
          src={logo}
          alt={logo}
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-4">
          <p className="font-bold text-lg self-center">{props.fullname}</p>
          <p className="text-md self-center">IDR {props.bidNominal}</p>
        </div>
        <div className="flex gap-3">
          <CustomButton
            icon={<FaWhatsapp className="text-2xl mr-2" />}
            label={"CHAT_BIDDER"}
            color={"green"}
            onClick={props.onClickChat}
          />
          <CustomButton label={"DEAL"} onClick={props.onClickDeal} />
          <CustomButton
            label={"CANCEL"}
            color={"white"}
            border={"red"}
            borderWidth={2}
            textColor={"red"}
            onClick={props.onClickCancel}
          />
        </div>
      </div>
    </div>
  );
};

const BidderHouse = ({ id, user_id, token }) => {
  const [bidder, setBidder] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`https://housefancy.site/negotiations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBidder([...res.data.data.data]);
      })
      .catch((err) => console.log(err.response.data.message));
    // .finally(() => BidderHouse());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to cancel the bidded?`)) {
      axios
        .delete(`https://housefancy.site/negotiations/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() =>
          swal({
            icon: "success",
            title: "successfully canceled",
          })
        )
        .catch((err) => console.log(err.response.data.message));
    }
  };

  return (
    <>
      {" "}
      {bidder.map((data) => (
        <div className="flex gap-4 mb-5" key={data.id}>
          <div className="w-[50px] h-[50px]">
            <img
              src={data.user.image_url}
              alt={data.user.full_name}
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-4">
              <p className="font-bold text-lg self-center">
                {data.user.full_name}
              </p>
              <p className="text-md self-center">IDR {data.nego}</p>
            </div>
            {user_id == data.user.id && (
              <div className="flex gap-3">
                <CustomButton
                  label={"CANCEL"}
                  color={"white"}
                  border={"red"}
                  borderWidth={2}
                  textColor={"red"}
                  onClick={() => handleDelete(data.id)}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
const Owner = (props) => {
  return (
    <div className="flex gap-4">
      <div className="w-[50px] h-[50px]">
        <img
          src={logo}
          alt={logo}
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-4">
          <p className="font-bold text-lg self-center">{}</p>
          <p className="text-md self-center">IDR {}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex mb-1">
            <div className="self-center">
              <FaPhone />
            </div>
            <p className="font-normal text-sm ml-2">{}</p>
          </div>
          <div className="flex mb-1">
            <div className="self-center">
              <FaEnvelope />
            </div>
            <p className="font-normal text-sm ml-2">{}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Bidder, BidderHouse, Owner };
