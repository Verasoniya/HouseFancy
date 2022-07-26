// import React, {
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { useNavigate } from "react-router-dom";

// import { TokenContext } from "../context/AuthContext";
// import { withRouter } from "../context/navigations";
// import { apiRequest } from "../context/apiRequest";
// import CustomButton from "../components/CustomButton";
// import { Label } from "../components/Label";
// import { Input } from "../components/Input";
// import Layout from "../components/Layout";
// import logo from "../assets/logoblue.png";
// import swal from "sweetalert";

// function EditHouse(props) {
//   const { house_id } = props.params;
//   const navigate = useNavigate();
//   const { setToken } = useContext(TokenContext);
//   const [loading, setLoading] = useState(true);
//   const [house, setHouse] = useState([]);
//   const [files, setFiles] = useState("");
//   const [title, setTitle] = useState("");
//   const [prices, setPrice] = useState(0);
//   const [bedrooms, setBedroom] = useState(0);
//   const [bathrooms, setBathroom] = useState(0);
//   const [location, setLocation] = useState("");
//   const [latitude, setLatitude] = useState(0);
//   const [longitude, setLongitude] = useState(0);
//   const [description, setDescription] = useState("");
//   const [certificate, setCertificate] = useState("");
//   const [surface_areas, setSurfaceArea] = useState(0);
//   const [building_areas, setBuildingArea] = useState(0);
//   const [image_del, setImageDel] = useState([]);

//   useEffect(() => {
//     fetchHouseDetail();
//   }, []);

//   const center = {
//     lat: latitude,
//     lng: longitude,
//   };
//   const [draggable, setDraggable] = useState(false);
//   const [position, setPosition] = useState(center);
//   const markerRef = useRef(null);
//   const eventHandlers = useMemo(
//     () => ({
//       dragend() {
//         const marker = markerRef.current;
//         if (marker != null) {
//           setPosition(marker.getLatLng());
//           const posLatLong = marker.getLatLng();
//           setLatitude(posLatLong.lat);
//           setLongitude(posLatLong.lng);
//         }
//       },
//     }),
//     []
//   );

//   const toggleDraggable = useCallback(() => {
//     setDraggable((d) => !d);
//   }, []);

//   const fetchHouseDetail = () => {
//     apiRequest(`/houses/${house_id}`, "GET", {})
//       .then((res) => {
//         const { data } = res.data;
//         // setHouse(data);
//         setLatitude(data.latitude);
//         setLongitude(data.longitude);
//         setDescription(data.description);
//         setTitle(data.title);
//         setBathroom(data.bathroom);
//         setBedroom(data.bedroom);
//         setBuildingArea(data.building_area);
//         setSurfaceArea(data.surface_area);
//         setCertificate(data.certificate);
//         setLocation(data.location);
//         setPrice(data.price);
//         const image = [];

//         Object.keys(data.image_url).map((img) =>
//           image.push(data.image_url[img])
//         );
//         setImageDel(image);
//       })
//       .catch((err) => {
//         const { data } = err.response;
//         if ([401, 403].includes(data.code)) {
//           localStorage.removeItem("token");
//           setToken("0");
//           navigate("/login");
//         }
//         swal({
//           icon: "error",
//           title: data.message,
//         });
//       })
//       .finally(() => setLoading(false));
//   };

//   // ------------------- Delete House (Delete Image after get id image) ------------------------
//   const handleSubmitUpdate = async (e) => {
//     setLoading(true);
//     e.preventDefault();
//     const images = image_del;

//     const id_image = [];
//     for (let i = 0; i < images.length; i++) {
//       id_image.push(images[i].id);
//     }

//     let requests = [];
//     for (let i = 0; i < id_image.length; i++) {
//       let image_id = id_image[i];

//       requests.push(
//         apiRequest(`/houses/images/${image_id}`, "DELETE", {})
//           .then(async (res) => {
//             return Promise.resolve(true);
//           })
//           .catch((err) => {
//             return Promise.resolve(false);
//           })
//       );
//     }

//     await Promise.all(requests).then((results) => {
//       for (let i = 0; i < requests.length; i++) {}
//       handleUpdateHouse();
//     });
//   };

//   const handleUpdateHouse = async () => {
//     const price = parseInt(prices);
//     const bedroom = parseInt(bedrooms);
//     const bathroom = parseInt(bathrooms);
//     const surface_area = parseInt(surface_areas);
//     const building_area = parseInt(building_areas);

//     const body = {
//       title,
//       price,
//       bedroom,
//       bathroom,
//       location,
//       latitude,
//       longitude,
//       description,
//       certificate,
//       surface_area,
//       building_area,
//     };

//     apiRequest(`/houses/${house_id}`, "PUT", body)
//       .then((res) => {
//         handleSubmitImages(house_id);
//       })
//       .catch((err) => {
//         const { data } = err.response;
//         if ([401, 403].includes(data.code)) {
//           localStorage.removeItem("token");
//           setToken("0");
//           navigate("/login");
//         }
//         swal({
//           icon: "error",
//           title: data.message,
//         });
//       });
//   };

//   const handleFileSelected = async (e) => {
//     setFiles({ files: [...files, e.target.files] });
//   };

//   const handleSubmitImages = async (house_id) => {
//     const [image] = files.files;
//     setLoading(true);
//     let requests = [];
//     for (let i = 0; i < image.length; i++) {
//       const formData = new FormData();
//       formData.append("files", image[i]);

//       requests.push(
//         apiRequest(
//           `/houses/images/${house_id}`,
//           "POST",
//           formData,
//           "multipart/form-data"
//         )
//           .then(async (res) => {
//             return Promise.resolve(true);
//           })
//           .catch((err) => {
//             return Promise.resolve(false);
//           })
//       );
//     }

//     await Promise.all(requests).then((results) => {
//       console.log("finished", results);
//       for (let i = 0; i < requests.length; i++) {}
//       setLoading(false);
//       swal({
//         icon: "success",
//         title: "Successfully to Update House",
//       });
//       navigate("/my-list-house");
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center content-center">
//         <div className="flex flex-col h-screen justify-center ">
//           <img
//             src={logo}
//             alt="Loading"
//             width={200}
//             height={200}
//             className="animate-pulse"
//           />
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       <Layout>
//         <div className="flex flex-col items-center my-10">
//           <p className="font-bold text-xl mb-10">Update Your Sale House</p>
//           <form
//             className="flex flex-col w-full gap-1 lg:w-2/5 mb-10 px-4 lg:px-0"
//             onSubmit={(e) => handleSubmitUpdate(e)}
//           >
//             <Label label={"House Image"} />
//             <Input
//               type={"file"}
//               multiple
//               id={"input-image-house"}
//               placeholder={"House Image"}
//               required
//               onChange={(e) => handleFileSelected(e)}
//             />

//             <Label label={"House Title"} />
//             <Input
//               type={"text"}
//               id={"input-house-title"}
//               placeholder={"House Title"}
//               required
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />

//             <Label label={"House Price"} />
//             <Input
//               type={"number"}
//               id={"input-house-price"}
//               placeholder={"House Price"}
//               required
//               value={prices}
//               onChange={(e) => setPrice(e.target.value)}
//             />

//             <Label label={"House Location"} />
//             <Input
//               type={"text"}
//               id={"input-house-location"}
//               placeholder={"House Location"}
//               required
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//             />
//             <div className="z-0">
//               <MapContainer
//                 center={center}
//                 zoom={13}
//                 scrollWheelZoom={true}
//                 style={{ height: "250px" }}
//               >
//                 <TileLayer
//                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//                 <Marker
//                   draggable={draggable}
//                   eventHandlers={eventHandlers}
//                   position={center}
//                   ref={markerRef}
//                 >
//                   <Popup minWidth={90}>
//                     <span onClick={toggleDraggable}>
//                       {draggable
//                         ? "Marker is draggable"
//                         : "Click here to change location"}
//                     </span>
//                   </Popup>
//                 </Marker>
//               </MapContainer>
//             </div>

//             <Label label={"Surface Area"} />
//             <Input
//               type={"number"}
//               id={"input-house-surface-area"}
//               placeholder={"Surface Area"}
//               required
//               value={surface_areas}
//               onChange={(e) => setSurfaceArea(e.target.value)}
//             />

//             <Label label={"Building Area"} />
//             <Input
//               type={"number"}
//               id={"input-house-building-area"}
//               placeholder={"Building Area"}
//               required
//               value={building_areas}
//               onChange={(e) => setBuildingArea(e.target.value)}
//             />

//             <Label label={"Number of Bedrooms"} />
//             <Input
//               type={"number"}
//               id={"input-house-bedrooms"}
//               placeholder={"Number of Bedrooms"}
//               required
//               value={bedrooms}
//               onChange={(e) => setBedroom(e.target.value)}
//             />

//             <Label label={"Number of Bathrooms"} />
//             <Input
//               type={"number"}
//               id={"input-house-bathrooms"}
//               placeholder={"Number of Bathrooms"}
//               required
//               value={bathrooms}
//               onChange={(e) => setBathroom(e.target.value)}
//             />

//             <Label label={"House Certificate (SHM/HGB)"} />
//             <Input
//               type={"text"}
//               id={"input-house-certificate"}
//               placeholder={"House Certificate (SHM/HGB)"}
//               required
//               value={certificate}
//               onChange={(e) => setCertificate(e.target.value)}
//             />

//             <Label label={"House Description"} />
//             <textarea
//               id={"input-house-description"}
//               placeholder={"House Description"}
//               required
//               className="resize-y h-32 w-full bg-white placeholder-stone-600 text-neutral-900 font-normal border border-blue-400 focus:border focus:border-blue-400 focus:ring-0 rounded-sm p-2 pl-3 text-sm"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//             <CustomButton label={"UPDATE"} loading={loading} />
//           </form>
//         </div>
//       </Layout>
//     );
//   }
// }

// export default withRouter(EditHouse);

import React, {
  useCallback,
  useContext,
  useEffect,
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

function EditHouse(props) {
  const { house_id } = props.params;
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);
  const [loading, setLoading] = useState(true);
  const [house, setHouse] = useState([]);
  const [files, setFiles] = useState("");
  const [title, setTitle] = useState("");
  const [prices, setPrice] = useState(0);
  const [bedrooms, setBedroom] = useState(0);
  const [bathrooms, setBathroom] = useState(0);
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [description, setDescription] = useState("");
  const [certificate, setCertificate] = useState("");
  const [surface_areas, setSurfaceArea] = useState(0);
  const [building_areas, setBuildingArea] = useState(0);
  const [image_del, setImageDel] = useState([]);

  useEffect(() => {
    fetchHouseDetail();
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

  const fetchHouseDetail = () => {
    apiRequest(`/houses/${house_id}`, "GET", {})
      .then((res) => {
        const { data } = res.data;
        // setHouse(data);
        setLatitude(data.latitude);
        setLongitude(data.longitude);
        setDescription(data.description);
        setTitle(data.title);
        setBathroom(data.bathroom);
        setBedroom(data.bedroom);
        setBuildingArea(data.building_area);
        setSurfaceArea(data.surface_area);
        setCertificate(data.certificate);
        setLocation(data.location);
        setPrice(data.price);
        const image = [];
        console.log("image", image);
        console.log("data", data);
        Object.keys(data.image_url).map((img) =>
          image.push(data.image_url[img])
        );
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

  // ------------------- Delete House (Delete Image after get id image) ------------------------
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
      handleUpdateHouse();
    });
  };

  const handleUpdateHouse = async () => {
    const price = parseInt(prices);
    const bedroom = parseInt(bedrooms);
    const bathroom = parseInt(bathrooms);
    const surface_area = parseInt(surface_areas);
    const building_area = parseInt(building_areas);

    const body = {
      title,
      price,
      bedroom,
      bathroom,
      location,
      latitude,
      longitude,
      description,
      certificate,
      surface_area,
      building_area,
    };

    apiRequest(`/houses/${house_id}`, "PUT", body)
      .then((res) => {
        console.log(house_id);
        handleSubmitImages(house_id);
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

  const handleSubmitImages = async (house_id) => {
    // console.log(files.files);
    const [image] = files.files;
    setLoading(true);
    let requests = [];
    for (let i = 0; i < image.length; i++) {
      const formData = new FormData();
      formData.append("files", image[i]);
      console.log(image[i]);

      requests.push(
        apiRequest(
          `/houses/images/${house_id}`,
          "POST",
          formData,
          "multipart/form-data"
        )
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
        title: "Successfully to Update House",
      });
      navigate("/my-list-house");
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
          <p className="font-bold text-xl mb-10">Update Your Sale House</p>
          <form
            className="flex flex-col w-full gap-1 lg:w-2/5 mb-10 px-4 lg:px-0"
            onSubmit={(e) => handleSubmitUpdate(e)}
          >
            <Label label={"House Image"} />
            <Input
              type={"file"}
              multiple
              id={"input-image-house"}
              placeholder={"House Image"}
              required
              onChange={(e) => handleFileSelected(e)}
            />

            <Label label={"House Title"} />
            <Input
              type={"text"}
              id={"input-house-title"}
              placeholder={"Plum Blossom Residence"}
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Label label={"House Price"} />
            <Input
              type={"number"}
              id={"input-house-price"}
              placeholder={"500000000"}
              required
              value={prices}
              onChange={(e) => setPrice(e.target.value)}
            />

            <Label label={"House Location"} />
            <Input
              type={"text"}
              id={"input-house-location"}
              placeholder={
                "Jl. Galur Selatan, Galur, Kec. Johar Baru, Kota Jakarta Pusat, DKI Jakarta"
              }
              required
              value={location}
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
                  position={center}
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

            <Label label={"Surface Area"} />
            <Input
              type={"number"}
              id={"input-house-surface-area"}
              placeholder={"100"}
              required
              value={surface_areas}
              onChange={(e) => setSurfaceArea(e.target.value)}
            />

            <Label label={"Building Area"} />
            <Input
              type={"number"}
              id={"input-house-building-area"}
              placeholder={"80"}
              required
              value={building_areas}
              onChange={(e) => setBuildingArea(e.target.value)}
            />

            <Label label={"Number of Bedrooms"} />
            <Input
              type={"number"}
              id={"input-house-bedrooms"}
              placeholder={"4"}
              required
              value={bedrooms}
              onChange={(e) => setBedroom(e.target.value)}
            />

            <Label label={"Number of Bathrooms"} />
            <Input
              type={"number"}
              id={"input-house-bathrooms"}
              placeholder={"4"}
              required
              value={bathrooms}
              onChange={(e) => setBathroom(e.target.value)}
            />

            <Label label={"House Certificate (SHM/HGB)"} />
            <Input
              type={"text"}
              id={"input-house-certificate"}
              placeholder={"SHM/HGB"}
              required
              value={certificate}
              onChange={(e) => setCertificate(e.target.value)}
            />

            <Label label={"House Description"} />
            <textarea
              id={"input-house-description"}
              placeholder={
                "Sturdy house ready to live in the middle of the city. Strategic location, safe and comfortable"
              }
              required
              className="resize-y h-32 w-full bg-white placeholder-stone-400 text-neutral-900 font-normal border border-blue-400 focus:border focus:border-blue-400 focus:ring-0 rounded-sm p-2 pl-3 mb-4 text-sm"
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

export default withRouter(EditHouse);
