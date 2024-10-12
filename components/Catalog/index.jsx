/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */

"use client";

import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, FloatButton, Modal, notification } from "antd";
import { useState } from "react";
import { useCart } from "react-use-cart";
import { useMutation } from "@tanstack/react-query";
import useAllProducts from "../../hook/shop/useAllProducts";
import CommonLoading from "../Loading";
import shopApi from "../../api/shopApi";

const Catalog = () => {
  const { data, isLoading } = useAllProducts();
  const products = data?.data;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { addItem, items, removeItem, updateItemQuantity, cartTotal } =
    useCart();

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleAddToCart = (item) => {
    addItem(item);
  };

  const incrementQuantity = (itemId) => {
    const item = items.find((item) => item.id === itemId);
    updateItemQuantity(itemId, item.quantity + 1);
  };

  const decrementQuantity = (itemId) => {
    const item = items.find((item) => item.id === itemId);
    if (item.quantity > 1) {
      updateItemQuantity(itemId, item.quantity - 1);
    } else {
      removeItem(itemId);
    }
  };
  const paymentMutation = useMutation({
    mutationFn: (body) => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Authorization token is missing");
      }
      return shopApi.post("/payment/charge", body, {
        headers: {
          Authorization: token,
        },
      });
    },
  });
  const handlePayment = () => {
    const body = items?.map((item) => ({
      quantity: item.quantity,
      product: item,
    }));
    paymentMutation.mutate(
      { orderItems: body },
      {
        onSuccess(dataH) {
          localStorage.removeItem("react-use-cart");
          window.location.replace(dataH.data);
        },
        onError() {
          notification.error({ message: "Payment failed" });
        },
      }
    );
  };
  const productItems = products?.map((item, index) => (
    <div key={index} className="w-full sm:w-1/2 lg:w-1/5 p-5 drop-shadow-2xl">
      <div className="w-full rounded-lg overflow-hidden border-solid border-[2px] border-[#ccc]">
        <div className="w-full h-60 group overflow-hidden relative">
          <img
            src={item?.image}
            alt={`product  ${index + 1}`}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-110 duration-200 rounded-t-lg"
          />
        </div>
        <div className="border-[1px] border-slate-300 border-t-0 px-2 py-4 flex flex-col gap-y-2 bg-white rounded-b-lg">
          <p>{item.name}</p>
          <div className="flex items-center justify-between gap-5">
            <button
              className="bg-orange-600 px-3 py-2 text-[12px] tracking-wide rounded-md text-slate-100 hover:bg-orange-800 hover:text-white duration-200"
              onClick={() => handleAddToCart(item)}
            >
              Thêm Vào Giỏ
            </button>
            <p className="font-semibold">
              {Number(item.price).toLocaleString()}đ
            </p>
          </div>
        </div>
      </div>
    </div>
  ));
  const [isShowConfirmBuy, setIsShowConfirmBuy] = useState();
  return (
    <div className="flex flex-wrap -mx-2">
      {isLoading ? <CommonLoading /> : productItems}
      <Modal
        open={isModalVisible}
        footer={false}
        onCancel={handleCancel}
        onOk={() => setIsModalVisible(true)}
      >
        <section className="relative">
          <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
            <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
              Shopping Cart
            </h2>
            {items.map((item, index) => (
              <div
                key={index}
                className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4"
              >
                <div className="col-span-12 lg:col-span-2 img box">
                  <img
                    src={item.image}
                    alt="product image"
                    className="max-lg:w-full lg:w-[180px]"
                  />
                </div>
                <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                  <div className="flex items-center justify-between w-full mb-4">
                    <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">
                      {item.name}
                    </h5>
                    <button
                      className="rounded-full group flex items-center justify-center focus-within:outline-red-500"
                      onClick={() => removeItem(item.id)}
                    >
                      <svg
                        width={34}
                        height={34}
                        viewBox="0 0 34 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          className="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                          cx={17}
                          cy={17}
                          r={17}
                          fill=""
                        />
                        <path
                          className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                          d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                          stroke="#EF4444"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <button
                        className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
                        onClick={() => decrementQuantity(item.id)}
                      >
                        <svg
                          className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                          width={18}
                          height={19}
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.5 9.5H13.5"
                            stroke=""
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <input
                        type="text"
                        id="number"
                        className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100 text-center"
                        value={item.quantity}
                        readOnly
                      />
                      <button
                        className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
                        onClick={() => incrementQuantity(item.id)}
                      >
                        <svg
                          className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                          width={18}
                          height={19}
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.75 9.5H14.25M9 14.75V4.25"
                            stroke=""
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">
                      {Number(item.price * item.quantity).toLocaleString()}đ
                    </h6>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex flex-col md:flex-row items-center md:justify-between md:items-start gap-4 max-md:max-w-lg max-md:mx-auto">
              <div className="w-full md:max-w-[350px] md:basis-[35%]">
                <div className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 w-full md:max-w-xs mx-auto">
                  <h4 className="font-manrope font-bold text-2xl leading-9 mb-5 text-gray-900 text-center">
                    Order Summary
                  </h4>
                  <ul className="flex flex-col gap-4 text-gray-900">
                    <li className="flex justify-between">
                      <span className="font-manrope font-normal text-lg leading-6">
                        Subtotal
                      </span>
                      <span className="font-manrope font-bold text-lg leading-6">
                        {cartTotal.toLocaleString()}đ
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-manrope font-normal text-lg leading-6">
                        Discount
                      </span>
                      <span className="font-manrope font-bold text-lg leading-6">
                        -0%
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-manrope font-normal text-lg leading-6">
                        Shipping
                      </span>
                      <span className="font-manrope font-bold text-lg leading-6">
                        0đ
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-manrope font-normal text-lg leading-6">
                        Total
                      </span>
                      <span className="font-manrope font-bold text-lg leading-6">
                        {cartTotal.toLocaleString()}đ
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Button onClick={() => setIsShowConfirmBuy(true)}>Thanh toán</Button>
        </section>
      </Modal>
      <Modal
        onOk={handlePayment}
        isConfirmLoading={paymentMutation.isPending}
        onCancel={() => setIsShowConfirmBuy(false)}
        open={isShowConfirmBuy}
      >
        <p>Bạn chắc chắn thanh toán chứ</p>
      </Modal>
      <FloatButton
        badge={{ count: items.length, size: "50px" }}
        onClick={showModal}
        className="fixed bottom-0 s"
        icon={<ShoppingCartOutlined />}
      >
        {" "}
      </FloatButton>
    </div>
  );
};

export default Catalog;
