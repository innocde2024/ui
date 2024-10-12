/* eslint-disable no-unused-vars */
import React from "react";
import ParkIcon from "@mui/icons-material/Park";
import Banner from "../Banner";
import Catalog from "../Catalog";

// Layout Component
const Layout = ({ children }) => (
  <div className="bg-bodyColor min-h-screen flex flex-col">
    <main className="flex-1 relative">
      <Banner />
      <Catalog />
      <footer className="h-[20vh] ">
        <div className="flex items-center justify-center">
          <h3 className="font-bold text-[2.5rem]">
            Chung tay trồng cây vì một cộng đồng xanh!
          </h3>
        </div>
        <div className="flex items-center justify-center font-semibold">
          Mỗi hóa đơn có giá trị 50.000đ : 1{" "}
          <ParkIcon className="text-lime-600" />
        </div>
      </footer>
    </main>
  </div>
);

export default Layout;
