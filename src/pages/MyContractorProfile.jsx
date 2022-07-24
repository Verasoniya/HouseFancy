import React, { useContext, useEffect, useState } from "react";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import CustomButton from "../components/CustomButton";
import { CardPortfolio } from "../components/Card";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import Layout from "../components/Layout";

import { TokenContext } from "../context/AuthContext";
import { withRouter } from "../context/navigations";
import { apiRequest } from "../context/apiRequest";
import logo from "../assets/logoblue.png";

function MyContractorProfile(props) {
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);
  const [loading, setLoading] = useState(true);
  const [id_contractor, setContractorId] = useState("");
  const [contractor_name, setContractorName] = useState("");
  const [number_siujk, setNumberSIUJK] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [image_file, setImageProfile] = useState("");
  const [certificate_file, setCertificateFile] = useState("");
  const [portfolio, setPortfolio] = useState([]);
  const [offset, setOffset] = useState(13);

  const { contractor_id } = props.params;
  console.log(contractor_id);

  useEffect(() => {
    fetchContractorDetail();
  }, []);

  const fetchContractorDetail = () => {
    apiRequest(`/contractors/${contractor_id}`, "GET", {})
      // apiRequest(`/contractors/2`, "GET", {})
      .then((res) => {
        const { id, contractor_name, address, description, email, image_url, number_siujk, phone_number, certificate_siujk_url } = res.data;
        setContractorId(id);
        setContractorName(contractor_name);
        setAddress(address);
        setDescription(description);
        setEmail(email);
        setNumberSIUJK(number_siujk);
        setPhoneNumber(phone_number);
        setImageProfile(image_url);
        setCertificateFile(certificate_siujk_url);

        console.log(res);
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
      .finally(() => fetchMyPortfolio());
  };

  const fetchMyPortfolio = async () => {
    apiRequest(`/portfolios/contractors/${contractor_id}?limit=12&offset=0`, "GET", {})
      // apiRequest("/portfolios/contractors/1?limit=12&offset=0", "GET", {})
      .then((res) => {
        const { data } = res.data;
        // const { data } = res;
        console.log(data);
        setPortfolio(data);
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

  const fetchMoreListPortfolio = async () => {
    const newOffset = offset + 12;
    apiRequest(`/portfolios/contractors/${contractor_id}?limit=12&offset=${offset}`, "GET", {})
      // apiRequest(`/portfolios/contractors/1?limit=12&offset=${offset}`, "GET", {})
      .then((res) => {
        const { data } = res.data;
        console.log(res.data);
        const temp = portfolio.slice();
        temp.push(...data);
        setPortfolio(temp);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("certificate_file", certificate_file);
    formData.append("image_file", image_file);
    formData.append("contractor_name", contractor_name);
    formData.append("phone_number", phone_number);
    formData.append("number_siujk", number_siujk);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("email", email);

    apiRequest(`/contractors/${contractor_id}`, "PUT", formData, "multipart/form-data")
      .then(async (res) => {
        await swal({
          icon: "success",
          title: "Successfully to Update",
        });
        fetchContractorDetail();
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

  const handleDelContractor = async () => {
    apiRequest(`/contractors`, "DELETE", {})
      .then((res) => {
        swal({
          icon: "success",
          title: "Successfully Delete",
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
      .finally(() => setLoading(false));
  };

  // ------------------- Delete Portfolio (GET Portfolio for get id image) ------------------------
  const handleDelSubmit = async (item) => {
    apiRequest(`/portfolios/details/${item}`, "GET", {})
      .then((res) => {
        const { data } = res.data;
        const image = [];
        console.log("image", image);
        console.log("data", data);
        Object.keys(data.image_url).map((img) => image.push(data.image_url[img]));
        handleDelImagePortfolio(item, image);
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

  // ------------------- Delete Portfolio (Delete Image after get id image) ------------------------
  const handleDelImagePortfolio = async (item, image) => {
    const id_portfolio = item;
    const images = image;
    console.log(image);
    console.log(images);
    const id_image = [];
    for (let i = 0; i < images.length; i++) {
      id_image.push(images[i].id);
      console.log(images[i].id);
    }

    let requests = [];
    for (let i = 0; i < id_image.length; i++) {
      let image_id = id_image[i];

      requests.push(
        apiRequest(`/portfolios/images/${image_id}`, "DELETE", {})
          .then(async (res) => {
            return Promise.resolve(true);
          })
          .catch((err) => {
            console.log(err.message);
            return Promise.resolve(false);
          })
      );
    }
    console.log("Loop");

    await Promise.all(requests).then((results) => {
      console.log("finished", results);
      for (let i = 0; i < requests.length; i++) {
        console.log(i, "request result in ", results[i]);
      }
      handleDelPortfolio(id_portfolio);
    });
  };

  // ------------------- Delete Portfolio (Delete Portfolio after delete image) ------------------------
  const handleDelPortfolio = async (id_portfolio) => {
    apiRequest(`/portfolios/details/${id_portfolio}`, "DELETE", {})
      .then((res) => {
        swal({
          icon: "success",
          title: "Successfully Delete Portfolio",
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
      .finally(() => fetchMyPortfolio());
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
          <CustomButton label={<FaPlus className="text-sm" />} radius={"50%"} padding={20} onClick={() => navigate(`/add-portfolio/${id_contractor}`)} />
        </div>
        <div className="flex flex-col items-center my-10">
          <p className="font-bold text-xl mb-10">{contractor_name}</p>
          <div className="flex flex-col lg:flex-row justify-center lg:justify-around w-full lg:w-3/4">
            <form className="flex flex-col w-full gap-1 lg:w-2/5 px-4 lg:px-0 mb-6 lg:mb-0" onSubmit={(e) => handleSubmit(e)}>
              <Label label={"Company Photo Profile"} />
              <Input
                type={"file"}
                id={"input-photo-profile"}
                placeholder={"Company Photo Profile"}
                onChange={(e) => {
                  setImageProfile(URL.createObjectURL(e.target.files[0]));
                }}
              />

              <Label label={"Company Name"} />
              <Input type={"text"} id={"input-company-name"} placeholder={"Company Name"} value={contractor_name} onChange={(e) => setContractorName(e.target.value)} />

              <Label label={"SIUJK Number"} />
              <Input type={"text"} id={"input-siujk-number"} placeholder={"SIUJK Number"} value={number_siujk} onChange={(e) => setNumberSIUJK(e.target.value)} />

              <Label label={"Upload Certificate SIUJK"} />
              <Input
                type={"file"}
                id={"input-siujk-file"}
                placeholder={"Upload Certificate SIUJK"}
                onChange={(e) => {
                  setCertificateFile(URL.createObjectURL(e.target.files[0]));
                }}
              />

              <Label label={"Company Phone Number"} />
              <Input type={"text"} id={"input-company-phone"} placeholder={"Company Phone Number"} value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />

              <Label label={"Company Email"} />
              <Input type={"email"} id={"input-company-email"} placeholder={"Company Email"} value={email} onChange={(e) => setEmail(e.target.value)} />

              <Label label={"Company Address"} />
              <Input type={"text"} id={"input-company-address"} placeholder={"Company Address"} value={address} onChange={(e) => setAddress(e.target.value)} />

              <Label label={"Company Details"} />
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
              <img src={image_file} alt={"Company Photo Profile"} width={300} className="rounded-xl border mb-8" />
              <p className="font-semibold text-sm mb-3">Certificate</p>
              <img src={certificate_file} alt={"Company SIUJK Certificate"} width={300} className="border mb-6" />
              <CustomButton label={"DELETE ACCOUNT"} padding={6} color={"white"} textColor={"red"} borderWidth={2} border={"red"} onClick={() => handleDelContractor()} />
            </div>
          </div>
          <div className="w-5/6">
            <div className="border-t border-dashed border-blue-400 mt-16 mb-10" />
            <p className="font-bold text-xl self-start">Portfolio</p>
          </div>
          <div className="flex items-center">
            <div className="grid grid-flow-row auto-rows-max w-full gap-6 my-8 mx-10 lg:mx-28 grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 content-center">
              {portfolio.map((item) => (
                <CardPortfolio key={item.id} imagePortfolio={item.image_url} nameClient={item.client_name} cost={item.price} onClickDetailPortfolio={() => navigate(`/portfolios-details/${item.id}`)}>
                  <div className="flex gap-2">
                    <div className="w-8">
                      <CustomButton label={<FaPencilAlt />} padding={6} color={"white"} textColor={"blue"} borderWidth={2} border={"blue"} onClick={() => navigate(`/edit-portfolio/${item.id}`)} />
                    </div>
                    <div className="w-8">
                      <CustomButton label={<FaTrash />} padding={6} color={"white"} textColor={"red"} borderWidth={2} border={"red"} onClick={() => handleDelSubmit(item.id)} />
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
