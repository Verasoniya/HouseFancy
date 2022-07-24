import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { TokenContext } from "../context/AuthContext";
import { withRouter } from "../context/navigations";
import { apiRequest } from "../context/apiRequest";
import CustomButton from "../components/CustomButton";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import Layout from "../components/Layout";
import logo from "../assets/logoblue.png";
import swal from "sweetalert";

function EditPortfolio(props) {
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);
  const { portfolio_id } = props.params;
  // const contractor_id = parseInt(id_contractor);
  // const [contractors_id, setContractorsId] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState("");
  const [client_name, setClientName] = useState("");
  const [location, setLocation] = useState("");
  const [finish_date, setFinishDate] = useState("");
  const [prices, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [image_del, setImageDel] = useState([]);

  useEffect(() => {
    fetchPortfolioDetail();
  }, []);

  const center = {
    lat: latitude,
    lng: longitude,
  };
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          const posLatLong = marker.getLatLng();
          setLatitude(posLatLong.lat);
          setLongitude(posLatLong.lng);
          console.log(posLatLong);
        }
      },
    }),
    []
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  const fetchPortfolioDetail = () => {
    apiRequest(`/portfolios/details/${portfolio_id}`, "GET", {})
      .then((res) => {
        const { data } = res.data;
        // setHouse(data);
        setLatitude(data.latitude);
        setLongitude(data.longitude);
        setDescription(data.description);
        setClientName(data.client_name);
        setFinishDate(data.finish_date);
        setLocation(data.location);
        setPrice(data.price);
        const image = [];
        console.log("image", image);
        console.log("data", data);
        Object.keys(data.image_url).map((img) => image.push(data.image_url[img]));
        setImageDel(image);
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

  const handleSubmitUpdate = async (e) => {
    setLoading(true);
    e.preventDefault();
    const images = image_del;
    console.log(image_del);
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
        apiRequest(`/portfolios/images/${image_id}`, "DELETE", {})
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
      handleUpdatePortfolio();
    });
  };

  const handleUpdatePortfolio = async () => {
    // setContractorsId(id_contractor);
    const price = parseInt(prices);
    const body = {
      price,
      location,
      latitude,
      longitude,
      description,
      client_name,
      finish_date,
    };

    apiRequest(`portfolios/details/${portfolio_id}`, "PUT", body)
      .then((res) => {
        console.log(res.data);
        const { id_contractor } = res.data;
        console.log(id_contractor);
        handleSubmitImages(portfolio_id, id_contractor);
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

  const handleFileSelected = async (e) => {
    setFiles({ files: [...files, e.target.files] });
  };

  const handleSubmitImages = async (portfolio_id, id_contractor) => {
    // console.log(files.files);
    const [image] = files.files;
    setLoading(true);
    let requests = [];
    for (let i = 0; i < image.length; i++) {
      const formData = new FormData();
      formData.append("files", image[i]);
      console.log(image[i]);

      requests.push(
        apiRequest(`/portfolios/images/${portfolio_id}`, "POST", formData, "multipart/form-data")
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
      setLoading(false);
      swal({
        icon: "success",
        title: "Successfully to Update Portfolio",
      });
      navigate(`/my-contractor-profile/${id_contractor}`);
    });
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
        <div className="flex flex-col items-center my-10">
          <p className="font-bold text-xl mb-10">Update Portfolio</p>
          <form className="flex flex-col w-full gap-1 lg:w-2/5 mb-10 px-4 lg:px-0" onSubmit={(e) => handleSubmitUpdate(e)}>
            <Label label={"Upload Image"} />
            <Input type={"file"} multiple id={"input-image-portfolio"} placeholder={"Upload Image"} required onChange={(e) => handleFileSelected(e)} />

            <Label label={"Client Name"} />
            <Input type={"text"} id={"input-client-name"} placeholder={"Client Name"} required value={client_name} onChange={(e) => setClientName(e.target.value)} />

            <Label label={"Finish Date"} />
            <Input type={"date"} id={"input-finish-date"} placeholder={"Finish Date"} required value={finish_date} onChange={(e) => setFinishDate(e.target.value)} />

            <Label label={"Location"} />
            <Input type={"text"} id={"input-location"} placeholder={"Location"} required value={location} onChange={(e) => setLocation(e.target.value)} />

            <div className="z-0">
              <MapContainer center={center} zoom={13} scrollWheelZoom={true} style={{ height: "250px" }}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker draggable={draggable} eventHandlers={eventHandlers} position={center} ref={markerRef}>
                  <Popup minWidth={90}>
                    <span onClick={toggleDraggable}>{draggable ? "Marker is draggable" : "Click here to change location"}</span>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

            <Label label={"Cost"} />
            <Input type={"number"} id={"input-cost"} placeholder={"Cost"} required value={prices} onChange={(e) => setPrice(e.target.value)} />

            <Label label={" Description"} />
            <textarea
              id={"input-portfolio-description"}
              placeholder={"Portfolio Description"}
              required
              className="resize-y h-32 w-full bg-white placeholder-stone-600 text-neutral-900 font-normal border border-blue-400 focus:border focus:border-blue-400 focus:ring-0 rounded-sm p-2 pl-3 text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <CustomButton label={"UPDATE"} loading={loading} />
          </form>
        </div>
      </Layout>
    );
  }
}

export default withRouter(EditPortfolio);
