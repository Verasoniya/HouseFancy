import React from "react";
import Header from "./Header";

function Layout(props) {
  return (
    <div className="w-full h-screen flex flex-col overflow-auto bg-white">
      <Header />
      <div className="h-full w-full">{props.children}</div>
    </div>
  );
}

export default Layout;
