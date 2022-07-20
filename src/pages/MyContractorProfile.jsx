import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import CustomButton from "../components/CustomButton";
import { apiRequest } from "../context/apiRequest";
import Layout from "../components/Layout";
import { Input } from "../components/Input";

import { TokenContext } from "../context/AuthContext";
import logo from "../assets/logoblue.png";
import { CardPortfolio } from "../components/Card";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import { withRouter } from "../context/navigations";

function MyContractorProfile(props) {
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);
  const [loading, setLoading] = useState(true);
  const [contractor_name, setContractorName] = useState("");
  const [number_siujk, setNumberSIUJK] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImageProfile] = useState("");
  const [certificate_file, setCertificateFile] = useState("");
  const [portfolio, setPortfolio] = useState([]);
  const [offset, setOffset] = useState(13);

  const { contractor_id } = props.params;

  useEffect(() => {
    fetchContractorDetail();
  }, []);

  const fetchContractorDetail = () => {
    // apiRequest(`/contractors/${contractor_id}`, "GET", {})
    apiRequest(`/contractors/2`, "GET", {})
      .then((res) => {
        const { contractor_name, address, description, email, image_url, number_siujk, phone_number, certificate_file } = res.data;
        setContractorName(contractor_name);
        setAddress(address);
        setDescription(description);
        setEmail(email);
        setImageProfile(image_url);
        setNumberSIUJK(number_siujk);
        setPhoneNumber(phone_number);
        setCertificateFile(certificate_file);

        console.log(res);
      })
      .catch((err) => {
        swal({
          icon: "error",
          title: err,
        });
      })
      .finally(() => fetchMyPortfolio());
  };

  const fetchMyPortfolio = async () => {
    // apiRequest(`/portfolios/contractors/${contractor_id}?limit=12&offset=0`, "GET", {})
    apiRequest("/portfolios/contractors/1?limit=12&offset=0", "GET", {})
      .then((res) => {
        const { data } = res.data;
        // const { data } = res;
        console.log(data);
        setPortfolio(data);
      })
      .catch((err) => {
        swal({
          icon: "error",
          title: err,
        });
      })
      .finally(() => setLoading(false));
  };

  const fetchMoreListPortfolio = async () => {
    const newOffset = offset + 12;
    // apiRequest(`/portfolios/contractors/${contractor_id}?limit=12&offset=${offset}`, "GET", {})
    apiRequest(`/portfolios/contractors/1?limit=12&offset=${offset}`, "GET", {})
      .then((res) => {
        const { data } = res.data;
        console.log(res.data);
        const temp = portfolio.slice();
        temp.push(...data);
        setPortfolio(temp);
        console.log(temp);
        setOffset(newOffset);
      })
      .catch((err) =>
        swal({
          icon: "error",
          title: err,
        })
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("certificate_file", certificate_file);
    formData.append("contractor_name", contractor_name);
    formData.append("phone_number", phone_number);
    formData.append("number_siujk", number_siujk);
    formData.append("description", description);
    formData.append("image_url", image_url);
    formData.append("address", address);
    formData.append("email", email);

    // apiRequest(`/contractors/${contractor_id}`, "PUT", formData, "multipart/form-data")
    apiRequest("/contractors/2", "PUT", formData, "multipart/form-data")
      .then((res) => {
        swal({
          icon: "success",
          title: "Successfully to Update",
        });
        navigate("/my-contractor-profile");
      })
      .catch((err) => {
        swal({
          icon: "error",
          title: err,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleDelContractor = async () => {
    apiRequest(`/contractors`, "DELETE", {})
      .then((res) => {
        swal({
          icon: "success",
          title: "Successfully Delete",
        });
      })
      .catch((err) =>
        swal({
          icon: "error",
          title: err,
        })
      )
      .finally(() => setLoading(false));
  };

  const handleDelPortfolio = async (item) => {
    // apiRequest(`/houses/${item}`, "DELETE", {})
    //   .then((res) => {
    //     swal({
    //       icon: "success",
    //       title: "Successfully Delete",
    //     });
    //   })
    //   .catch((err) =>
    //     swal({
    //       icon: "error",
    //       title: err,
    //     })
    //   )
    //   .finally(() => setLoading(false));
  };

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
        <div className="w-14 text-3xl absolute bottom-12 right-8 md:bottom-14 md:right-16">
          <CustomButton label={<FaPlus className="text-sm" />} radius={"50%"} padding={20} onClick={() => navigate("/add-portfolio")} />
        </div>
        <div className="flex flex-col items-center my-10">
          <p className="font-bold text-xl mb-10">{contractor_name}</p>
          <div className="flex flex-col lg:flex-row justify-center lg:justify-around w-full lg:w-3/4">
            <form className="flex flex-col w-full lg:w-2/5 gap-4 px-4 lg:px-0 mb-6 lg:mb-0" onSubmit={(e) => handleSubmit(e)}>
              <label for="input-photo-profile" className="bg-white relative px-1 top-6 left-3 w-36 text-[11px]">
                Company Photo Profile
              </label>
              <Input
                type={"file"}
                id={"input-photo-profile"}
                placeholder={"Company Photo Profile"}
                onChange={(e) => {
                  setImageProfile(URL.createObjectURL(e.target.files[0]));
                }}
              />
              <Input type={"text"} id={"input-company-name"} placeholder={"Company Name"} value={contractor_name} onChange={(e) => setContractorName(e.target.value)} />
              <Input type={"text"} id={"input-siujk-number"} placeholder={"SIUJK Number"} value={number_siujk} onChange={(e) => setNumberSIUJK(e.target.value)} />
              <label for="input-siujk-file" className="bg-white relative px-1 top-6 left-3 w-36 text-[11px]">
                Upload Certificate SIUJK
              </label>
              <Input
                type={"file"}
                id={"input-siujk-file"}
                placeholder={"Upload Certificate SIUJK"}
                onChange={(e) => {
                  setCertificateFile(URL.createObjectURL(e.target.files[0]));
                }}
              />
              <Input type={"text"} id={"input-company-phone"} placeholder={"Company Phone Number"} value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
              <Input type={"email"} id={"input-company-email"} placeholder={"Company Email"} value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input type={"text"} id={"input-company-address"} placeholder={"Company Address"} value={address} onChange={(e) => setAddress(e.target.value)} />
              <textarea
                id={"input-company-details"}
                placeholder={"Company Details"}
                className="resize-y h-32 w-full bg-white placeholder-stone-600 text-neutral-900 font-normal border border-blue-400 focus:border focus:border-blue-400 focus:ring-0 rounded-sm p-2 pl-3 text-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <CustomButton label={"UPDATE"} loading={loading} />
            </form>
            <div className="self-center">
              <img src={image_url} alt={"Company Photo Profile"} width={300} className="rounded-xl border mb-6" />
              <CustomButton label={"DELETE"} padding={6} color={"white"} textColor={"red"} borderWidth={2} border={"red"} onClick={() => handleDelContractor()} />
            </div>
          </div>
          <div className="w-5/6">
            <div className="border-t border-dashed border-blue-400 mt-16 mb-10" />
            <p className="font-bold text-xl self-start">Portfolio</p>
          </div>
          <div className="flex items-center">
            <div className="grid grid-flow-row auto-rows-max w-full gap-6 my-8 mx-10 lg:mx-28 grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 content-center">
              {portfolio.map((item) => (
                <CardPortfolio key={item.id} imagePortfolio={item.image_url[1].image_url} nameClient={item.client_name} cost={item.price} onClickDetailPortfolio={() => navigate(`/portfolio-detail/${item.id}`)}>
                  <div className="flex gap-2">
                    <div className="w-8">
                      <CustomButton label={<FaPencilAlt />} padding={6} color={"white"} textColor={"blue"} borderWidth={2} border={"blue"} onClick={() => navigate(`/portfolios/details/${item.id}`)} />
                    </div>
                    <div className="w-8">
                      <CustomButton label={<FaTrash />} padding={6} color={"white"} textColor={"red"} borderWidth={2} border={"red"} onClick={() => handleDelPortfolio(item.id)} />
                    </div>
                  </div>
                </CardPortfolio>
              ))}
            </div>
          </div>
          <div className="flex justify-end w-5/6">
            <div className="w-20 mb-10">
              <CustomButton label={"More"} onClick={() => fetchMoreListPortfolio()} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default withRouter(MyContractorProfile);
