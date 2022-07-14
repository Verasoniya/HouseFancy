import React from "react";
import CustomButton from "../components/CustomButton";
import logo from "../assets/logo-gray.png";
import { Input } from "../components/Input";

function Register() {
  return (
    <div className="flex justify-center items-center h-screen bg-split-white-black ">
      <div className="flex flex-col lg:flex-row w-3/4 lg:w-2/3 bg-white shadow-lg shadow-gray-700 rounded-xl">
        <div className="w-full lg:w-1/2 bg-auth-image bg-right-top rounded-bl-none rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none">
          <div className="flex flex-col justify-center items-center w-full h-full bg-opacity-50 bg-[#4285F4] p-10 lg:p-0 rounded-t-xl lg:rounded-tr-none lg:rounded-bl-xl">
            <img src={logo} alt="House Fancy" width={100} />
            <p className="font-bold text-xl text-[#F6F6F6]">House</p>
            <p className="font-bold text-xl text-[#F6F6F6]">Fancy</p>
            <p className="text-2xl text-[#F6F6F6] font-dancing-script">make your dream house</p>
          </div>
        </div>
        <form className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12 gap-2">
          <p className="font-bold text-xl mb-2 self-start">Create Your Account</p>
          <Input id="input-full-name" type={"text"} placeholder={"Fullname"} />
          <Input id="input-phone-number" type={"text"} placeholder={"Phone Number"} />
          <Input id="input-address" type={"text"} placeholder={"Address"} />
          <Input id="input-email" type={"email"} placeholder={"Email"} />
          <Input id="input-password" type={"password"} placeholder={"Password"} />
          <p />
          <CustomButton id="btn-submit" label={"SUBMIT"} />
          <p className="font-medium text-xs">
            Have an account?
            <a href="/login" className="text-[#4285F4] ml-1">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
