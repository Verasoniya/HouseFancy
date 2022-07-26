// import React, {
//   useCallback,
//   useContext,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { useNavigate } from "react-router-dom";

// import { TokenContext } from "../context/AuthContext";
// import { apiRequest } from "../context/apiRequest";
// import CustomButton from "../components/CustomButton";
// import { Input } from "../components/Input";
// import { Label } from "../components/Label";
// import Layout from "../components/Layout";
// import logo from "../assets/logoblue.png";
// import swal from "sweetalert";

// function AddHouse() {
//   const navigate = useNavigate();
//   const { setToken } = useContext(TokenContext);
//   const [loading, setLoading] = useState(false);
//   const [files, setFiles] = useState("");
//   const [title, setTitle] = useState("");
//   const [prices, setPrice] = useState(0);
//   const [bedrooms, setBedroom] = useState(0);
//   const [bathrooms, setBathroom] = useState(0);
//   const [location, setLocation] = useState("");
//   const [latitude, setLatitude] = useState(-6.1774);
//   const [longitude, setLongitude] = useState(106.8269);
//   const [description, setDescription] = useState("");
//   const [certificate, setCertificate] = useState("");
//   const [surface_areas, setSurfaceArea] = useState(0);
//   const [building_areas, setBuildingArea] = useState(0);
//   const center = {
//     lat: -6.1774,
//     lng: 106.8269,
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

//   const handleSubmit = async (e) => {
//     setLoading(true);
//     e.preventDefault();

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

//     apiRequest("houses", "POST", body)
//       .then((res) => {
//         const { data } = res;

//         handleSubmitImages(data.id_house);
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

//   const handleSubmitImages = async (id_house) => {
//     const [image] = files.files;
//     setLoading(true);
//     let requests = [];
//     for (let i = 0; i < image.length; i++) {
//       const formData = new FormData();
//       formData.append("files", image[i]);

//       requests.push(
//         apiRequest(
//           `/houses/images/${id_house}`,
//           "POST",
//           formData,
//           "multipart/form-data"
//         )
//           .then(async (res) => {
//             return Promise.resolve(true);
//           })
//           .catch((err) => {
//             console.log(err.message);
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
//         title: "Successfully to Add House",
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
//           <p className="font-bold text-xl mb-10">Add Your Sale House</p>
//           <form
//             className="flex flex-col w-full gap-1 lg:w-2/5 mb-10 px-4 lg:px-0"
//             onSubmit={(e) => handleSubmit(e)}
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
//               onChange={(e) => setTitle(e.target.value)}
//             />

//             <Label label={"House Price"} />
//             <Input
//               type={"number"}
//               id={"input-house-price"}
//               placeholder={"House Price"}
//               required
//               onChange={(e) => setPrice(e.target.value)}
//             />

//             <Label label={"House Location"} />
//             <Input
//               type={"text"}
//               id={"input-house-location"}
//               placeholder={"House Location"}
//               required
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
//                   position={position}
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
//               onChange={(e) => setSurfaceArea(e.target.value)}
//             />

//             <Label label={"Building Area"} />
//             <Input
//               type={"number"}
//               id={"input-house-building-area"}
//               placeholder={"Building Area"}
//               required
//               onChange={(e) => setBuildingArea(e.target.value)}
//             />

//             <Label label={"Number of Bedrooms"} />
//             <Input
//               type={"number"}
//               id={"input-house-bedrooms"}
//               placeholder={"Number of Bedrooms"}
//               required
//               onChange={(e) => setBedroom(e.target.value)}
//             />

//             <Label label={"Number of Bathrooms"} />
//             <Input
//               type={"number"}
//               id={"input-house-bathrooms"}
//               placeholder={"Number of Bathrooms"}
//               required
//               onChange={(e) => setBathroom(e.target.value)}
//             />

//             <Label label={"House Certificate (SHM/HGB)"} />
//             <Input
//               type={"text"}
//               id={"input-house-certificate"}
//               placeholder={"House Certificate (SHM/HGB)"}
//               required
//               onChange={(e) => setCertificate(e.target.value)}
//             />

//             <Label label={"House Description"} />
//             <textarea
//               id={"input-house-description"}
//               placeholder={"House Description"}
//               required
//               className="resize-y h-32 w-full bg-white placeholder-stone-600 text-neutral-900 font-normal border border-blue-400 focus:border focus:border-blue-400 focus:ring-0 rounded-sm p-2 pl-3 text-sm"
//               onChange={(e) => setDescription(e.target.value)}
//             />
//             <CustomButton label={"SUBMIT"} loading={loading} />
//           </form>
//         </div>
//       </Layout>
//     );
//   }
// }

// export default AddHouse;

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
import { apiRequest } from "../context/apiRequest";
import CustomButton from "../components/CustomButton";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import Layout from "../components/Layout";
import logo from "../assets/logoblue.png";
import swal from "sweetalert";

function AddHouse() {
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState("");
  const [title, setTitle] = useState("");
  const [prices, setPrice] = useState(0);
  const [bedrooms, setBedroom] = useState(0);
  const [bathrooms, setBathroom] = useState(0);
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(-6.1774);
  const [longitude, setLongitude] = useState(106.8269);
  const [description, setDescription] = useState("");
  const [certificate, setCertificate] = useState("");
  const [surface_areas, setSurfaceArea] = useState(0);
  const [building_areas, setBuildingArea] = useState(0);
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
          console.log(posLatLong);
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

    apiRequest("houses", "POST", body)
      .then((res) => {
        const { data } = res;
        console.log(data.id_house);
        handleSubmitImages(data.id_house);
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

  const handleSubmitImages = async (id_house) => {
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
          `/houses/images/${id_house}`,
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
        title: "Successfully to Add House",
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
          <p className="font-bold text-xl mb-10">Add Your Sale House</p>
          <form
            className="flex flex-col w-full gap-1 lg:w-2/5 mb-10 px-4 lg:px-0"
            onSubmit={(e) => handleSubmit(e)}
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
              onChange={(e) => setTitle(e.target.value)}
            />

            <Label label={"House Price"} />
            <Input
              type={"number"}
              id={"input-house-price"}
              placeholder={"500000000"}
              required
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

            <Label label={"Surface Area"} />
            <Input
              type={"number"}
              id={"input-house-surface-area"}
              placeholder={"100"}
              required
              onChange={(e) => setSurfaceArea(e.target.value)}
            />

            <Label label={"Building Area"} />
            <Input
              type={"number"}
              id={"input-house-building-area"}
              placeholder={"80"}
              required
              onChange={(e) => setBuildingArea(e.target.value)}
            />

            <Label label={"Number of Bedrooms"} />
            <Input
              type={"number"}
              id={"input-house-bedrooms"}
              placeholder={"4"}
              required
              onChange={(e) => setBedroom(e.target.value)}
            />

            <Label label={"Number of Bathrooms"} />
            <Input
              type={"number"}
              id={"input-house-bathrooms"}
              placeholder={"4"}
              required
              onChange={(e) => setBathroom(e.target.value)}
            />

            <Label label={"House Certificate (SHM/HGB)"} />
            <Input
              type={"text"}
              id={"input-house-certificate"}
              placeholder={"SHM/HGB"}
              required
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
              onChange={(e) => setDescription(e.target.value)}
            />
            <CustomButton label={"SUBMIT"} loading={loading} />
          </form>
        </div>
      </Layout>
    );
  }
}

export default AddHouse;
