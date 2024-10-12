/* eslint-disable react/button-has-type */
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Breadcrumb, Card, Carousel, InputNumber } from "antd";
import Link from "next/link";
import React from "react";

const contentStyle = {
  margin: 0,
  height: "400px",
  width: "100%",
  objectFit: "cover",
};

const ProductDetail = () => (
  <div className="container mx-auto p-4">
    <Breadcrumb
      separator=">"
      className="mt-10 mb-2 text-pink-700"
      items={[
        {
          title: <Link href="/ShoppingPage">Shopping Page</Link>,
        },
        {
          title: "Product 1",
        },
      ]}
    />
    <div className="flex flex-wrap md:flex-nowrap bg-white p-3 rounded">
      <div className="w-full md:w-2/3 p-2">
        <Carousel arrows infinite={false}>
          <div>
            <img
              src="/productImage1.jpg"
              alt="Product 1"
              style={contentStyle}
            />
          </div>
          <div>
            <img src="/product1-2.jpg" alt="Product 2" style={contentStyle} />
          </div>
        </Carousel>
      </div>
      <div className="w-full md:w-1/3 p-2">
        <Card title="Product Details" bordered={false}>
          <p className="text-lg font-semibold">Móc khóa FPT</p>
          <p className="text-md">Mô tả: This is a great product.</p>
          <p className="text-md">Giá: 100 đ</p>
          <div>
            <InputNumber defaultValue={1} controls />
            <p className="text-md">10 sản phẩm có sẵn</p>
          </div>
          <div>
            <button className="mt-4 px-4 py-2 bg-customOrange text-white rounded hover:text-customOrange hover:border-customOrange hover:bg-white">
              <ShoppingCartOutlined /> Thêm vào giỏ hàng
            </button>
            <button className="mt-4 px-4 py-2 text-customOrange bg-white rounded border-2 border-customOrange hover:text-white hover:bg-customOrange">
              Mua ngay
            </button>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

export default ProductDetail;
