import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { TokenContext } from "../context/AuthContext";
import { apiRequest } from "../context/apiRequest";
import CustomButton from "../components/CustomButton";
import { Input } from "../components/Input";
import Layout from "../components/Layout";

import logo from "../assets/logoblue.png";

function JoinContractor() {
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [contractor_name, setContractorName] = useState("");
  const [number_siujk, setNumberSIUJK] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [image_file, setImageProfile] = useState("");
  const [certificate_file, setCertificateFile] = useState("");

  useEffect(() => {
    if (
      image_file &&
      contractor_name &&
      number_siujk &&
      certificate_file &&
      phone_number &&
      email &&
      address &&
      description
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    contractor_name,
    certificate_file,
    phone_number,
    number_siujk,
    description,
    image_file,
    address,
    email,
  ]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("contractor_name", contractor_name);
    formData.append("certificate_file", certificate_file);
    formData.append("phone_number", phone_number);
    formData.append("number_siujk", number_siujk);
    formData.append("description", description);
    formData.append("image_file", image_file);
    formData.append("address", address);
    formData.append("email", email);

    apiRequest("/contractors", "POST", formData, "multipart/form-data")
      .then((res) => {
        swal({
          icon: "success",
          title: "Successfully to Join Contractor",
        });
        navigate("/my-contractor-profile");
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
        <div className="flex flex-col items-center my-10">
          <p className="font-bold text-xl mb-10">Validation</p>
          <form
            className="flex flex-col w-full lg:w-2/5 px-4 lg:px-0 gap-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Input
              type={"file"}
              id={"input-photo-profile"}
              placeholder={"Company Photo Profile"}
              required
              onChange={(e) => {
                setImageProfile(e.target.files[0]);
              }}
            />
            <Input
              type={"text"}
              id={"input-company-name"}
              placeholder={"Company Name"}
              required
              onChange={(e) => setContractorName(e.target.value)}
            />
            <Input
              type={"text"}
              id={"input-siujk-number"}
              placeholder={"SIUJK Number"}
              required
              onChange={(e) => setNumberSIUJK(e.target.value)}
            />
            <Input
              type={"file"}
              id={"input-siujk-file"}
              placeholder={"Upload SIUJK File"}
              required
              onChange={(e) => {
                setCertificateFile(e.target.files[0]);
              }}
            />
            <Input
              type={"text"}
              id={"input-company-phone"}
              placeholder={"Company Phone Number"}
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Input
              type={"email"}
              id={"input-company-email"}
              placeholder={"Company Email"}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type={"text"}
              id={"input-company-address"}
              placeholder={"Company Address"}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
            <textarea
              id={"input-company-details"}
              placeholder={"Company Details"}
              className="resize-y h-32 w-full bg-white placeholder-stone-600 text-neutral-900 font-normal border border-blue-400 focus:border focus:border-blue-400 focus:ring-0 rounded-sm p-2 pl-3 text-sm"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <CustomButton
              label={"Validation"}
              loading={loading || disabled}
              disabled={
                email.length === 0 ||
                contractor_name.length === 0 ||
                certificate_file.length === 0 ||
                phone_number.length === 0 ||
                number_siujk.length === 0 ||
                description.length === 0 ||
                image_file.length === 0 ||
                address.length === 0
              }
            />
          </form>
        </div>
      </Layout>
    );
  }
}

export default JoinContractor;
