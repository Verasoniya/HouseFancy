import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import swal from "sweetalert";

import { apiRequest } from "../context/apiRequest";
import CustomButton from "../components/CustomButton";
import { CardHouse } from "../components/Card";
import Layout from "../components/Layout";
import logo from "../assets/logoblue.png";

function MyListHouse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [house, setHouse] = useState([]);
  const [offset, setOffset] = useState(13);

  useEffect(() => {
    fetchMyListHouse();
  }, []);

  const fetchMyListHouse = async () => {
    apiRequest("houses/mylisthouses?limit=12&offset=0", "GET", {})
      .then((res) => {
        const { data } = res;
        console.log(data);
        setHouse(data);
      })
      .catch((err) => {
        swal({
          icon: "error",
          title: err,
        });
      })
      .finally(() => setLoading(false));
  };

  const fetchMoreListHouse = async () => {
    const newOffset = offset + 12;
    apiRequest(`houses/mylisthouses?limit=12&offset=${offset}`, "GET", {})
      .then((res) => {
        const { data } = res.data;
        console.log(res.data);
        const temp = house.slice();
        temp.push(...data);
        setHouse(temp);
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

  const handleDelHouse = async (item) => {
    apiRequest(`/houses/${item}`, "DELETE", {})
      .then((res) => {
        swal({
          icon: "success",
          title: "Successfully Delete",
        });
        // window.location.reload(true);
      })
      .catch((err) =>
        swal({
          icon: "error",
          title: err,
        })
      )
      .finally(() => setLoading(false));
  };

  if (loading) {
    <div className="flex justify-center content-center">
      <div className="flex flex-col h-screen justify-center ">
        <img src={logo} alt="Loading" width={200} height={200} className="animate-pulse" />
      </div>
    </div>;
  } else {
    return (
      <Layout>
        <div className="w-14 text-3xl absolute bottom-12 right-8 md:bottom-14 md:right-6">
          <CustomButton label={<FaPlus className="text-sm" />} radius={"50%"} padding={20} onClick={() => navigate("/add-house")} />
        </div>
        <div className="flex justify-center">
          <p className="font-bold text-xl text-neutral-900 mt-10">My List Sale House</p>
        </div>
        <div className="flex items-center">
          <div className="grid grid-flow-row auto-rows-max w-full gap-6 my-8 mx-10 lg:mx-24 grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 content-center">
            {house.map((item) => (
              <CardHouse key={item.id} imageHouse={item.image_url[1]} titleHouse={item.title} cost={item.price} location={item.location} landArea={item.surface_area} buildingArea={item.building_area}>
                <div className="flex justify-between mt-3">
                  <div className="flex gap-2">
                    <div className="w-8">
                      <CustomButton label={<FaPencilAlt />} padding={6} color={"white"} textColor={"blue"} borderWidth={2} border={"blue"} onClick={() => navigate(`/houses/${item.id}`)} />
                    </div>
                    <div className="w-8">
                      <CustomButton label={<FaTrash />} padding={6} color={"white"} textColor={"red"} borderWidth={2} border={"red"} onClick={() => handleDelHouse(item.id)} />
                    </div>
                  </div>
                  <p className="font-semibold text-sm self-center">{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</p>
                </div>
              </CardHouse>
            ))}
          </div>
        </div>
        <div className="flex justify-end w-11/12">
          <div className="w-20 mb-10">
            <CustomButton label={"More"} onClick={() => fetchMoreListHouse()} />
          </div>
        </div>
      </Layout>
    );
  }
}

export default MyListHouse;
