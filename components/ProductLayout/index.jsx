/* eslint-disable no-unused-vars */
import React from "react";
import Catalog from "../Catalog";
import ProductDetail from "../ProductDetail";

// Layout Component
const Layout = ({ children }) => (
  <div className="bg-color min-h-screen flex flex-col">
    <header className="bg-white shadow-md" />
    <main className="flex-1">
      <ProductDetail />
      <Catalog />
    </main>
  </div>
);

export default Layout;
