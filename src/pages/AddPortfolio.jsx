import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";

import { TokenContext } from "../context/AuthContext";
import { withRouter } from "../context/navigations";
import { apiRequest } from "../context/apiRequest";
import CustomButton from "../components/CustomButton";
import { Label } from "../components/Label";
import { Input } from "../components/Input";
import Layout from "../components/Layout";
import logo from "../assets/logoblue.png";
import swal from "sweetalert";

function AddPortfolio(props) {
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);
  const { contractor_id } = props.params;
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState("");
  const [client_name, setClientName] = useState("");
  const [location, setLocation] = useState("");
  const [finish_date, setFinishDate] = useState("");
  const [prices, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState(-6.1774);
  const [longitude, setLongitude] = useState(106.8269);
  const center = {
    lat: -6.1774,
    lng: 106.8269,
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
        }
      },
    }),
    []
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const price = parseInt(prices);
    const id_contractor = parseInt(contractor_id);

    const body = {
      price,
      location,
      latitude,
      longitude,
      description,
      client_name,
      finish_date,
      contractor_id: id_contractor,
    };

    apiRequest("portfolios", "POST", body)
      .then((res) => {
        const { data } = res;

        handleSubmitImages(data.id_portfolio);
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

  const handleSubmitImages = async (id_portfolio) => {
    const [image] = files.files;
    setLoading(true);
    let requests = [];
    for (let i = 0; i < image.length; i++) {
      const formData = new FormData();
      formData.append("files", image[i]);

      requests.push(
        apiRequest(
          `/portfolios/images/${id_portfolio}`,
          "POST",
          formData,
          "multipart/form-data"
        )
          .then(async (res) => {
            return Promise.resolve(true);
          })
          .catch((err) => {
            return Promise.resolve(false);
          })
      );
    }

    await Promise.all(requests).then((results) => {
      console.log("finished", results);
      for (let i = 0; i < requests.length; i++) {
        console.log(i, "request result in ", results[i]);
      }
      setLoading(false);
      swal({
        icon: "success",
        title: "Successfully to Add Portfolio",
      });
      navigate(`/my-contractor-profile`);
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center content-center">
        <div className="flex flex-col h-screen justify-center ">
          <img
            src={logo}
            alt="Loading"
            width={200}
            height={200}
            className="animate-pulse"
          />
        </div>
      </div>
    );
  } else {
    return (
      <Layout>
        <div className="flex flex-col items-center my-10">
          <p className="font-bold text-xl mb-10">Add Portfolio</p>
          <form
            className="flex flex-col w-full gap-1 lg:w-2/5 mb-10 px-4 lg:px-0"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Label label={"Upload Image"} />
            <Input
              type={"file"}
              multiple
              id={"input-image-portfolio"}
              placeholder={"Upload Image"}
              required
              onChange={(e) => handleFileSelected(e)}
            />

            <Label label={"Client Name"} />
            <Input
              type={"text"}
              id={"input-client-name"}
              placeholder={"Mr. John Doe"}
              required
              onChange={(e) => setClientName(e.target.value)}
            />

            <Label label={"Finish Date"} />
            <Input
              type={"date"}
              id={"input-finish-date"}
              placeholder={"Finish Date"}
              required
              onChange={(e) => setFinishDate(e.target.value)}
            />

            <Label label={"Location"} />
            <Input
              type={"text"}
              id={"input-location"}
              placeholder={
                "Tawangmas, Semarang Barat, Semarang City, Central Java"
              }
              required
              onChange={(e) => setLocation(e.target.value)}
            />

            <div className="z-0">
              <MapContainer
                center={center}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: "250px" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  draggable={draggable}
                  eventHandlers={eventHandlers}
                  position={position}
                  ref={markerRef}
                >
                  <Popup minWidth={90}>
                    <span onClick={toggleDraggable}>
                      {draggable
                        ? "Marker is draggable"
                        : "Click here to change location"}
                    </span>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

            <Label label={"Cost"} />
            <Input
              type={"number"}
              id={"input-cost"}
              placeholder={"400000000"}
              required
              onChange={(e) => setPrice(e.target.value)}
            />

            <Label label={"Description"} />
            <textarea
              id={"input-portfolio-description"}
              placeholder={
                "Mr Doe's house was made with an elegant design according to his dreams and at optimal costs"
              }
              required
              className="resize-y h-32 w-full bg-white placeholder-stone-400 text-neutral-900 font-normal border border-blue-400 focus:border focus:border-blue-400 focus:ring-0 rounded-sm p-2 pl-3 mb-4 text-sm"
              onChange={(e) => setDescription(e.target.value)}
            />
            <CustomButton label={"SUBMIT"} loading={loading} />
          </form>
        </div>
      </Layout>
    );
  }
}

export default withRouter(AddPortfolio);
