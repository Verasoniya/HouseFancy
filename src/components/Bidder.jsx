import React from "react";
import logo from "../assets/background-banner.jpg";
import { FaPhone } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

const Bidder = (props) => {
  return (
    <div className="flex gap-4">
      <div className="w-[50px] h-[50px]">
        <img src={logo} alt={logo} width={50} height={50} className="rounded-full" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-4">
          <p className="font-bold text-lg self-center">Andaru{props.fullname}</p>
          <p className="text-md self-center">195 juta{props.bidNominal}</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-blue-500 p-3">cek</button>
          <button className="bg-blue-500 p-3">cek</button>
          <button className="bg-blue-500 p-3">cek</button>
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
          <p className="font-bold text-lg self-center">Andaru{props.fullname}</p>
          <p className="text-md self-center">195 juta{props.bidNominal}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex mb-1">
            <div className="self-center">
              <FaPhone />
            </div>
            <p className="font-normal text-sm ml-2">083128287363{props.phone}</p>
          </div>
          <div className="flex mb-1">
            <div className="self-center">
              <FaEnvelope />
            </div>
            <p className="font-normal text-sm ml-2">name@mail.com{props.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Bidder, Owner };
