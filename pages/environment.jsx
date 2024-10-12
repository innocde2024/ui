import React from "react";
import dynamic from "next/dynamic";
import Project from "../components/Project";

const Globe = dynamic(() => import("../components/Globe/Globe"), {
  ssr: false,
  loading: () => (
    <div className="h-16 bg-[#0f0f0f] my-auto relative flex items-center justify-center">
      <div className="h-16 w-16 rounded-full border-2 border-[#fff] border-dashed animate-spin" />
    </div>
  ),
});

const Environment = () => (
  <div className=" bg-customOrange py-24" style={{ paddingBottom: "22rem" }}>
    <div
      className="flex justify-center items-center content-center h-screen"
      style={{ fontSize: "60px !important" }}
    >
      <h1
        className="font-bold text-6xl text-white"
        style={{ marginTop: "12rem !important", fontSize: "60px !important" }}
      >
        FPT 25 năm và môi trường
      </h1>
    </div>
    <div
      className="h-[70vw]  bg-customOrange flex items-center justify-center"
      style={{ marginTop: "10rem !important" }}
    >
      <Globe />
      <Project />
    </div>
  </div>
);

export default Environment;
