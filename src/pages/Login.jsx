import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { TokenContext } from "../context/AuthContext";
import { apiRequest } from "../context/apiRequest";

import CustomButton from "../components/CustomButton";
import { Input } from "../components/Input";
import logo from "../assets/logo-gray.png";

function Login() {
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (email && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      email,
      password,
    };
    apiRequest("login", "POST", body)
      .then((res) => {
        const { data } = res;
        const { token } = data;
        console.log(token);

        localStorage.setItem("token", token);
        setToken(token);
        swal({
          icon: "success",
          title: "Login Successfully",
        });
        navigate("/my-list-house");
      })
      .catch((err) => {
        console.log(err);
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

  if (token === "0" || token == null) {
    return (
      <div className="flex justify-center items-center h-screen bg-split-white-black ">
        <div className="flex flex-col lg:flex-row w-3/4 lg:w-2/3 bg-white shadow-lg shadow-gray-700 rounded-xl">
          <div className="w-full lg:w-1/2 bg-auth-image bg-right-top rounded-bl-none rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none">
            <div className="flex flex-col justify-center items-center w-full h-full bg-opacity-50 bg-[#4285F4] p-10 lg:p-0 rounded-t-xl lg:rounded-tr-none lg:rounded-bl-xl">
              <img src={logo} alt="House Fancy" width={100} />
              <p className="font-bold text-xl text-[#F6F6F6]">House</p>
              <p className="font-bold text-xl text-[#F6F6F6]">Fancy</p>
              <p className="text-2xl text-[#F6F6F6] font-dancing-script">make your dream house</p>
            </div>
          </div>
          <form className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12 lg:py-24 gap-2" onSubmit={(e) => handleSubmit(e)}>
            <p className="font-bold text-xl mb-2 self-start">Login</p>
            <Input id="input-email" type={"email"} placeholder={"Email"} onChange={(e) => setEmail(e.target.value)} />
            <Input id="input-password" type={"password"} placeholder={"Password"} onChange={(e) => setPassword(e.target.value)} />
            <p />
            <CustomButton id="btn-submit" label={"SUBMIT"} loading={loading || disabled} />
            <p className="font-medium text-xs">
              Don't have an account?
              <a href="/register" className="text-[#4285F4] ml-1">
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/my-list-house" />;
  }
}

export default Login;
