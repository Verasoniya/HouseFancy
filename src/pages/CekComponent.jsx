import React from "react";
import { CardContractor, CardHouse, CardPortfolio } from "../components/Card";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { Input } from "../components/Input";
import { TrTd, TrTdDescription } from "../components/TrTd";

function CekComponent() {
  return (
    <div className="flex items-center my-10">
      <div className="grid grid-flow-row auto-rows-max w-full gap-6 my-8 mx-10 lg:mx-24 grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 content-center">
        {/* ---------------- Card House Hompage --------------- */}
        <CardHouse />
        <CardHouse />
        <CardHouse />

        {/* ---------------- Card My List Sale House --------------- */}
        <CardHouse>
          <div className="flex justify-start mt-3 gap-3">
            <button className="p-2 border-2 rounded-md border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              <FaPencilAlt />
            </button>
            <button className="p-2 border-2 rounded-md border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
              <FaTrash />
            </button>
          </div>
        </CardHouse>
        <CardHouse>
          <div className="flex justify-start mt-3 gap-3">
            <button className="p-2 border-2 rounded-md border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              <FaPencilAlt />
            </button>
            <button className="p-2 border-2 rounded-md border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
              <FaTrash />
            </button>
          </div>
        </CardHouse>
        <CardHouse>
          <div className="flex justify-start mt-3 gap-3">
            <button className="p-2 border-2 rounded-md border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              <FaPencilAlt />
            </button>
            <button className="p-2 border-2 rounded-md border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
              <FaTrash />
            </button>
          </div>
        </CardHouse>

        {/* ---------------- Card History --------------- */}
        <CardHouse>
          <div className="flex justify-between mt-3">
            <p className="font-bold text-normal self-center">Booked</p>
            <button className="p-2 border-2 rounded-md border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
              <FaTrash />
            </button>
          </div>
        </CardHouse>
        <CardHouse>
          <div className="flex justify-between mt-3">
            <p className="font-bold text-normal self-center">Booked</p>
            <button className="p-2 border-2 rounded-md border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
              <FaTrash />
            </button>
          </div>
        </CardHouse>
        <CardHouse>
          <div className="flex justify-between mt-3">
            <p className="font-bold text-normal self-center">Owened</p>
          </div>
        </CardHouse>

        {/* ---------------- Card Contractor --------------- */}
        <CardContractor />
        <CardContractor />
        <CardContractor />

        {/* ---------------- Card Portfolio --------------- */}
        <CardPortfolio />
        <CardPortfolio />
        <CardPortfolio />

        {/* ---------------- Card Portfolio Edit Delete --------------- */}
        <CardPortfolio>
          <div className="flex justify-end mt-3 gap-3">
            <button className="p-2 border-2 rounded-md border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              <FaPencilAlt />
            </button>
            <button className="p-2 border-2 rounded-md border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
              <FaTrash />
            </button>
          </div>
        </CardPortfolio>
        <CardPortfolio>
          <div className="flex justify-end mt-3 gap-3">
            <button className="p-2 border-2 rounded-md border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              <FaPencilAlt />
            </button>
            <button className="p-2 border-2 rounded-md border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
              <FaTrash />
            </button>
          </div>
        </CardPortfolio>
        <CardPortfolio>
          <div className="flex justify-end mt-3 gap-3">
            <button className="p-2 border-2 rounded-md border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              <FaPencilAlt />
            </button>
            <button className="p-2 border-2 rounded-md border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
              <FaTrash />
            </button>
          </div>
        </CardPortfolio>

        {/* ----------------- Input ------------- */}
        <Input type={"text"} placeholder={"Company Name"} />
        <Input type={"file"} placeholder={"Company Name"} />
        <Input type={"file"} placeholder={"Company Name"} />

        {/* ----------------- TrTd ------------- */}
        <div className="flex flex-col">
          <TrTd title={"Client"} content={"Xiao Zhan"} />
          <TrTd title={"Client"} content={"Xiao Zhan"} />
          <TrTd title={"Client"} content={"Xiao Zhan"} />
          <TrTdDescription
            title={"Description"}
            content={
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id dicta voluptatibus provident corrupti deserunt, laboriosam quaerat ullam facere placeat, eveniet porro, nemo accusamus eum minima aspernatur. Nam, illum quasi. Eius?"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default CekComponent;
