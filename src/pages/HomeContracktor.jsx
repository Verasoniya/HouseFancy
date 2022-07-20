import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { CardContractor } from "../components/Card";
import Layout from "../components/Layout";
import { apiRequest } from "../context/apiRequest";
import logoblue from "../assets/logoblue.png";

const HomeContracktor = () => {
  const [contractor, setContractor] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContractor();
  }, []);

  const fetchContractor = async () => {
    apiRequest(`contractors`, `GET`, {})
      .then((res) => {
        const { data } = res.data;
        setContractor(data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        swal({
          icon: "error",
          title: err,
        });
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    <div className="flex justify-center content-center">
      <div className="flex flex-col h-screen justify-center">
        <img
          src={logoblue}
          alt="logo-loading"
          width={200}
          height={200}
          className="animate-pulse"
        />
      </div>
    </div>;
  } else {
    return (
      <Layout>
        <div className="flex items-center my-10">
          <div className="grid grid-flow-row auto-rows-max w-full gap-8 my-8 mx-10 lg:mx-36 grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 content-center">
            {contractor.map((item) => (
              <CardContractor
                key={item.id}
                id={item.id}
                imageContractor={item.image_url}
                nameContractor={item.contractor_name}
                location={item.address}
                phone={item.phone_number}
              />
            ))}
          </div>
        </div>
      </Layout>
    );
  }
};

export default HomeContracktor;
