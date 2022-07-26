import React, { useCallback, useEffect, useState } from "react";
import { CardHouse } from "../components/Card";
import { FaTrash } from "react-icons/fa";
import CustomButton from "../components/CustomButton";
import Layout from "../components/Layout";
import axios from "axios";
import swal from "sweetalert";
import logo from "../assets/logoblue.png";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCancelNegotiations = useCallback(
    (id) => {
      if (
        !window.confirm(`Apakah anda yakin ingin membatalkan negosiasi ini?`)
      ) {
        return;
      }

      axios
        .delete(`https://housefancy.site/negotiations/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          swal({
            icon: "success",
            title: res.data.message,
          });
        })
        .catch((err) => {
          swal({
            icon: "error",
            title: err.response.data.message,
          });
        });
    },
    [history]
  );

  useEffect(() => {
    axios
      .get("https://housefancy.site/negotiations", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setHistory(res.data.data.data);
      })
      .catch((err) => {
        swal({
          icon: "error",
          title: err.response.data.message,
        });
      })
      .finally(() => setLoading(false));
  }, [handleCancelNegotiations]);

  return (
    <Layout>
      <div className="flex items-center my-10">
        {loading ? (
          <div className="flex justify-center content-center w-full">
            <div className="flex flex-col my-20 justify-center">
              <img
                src={logo}
                alt="Loading"
                width={200}
                height={200}
                className="animate-pulse"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-flow-row auto-rows-max w-full gap-8 my-8 mx-10 lg:mx-36 grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 content-center">
            {history.map((his) => (
              <CardHouse
                key={his.id}
                id={his.id}
                titleHouse={his.house.title}
                imageHouse={his.house.image_url["1"]}
                cost={new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(his.house.price)}
                location={his.house.location}
                surfaceArea={his.house.surface_area}
                buildingArea={his.house.building_area}
              >
                <div className="flex justify-between mt-3">
                  <div className="w-8">
                    <CustomButton
                      onClick={() => handleCancelNegotiations(his.id)}
                      label={<FaTrash />}
                      padding={6}
                      color={"white"}
                      textColor={"red"}
                      borderWidth={2}
                      border={"red"}
                    />
                  </div>

                  {/* <p className="font-semibold text-sm self-center">{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</p> */}
                  <p className="font-semibold text-sm self-center">
                    {"Negotiation"}
                  </p>
                </div>
              </CardHouse>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default History;
