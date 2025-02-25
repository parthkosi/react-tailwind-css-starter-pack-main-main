import React from "react";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <img
        className="w-[100vw] h-[100vh] object-cover"
        src="https://d3h2k7ug3o5pb3.cloudfront.net/image/2021-09-24/ae71e680-1d1d-11ec-9c16-299dadad39af.png"
        alt="hehe"
      ></img>
    </div>
  );
};

export default HomePage;
