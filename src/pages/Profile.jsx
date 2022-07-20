import React from "react";
import { Input } from "../components/Input";
import CustomButton from "../components/CustomButton";
import Layout from "../components/Layout";

const Profile = () => {
  return (
    <Layout>
      <div className="flex flex-wrap p-20">
        <div className="w-full font-bold text-2xl text-center mb-5">
          My Profile
        </div>
        <div className=" lg:w-1/2 lg:self-center">
          <div className="w-[220px] h-150px lg:w-[400px] lg:h-[400px]">
            <img
              src="https://images.pexels.com/photos/935969/pexels-photo-935969.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="img-profile"
              className="rounded-xl mb-3"
            />
            <CustomButton
              label={"DELETE"}
              color={"white"}
              border={"red"}
              borderWidth={2}
              textColor={"red"}
            />
          </div>
        </div>

        <div className="lg:w-1/2 lg:self-center">
          <form action="">
            <div className="mb-5">
              <label className="font-bold">Photo Profile </label>
              <Input id={"input-file"} type={"file"} placeholder={"img.jpg"} />
            </div>
            <div className="mb-5">
              <label className="font-bold">Fullname</label>
              <Input
                id={"input-fullname"}
                type={"text"}
                placeholder={"Andaru Akbar"}
              />
            </div>
            <div className="mb-5">
              <label className="font-bold">Phone Number </label>
              <Input
                id={"input-phone"}
                type={"text"}
                placeholder={"08456786"}
              />
            </div>
            <div className="mb-5">
              <label className="font-bold">Email </label>
              <Input
                id={"input-email"}
                type={"email"}
                placeholder={"name@mail.com"}
              />
            </div>
            <div className="mb-5">
              <label className="font-bold">Address </label>
              <Input
                id={"input-addres"}
                type={"text"}
                placeholder={"Ponorogo"}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
