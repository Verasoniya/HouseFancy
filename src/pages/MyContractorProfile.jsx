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
import { apiRequest } from "../context/apiRequest";
import logo from "../assets/logoblue.png";

function MyContractorProfile() {
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);
  const [loading, setLoading] = useState(true);
  const [objSubmit, setObjSubmit] = useState("");
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

  useEffect(() => {
    fetchContractorDetail();
  }, []);

  const fetchContractorDetail = () => {
    apiRequest(`contractors/mycontractor`, "GET", {})
      // apiRequest(`/contractors/2`, "GET", {})
      .then((res) => {
        const {
          id,
          contractor_name,
          address,
          description,
          email,
          image_url,
          number_siujk,
          phone_number,
          certificate_siujk_url,
        } = res.data;
        setContractorId(id);
        setContractorName(contractor_name);
        setAddress(address);
        setDescription(description);
        setEmail(email);
        setNumberSIUJK(number_siujk);
        setPhoneNumber(phone_number);
        setImageProfile(image_url);
        setCertificateFile(certificate_siujk_url);

        fetchMyPortfolio(id);
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
          title: "you have not registered as a building, please register",
        });
      })
      .finally(() => setLoading(false));
  };

  const fetchMyPortfolio = async (id) => {
    apiRequest(`/portfolios/contractors/${id}?limit=12&offset=0`, "GET", {})
      // apiRequest("/portfolios/contractors/1?limit=12&offset=0", "GET", {})
      .then((res) => {
        const { data } = res.data;
        // const { data } = res;

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
    apiRequest(
      `/portfolios/contractors/${id_contractor}?limit=12&offset=${offset}`,
      "GET",
      {}
    )
      .then((res) => {
        const { data } = res.data;

        const temp = portfolio.slice();
        temp.push(...data);
        setPortfolio(temp);

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
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    for (const key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }

    apiRequest(
      `/contractors/${id_contractor}`,
      "PUT",
      objSubmit,
      "multipart/form-data"
    )
      .then(async (res) => {
        await swal({
          icon: "success",
          title: "Successfully to Update",
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

      .finally(() => fetchContractorDetail());
  };

  const handleChange = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
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

        Object.keys(data.image_url).map((img) =>
          image.push(data.image_url[img])
        );
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

    const id_image = [];
    for (let i = 0; i < images.length; i++) {
      id_image.push(images[i].id);
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
            return Promise.resolve(false);
          })
      );
    }

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
        <div className="w-14 text-3xl absolute bottom-12 right-8 md:bottom-14 md:right-16">
          <CustomButton
            label={<FaPlus className="text-sm" />}
            radius={"50%"}
            padding={20}
            onClick={() => navigate(`/add-portfolio/${id_contractor}`)}
          />
        </div>
        <div className="flex flex-col items-center my-10">
          <p className="font-bold text-xl mb-10">{contractor_name}</p>
          <div className="flex flex-col lg:flex-row justify-center lg:justify-around w-full lg:w-3/4">
            <div className="self-center">
              <p className="font-semibold text-sm mb-1">Photo Profile</p>
              <img
                src={image_file}
                alt={"Company Photo Profile"}
                width={300}
                className="rounded-xl border mb-8"
              />
              <p className="font-semibold text-sm mb-1">SIUJK Certificate</p>
              <img
                src={certificate_file}
                alt={"Company SIUJK Certificate"}
                width={300}
                className="border mb-6"
              />
              <CustomButton
                label={"DELETE ACCOUNT"}
                padding={6}
                color={"white"}
                textColor={"red"}
                borderWidth={2}
                border={"red"}
                onClick={() => handleDelContractor()}
              />
            </div>
            <form
              className="flex flex-col w-full gap-1 lg:w-2/5 px-4 lg:px-0 mb-6 lg:mb-0 mt-10 lg:mt-0"
              onSubmit={(e) => handleSubmit(e)}
            >
              <Label label={"Upload Company Photo Profile"} />
              <Input
                type={"file"}
                id={"input-photo-profile"}
                placeholder={"Company Photo Profile"}
                required
                onChange={(e) => {
                  setImageProfile(URL.createObjectURL(e.target.files[0]));
                  handleChange(e.target.files[0], "image_file");
                }}
              />

              <Label label={"Company Name"} />
              <Input
                type={"text"}
                id={"input-company-name"}
                placeholder={"Stone Construction"}
                value={contractor_name}
                required
                onChange={(e) => {
                  setContractorName(e.target.value);
                  handleChange(e.target.value, "contractor_name");
                }}
              />

              <Label label={"SIUJK Number"} />
              <Input
                type={"text"}
                id={"input-siujk-number"}
                placeholder={"0-3171-07-002-1-09-002587"}
                value={number_siujk}
                required
                onChange={(e) => {
                  setNumberSIUJK(e.target.value);
                  handleChange(e.target.value, "number_siujk");
                }}
              />

              <Label label={"Upload SIUJK Certificate"} />
              <Input
                type={"file"}
                id={"input-siujk-file"}
                placeholder={"Upload SIUJK Certificate"}
                required
                onChange={(e) => {
                  setCertificateFile(URL.createObjectURL(e.target.files[0]));
                  handleChange(e.target.files[0], "certificate_file");
                }}
              />

              <Label label={"Company Phone Number"} />
              <Input
                type={"text"}
                id={"input-company-phone"}
                placeholder={"083124423671"}
                value={phone_number}
                required
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  handleChange(e.target.value, "phone_number");
                }}
              />

              <Label label={"Company Email"} />
              <Input
                type={"email"}
                id={"input-company-email"}
                placeholder={"info@stoneconstruction.com"}
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleChange(e.target.value, "email");
                }}
              />

              <Label label={"Company Address"} />
              <Input
                type={"text"}
                id={"input-company-address"}
                placeholder={
                  "Jl. Pucang Argo Tengah Raya, Batursari, Kec. Mranggen, Kab. Demak, Jawa Tengah"
                }
                value={address}
                required
                onChange={(e) => {
                  setAddress(e.target.value);
                  handleChange(e.target.value, "address");
                }}
              />

              <Label label={"Company Details"} />
              <textarea
                id={"input-company-details"}
                placeholder={
                  "A company that provides building construction planning and supervision services in Central Java"
                }
                className="resize-y h-32 w-full bg-white placeholder-stone-400 text-neutral-900 font-normal border border-blue-400 focus:border focus:border-blue-400 focus:ring-0 rounded-sm p-2 pl-3 mb-4 text-sm"
                required
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  handleChange(e.target.value, "description");
                }}
              />
              <CustomButton label={"UPDATE"} loading={loading} />
            </form>
          </div>
          <div className="w-5/6">
            <div className="border-t border-dashed border-blue-400 mt-16 mb-10" />
            <p className="font-bold text-xl self-start">Portfolio</p>
          </div>
          <div className="flex items-center">
            <div className="grid grid-flow-row auto-rows-max w-full gap-6 my-8 mx-10 lg:mx-28 grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 content-center">
              {portfolio.map((item) => (
                <CardPortfolio
                  key={item.id}
                  imagePortfolio={item.image_url}
                  nameClient={item.client_name}
                  cost={new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(item.price)}
                  onClickDetailPortfolio={() =>
                    navigate(`/portfolios-details/${item.id}`)
                  }
                >
                  <div className="flex gap-2 ml-0 lg:ml-2">
                    <div className="w-8">
                      <CustomButton
                        label={<FaPencilAlt />}
                        padding={6}
                        color={"white"}
                        textColor={"blue"}
                        borderWidth={2}
                        border={"blue"}
                        onClick={() => navigate(`/edit-portfolio/${item.id}`)}
                      />
                    </div>
                    <div className="w-8">
                      <CustomButton
                        label={<FaTrash />}
                        padding={6}
                        color={"white"}
                        textColor={"red"}
                        borderWidth={2}
                        border={"red"}
                        onClick={() => handleDelSubmit(item.id)}
                      />
                    </div>
                  </div>
                </CardPortfolio>
              ))}
            </div>
          </div>
          <div className="flex justify-end w-5/6">
            <div className="w-20 mb-10">
              <CustomButton
                label={"More"}
                onClick={() => fetchMoreListPortfolio()}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default MyContractorProfile;
