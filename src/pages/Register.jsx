import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { Input } from "../components/Input";
import CustomButton from "../components/CustomButton";

import logo from "../assets/logo-gray.png";
import { apiRequest } from "../context/apiRequest";

function Register() {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (fullname && phone && address && email && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [fullname, phone, address, email, password]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      fullname,
      address,
      email,
      password,
      loading,
      disabled,
    };
    apiRequest("users", "POST", body)
      .then((res) => {
        if (res.status === "success") {
          swal({
            icon: "success",
            title: "Register Successfully",
          });
          navigate("/login");
        }
      })
      .catch((err) => {
        swal({
          icon: "error",
          title: err,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
        <form className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12 gap-2" onSubmit={(e) => handleSubmit(e)}>
          <p className="font-bold text-xl mb-2 self-start">Create Your Account</p>
          <Input id="input-full-name" type={"text"} placeholder={"Fullname"} onChange={(e) => setFullname(e.target.value)} />
          <Input id="input-phone-number" type={"text"} placeholder={"Phone Number"} onChange={(e) => setPhone(e.target.value)} />
          <Input id="input-address" type={"text"} placeholder={"Address"} onChange={(e) => setAddress(e.target.value)} />
          <Input id="input-email" type={"email"} placeholder={"Email"} onChange={(e) => setEmail(e.target.value)} />
          <Input id="input-password" type={"password"} placeholder={"Password"} onChange={(e) => setPassword(e.target.value)} />
          <p />
          <CustomButton id="btn-submit" label={"SUBMIT"} loading={loading || disabled} disabled={email.length === 0 || password.length === 0} />
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