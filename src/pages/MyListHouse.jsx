import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import swal from "sweetalert";

import { TokenContext } from "../context/AuthContext";
import { withRouter } from "../context/navigations";
import CustomButton from "../components/CustomButton";
import { apiRequest } from "../context/apiRequest";
import { CardHouse } from "../components/Card";
import Layout from "../components/Layout";
import logo from "../assets/logoblue.png";

function MyListHouse() {
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [house, setHouse] = useState([]);
  const [offset, setOffset] = useState(13);

  useEffect(() => {
    fetchMyListHouse();
  }, []);

  // ------------------- Fetch List House ------------------------
  const fetchMyListHouse = async () => {
    apiRequest("/houses/mylisthouses?limit=12&offset=0", "GET", {})
      .then((res) => {
        const { data } = res.data;
        // const { data } = res;
        setHouse(data);
        console.log(data);
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

  // ------------------- Fetch (MORE) List House ------------------------
  const fetchMoreListHouse = async () => {
    const newOffset = offset + 12;
    apiRequest(`/houses/mylisthouses?limit=12&offset=${offset}`, "GET", {})
      .then((res) => {
        const { data } = res.data;
        console.log(res.data);
        const temp = house.slice();
        temp.push(...data);
        setHouse(temp);
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

  // ------------------- Delete House (GET House for get id image) ------------------------
  const handleDelSubmit = async (item) => {
    apiRequest(`/houses/${item}`, "GET", {})
      .then((res) => {
        const { data } = res.data;
        const image = [];
        console.log("image", image);
        console.log("data", data);
        Object.keys(data.image_url).map((img) => image.push(data.image_url[img]));
        handleDelImageHouse(item, image);
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

  // ------------------- Delete House (Delete Image after get id image) ------------------------
  const handleDelImageHouse = async (item, image) => {
    const id_house = item;
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
        apiRequest(`/houses/images/${image_id}`, "DELETE", {})
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
      handleDelHouse(id_house);
    });
  };

  // ------------------- Delete House (Delete House after delete image) ------------------------
  const handleDelHouse = async (id_house) => {
    apiRequest(`/houses/${id_house}`, "DELETE", {})
      .then((res) => {
        swal({
          icon: "success",
          title: "Successfully Delete House",
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
      .finally(() => fetchMyListHouse());
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
          <CustomButton label={<FaPlus className="text-sm" />} radius={"50%"} padding={20} onClick={() => navigate("/add-house")} />
        </div>
        <div className="flex justify-center">
          <p className="font-bold text-xl text-neutral-900 mt-10">My List Sale House</p>
        </div>
        <div className="flex items-center">
          <div className="grid grid-flow-row auto-rows-max w-full gap-6 my-8 mx-10 lg:mx-28 grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 content-center">
            {house.map((item) => (
              <CardHouse
                key={item.id}
                imageHouse={item.image_url}
                titleHouse={item.title}
                cost={item.price}
                location={item.location}
                surfaceArea={item.surface_area}
                buildingArea={item.building_area}
                onClickDetailHouse={() => navigate(`/house-detail-seller/${item.id}`)}
              >
                <div className="flex justify-between mt-3">
                  <div className="flex gap-2">
                    <div className="w-8">
                      <CustomButton label={<FaPencilAlt />} padding={6} color={"white"} textColor={"blue"} borderWidth={2} border={"blue"} onClick={() => navigate(`/edit-house/${item.id}`)} />
                    </div>
                    <div className="w-8">
                      <CustomButton label={<FaTrash />} padding={6} color={"white"} textColor={"red"} borderWidth={2} border={"red"} onClick={() => handleDelSubmit(item.id)} />
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

export default withRouter(MyListHouse);
