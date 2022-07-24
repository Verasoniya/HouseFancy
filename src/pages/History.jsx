import React from "react";
import { CardHouse } from "../components/Card";
import { FaTrash } from "react-icons/fa";
import CustomButton from "../components/CustomButton";
import Layout from "../components/Layout";

const History = () => {
  return (
    <Layout>
      <div className="flex items-center my-10">
        <div className="grid grid-flow-row auto-rows-max w-full gap-8 my-8 mx-10 lg:mx-36 grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 content-center">
          <CardHouse>
            <div className="flex justify-between mt-3">
              <div className="w-8">
                <CustomButton
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
        </div>
      </div>
    </Layout>
  );
};

export default History;
