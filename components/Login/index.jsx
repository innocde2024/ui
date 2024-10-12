/* eslint-disable quotes */
import { Button, Form, Input, notification } from "antd";
import React from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { BoxCube } from "../BoxCube";
import authApi from "../../api/authApi";
import { useAuth } from "../../context/authContext";

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();
  const loginMutation = useMutation({
    mutationFn: (body) => authApi.post("/login", body),
  });

  const onLogin = (values) => {
    loginMutation.mutate(values, {
      onSuccess(response) {
        const { accessToken, refreshToken } = response.data;
        notification.success({ message: "Login successful" });
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        router.push("/");
        login();
      },
      onError(response) {
        if (response.response.data.message === "Wrong password") {
          notification.error({ message: "Mật khẩu sai" });
        } else {
          notification.error({
            message: "Đăng nhập thất bại, vui lòng thử lại sau",
          });
        }
      },
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className=" absolute inset-0 bg-[url('/FPT.jpg')] bg-cover bg-top">
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <div className="basis-1/2 p-20 flex flex-col items-center justify-center">
            <h1
              className="mb-20 mx:text-[36px] font-bold text-gray-900 text-center"
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                color: "lightcyan",
                textAlign: "center",
              }}
            >
              Đăng nhập
            </h1>

            <Form
              onFinish={onLogin}
              className="w-full max-w-md"
              name="basic"
              wrapperCol={{
                span: 24,
              }}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Vui Lòng Nhập Email!",
                  },
                ]}
              >
                <Input
                  placeholder="Nhập Email"
                  style={{ padding: "10px 20px" }}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui Lòng Nhập Mật Khẩu!",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Nhập Mật Khẩu"
                  style={{ padding: "10px 20px", margin: "20px 0" }}
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  span: 24,
                }}
                className="text-center"
              >
                <Button
                  loading={loginMutation.isPending}
                  type="primary"
                  htmlType="submit"
                  style={{
                    color: "#5884bb",
                    padding: "20px 28px",
                    backgroundColor: "lightcyan",
                    fontWeight: "bold",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontSize: "18px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#5884bb";
                    e.currentTarget.style.color = "lightcyan";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "lightcyan";
                    e.currentTarget.style.color = "#5884bb";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  Đăng nhập
                </Button>
              </Form.Item>
              <div className="text-center text-[#084D9A] font-bold sm:bg-transparent bg-[#E0FFFF] rounded-[10px] ">
                <Link href="/signup">Bạn chưa có tài khoản?</Link>
              </div>
            </Form>
          </div>
          <div className="basis-1/2 flex items-center justify-center hidden sm:block">
            <BoxCube />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
