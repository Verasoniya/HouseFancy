import React from "react";
import { FaPhone } from "react-icons/fa";
import CustomButton from "./CustomButton";
import { FaEnvelope } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import logo from "../assets/background-banner.jpg";

const Bidder = (props) => {
  return (
    <div className="flex gap-4">
      <div className="w-[50px] h-[50px]">
        <img src={logo} alt={logo} width={50} height={50} className="rounded-full" />
      </div>
      <div className="flex flex-col gap-3 w-full">
        <div className="flex gap-4">
          <p className="font-bold text-lg self-center">{props.fullname}</p>
          <p className="text-sm self-center">IDR {props.bidNominal}</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-3 text-xs">
          <div className="w-full lg:w-1/4">
            <CustomButton icon={<FaWhatsapp className="text-lg mr-1" />} label={"CHAT BIDDER"} color={"green"} border={"green"} borderWidth={2} onClick={props.onClickChat} />
          </div>
          <div className="w-full lg:w-1/6">
            <CustomButton label={"DEAL"} border={"blue"} borderWidth={2} onClick={props.onClickDeal} />
          </div>
          <div className="w-full lg:w-1/6">
            <CustomButton label={"CANCEL"} color={"white"} border={"red"} borderWidth={2} textColor={"red"} onClick={props.onClickCancel} />
          </div>
        </div>
      </div>
    </div>
  );
};
const Owner = (props) => {
  return (
    <div className="flex gap-4">
      <div className="w-[50px] h-[50px]">
        <img src={logo} alt={logo} width={50} height={50} className="rounded-full" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-4">
          <p className="font-bold text-lg self-center">{props.fullname}</p>
          <p className="text-md self-center">IDR {props.bidNominal}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex mb-1">
            <div className="self-center">
              <FaPhone />
            </div>
            <p className="font-normal text-sm ml-2">{props.phone}</p>
          </div>
          <div className="flex mb-1">
            <div className="self-center">
              <FaEnvelope />
            </div>
            <p className="font-normal text-sm ml-2">{props.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Bidder, Owner };
