import React, { useEffect, useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarker, FaWhatsapp } from "react-icons/fa";
import CustomButton from "../components/CustomButton";
import { CardPortfolio } from "../components/Card";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { apiRequest } from "../context/apiRequest";

const defaultData = {
  image_url: "",
  contractor_name: "",
  address: "",
  number_siujk: "",
  phone_number: "",
  email: "",
  description: "",
};

const DetailContractorList = () => {
  const [portfolio, setPortofolio] = useState([]);
  const [contractor, setContractor] = useState(defaultData);
  const { id } = useParams();

  const fetchPortfolio = async () => {
    apiRequest(`portfolios/contractors/${id}`, `GET`, {}).then((res) => {
      const data = res.data;
      console.log(data.data);
      setPortofolio(data.data);
    });
  };

  const fetchContractor = async () => {
    apiRequest(`contractors/${id}`, `GET`, {}).then((res) => {
      const data = res.data;
      console.log(data);
      setContractor((current) => {
        return {
          image_url: data.image_url,
          contractor_name: data.contractor_name,
          address: data.address,
          number_siujk: data.number_siujk,
          phone_number: data.phone_number,
          email: data.email,
          description: data.description,
        };
      });
    });
  };
  useEffect(() => {
    fetchPortfolio();
    fetchContractor();
  }, []);
  return (
    <Layout>
      <div className="flex flex-wrap p-20">
        <p className="w-full text-center font-bold text-2xl mb-10">
          {contractor.contractor_name}
        </p>
        <div className="w-full lg:w-1/2">
          <img
            src={
              Object.keys(contractor.image_url).length !== 0
                ? contractor.image_url
                : "https://via.placeholder.com/400x200.jpg?text=No+Image"
            }
            alt="img-profile"
            className="rounded-xl mb-3"
          />
          <div className="px-2.5 py-2 shadow-sm shadow-slate-700">
            <div className="flex gap-2">
              <FaPhone className="text-md self-center" />
              <p className="font-thin text-md">{contractor.phone_number}</p>
            </div>
            <div className="flex gap-2">
              <FaEnvelope className="text-md self-center" />
              <p className="font-thin text-md">{contractor.email}</p>
            </div>
            <div className="flex gap-2">
              <FaMapMarker className="text-md self-center" />
              <p className="font-thin text-md">{contractor.address}</p>
            </div>
            <div className="mt-5"></div>
            <CustomButton
              id={"button-whatsapp"}
              icon={<FaWhatsapp className="text-2xl mr-2" />}
              label={"WHATSAPP"}
              color={"green"}
            />
          </div>
        </div>

        <div className="w-full mt-5 lg:w-1/2 lg:px-2 lg:self-start">
          <div className="flex justify-between mb-3">
            <p className="font-bold">SIUJK Number</p>
            <p>{contractor.number_siujk}</p>
          </div>
          <div>
            <p className="font-bold">Detail Company:</p>
            <p>{contractor.description}</p>
          </div>
        </div>
        <p className="font-bold text-xl mt-5">Portfolio:</p>
        <div className="flex items-center mt-5">
          <div className="grid grid-flow-row auto-rows-max w-full gap-8   lg: grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 content-center">
            {portfolio.map((data) => (
              <CardPortfolio
                id={data.id}
                imagePortfolio={data.image_url}
                nameClient={data.client_name}
                cost={data.price}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailContractorList;
