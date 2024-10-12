import React from "react";
import { Carousel } from "antd";

const Banner = () => (
  <Carousel autoplay className="">
    <div className="w-[100vw] h-[43vh] ">
      <img className="w-full h-full object-cover" src="/pi1.jpg" alt="" />
    </div>
    <div className="w-[100vw] h-[43vh] ">
      <img className="w-full h-full object-cover" src="/pi2.jpg" alt="" />
    </div>
    <div className="w-[100vw] h-[43vh] ">
      <img className="w-full h-full object-cover" src="/pi1.jpg" alt="" />
    </div>
    <div className="w-[100vw] h-[43vh] ">
      <img className="w-full h-full object-cover" src="/pi2.jpg" alt="" />
    </div>
  </Carousel>
);
export default Banner;
