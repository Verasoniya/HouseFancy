import React from "react";
// import { Footer } from "./Footer";
import Header from "./Header";

function Layout(props) {
  return (
    <div className="w-full h-screen flex flex-col overflow-auto justify-between bg-white">
      <Header />
      <div className="h-full w-full">{props.children}</div>
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
