import React from "react";
import { Result } from "antd";
import Link from "next/link";

const Success = () => (
  <Result
    status="success"
    title="Successfully Purchased Cloud Server ECS!"
    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    extra={[
      <Link href="/"> Go Home</Link>,

      <Link href="/ShoppingPage">Buy Again</Link>,
    ]}
  />
);

export default Success;
