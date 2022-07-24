import React, { useEffect, useState } from "react";
import { Input } from "../components/Input";
import CustomButton from "../components/CustomButton";
import Layout from "../components/Layout";
import axios from "axios";
import swal from "sweetalert";

const Profile = () => {
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    image_url: "",
    password: "",
  });

  const [file, setFile] = useState(null);

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("full_name", profile.full_name);
    formData.append("email", profile.email);
    formData.append("phone_number", profile.phone_number);
    formData.append("address", profile.address);
    formData.append("password", profile.password);
    formData.append("file", file);

    axios
      .put(`https://housefancy.site/users`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() =>
        swal({
          icon: "success",
          title: "Profile berhasil diperbarui",
        })
      )
      .catch((err) => {
        console.log(err);
        swal({
          icon: "error",
          title: err.response.data.message,
        });
      });
  };

  const handleDelProfile = () => {
    axios
      .delete(`https://housefancy.site/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() =>
        swal({
          icon: "success",
          title: "successful deleting profile",
        })
      )
      .catch((err) => {
        console.log(err);
        swal({
          icon: "error",
          title: err.response.data.message,
        });
      });
  };

  useEffect(() => {
    axios
      .get(`https://housefancy.site/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setProfile({
          full_name: res.data.data.full_name,
          email: res.data.data.email,
          phone_number: res.data.data.phone_number,
          address: res.data.data.address,
          image_url: res.data.data.image_url,
        });
      });
  }, []);
  return (
    <Layout>
      <div className="flex flex-wrap p-20">
        <div className="w-full font-bold text-2xl text-center mb-5">
          My Profile
        </div>
        <div className="md:self-center lg:w-1/2 lg:self-center">
          <div className="w-[220px] h-150px lg:w-[400px] lg:h-[400px]">
            <img
              src={profile.image_url}
              alt="img-profile"
              className="rounded-xl mb-3"
            />
            <CustomButton
              label={"DELETE"}
              color={"white"}
              border={"red"}
              borderWidth={2}
              textColor={"red"}
              onClick={() => handleDelProfile()}
            />
          </div>
        </div>

        <div className="md:pl-10 lg:px-10 lg:w-1/2 lg:self-center">
          <form>
            <div className="mb-5">
              <label className="font-bold">Photo Profile </label>
              <Input
                id={"input-file"}
                type={"file"}
                onChange={(e) => setFile(e.target.files[0])}
                placeholder={"img.jpg"}
              />
            </div>
            <div className="mb-5">
              <label className="font-bold">Fullname</label>
              <Input
                id={"input-fullname"}
                type={"text"}
                value={profile.full_name}
                onChange={(e) =>
                  setProfile((prev) => {
                    return {
                      ...prev,
                      full_name: e.target.value,
                    };
                  })
                }
                placeholder={"Andaru Akbar"}
              />
            </div>
            <div className="mb-5">
              <label className="font-bold">Password</label>
              <Input
                id={"input-password"}
                type={"password"}
                onChange={(e) =>
                  setProfile((prev) => {
                    return {
                      ...prev,
                      password: e.target.value,
                    };
                  })
                }
                placeholder={"Password"}
              />
            </div>
            <div className="mb-5">
              <label className="font-bold">Phone Number </label>
              <Input
                id={"input-phone"}
                type={"text"}
                value={profile.phone_number}
                onChange={(e) =>
                  setProfile((prev) => {
                    return {
                      ...prev,
                      phone_number: e.target.value,
                    };
                  })
                }
                placeholder={"08456786"}
              />
            </div>
            <div className="mb-5">
              <label className="font-bold">Email </label>
              <Input
                id={"input-email"}
                type={"email"}
                value={profile.email}
                onChange={(e) =>
                  setProfile((prev) => {
                    return {
                      ...prev,
                      email: e.target.value,
                    };
                  })
                }
                placeholder={"name@mail.com"}
              />
            </div>
            <div className="mb-5">
              <label className="font-bold">Address </label>
              <Input
                id={"input-addres"}
                type={"text"}
                value={profile.address}
                onChange={(e) =>
                  setProfile((prev) => {
                    return {
                      ...prev,
                      address: e.target.value,
                    };
                  })
                }
                placeholder={"Ponorogo"}
              />
            </div>
            <CustomButton
              label={"UPDATE"}
              onClick={(e) => handleUpdate(e)}
              type="submit"
              color={"blue"}
              textColor={"white"}
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
