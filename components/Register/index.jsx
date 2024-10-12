/* eslint-disable prefer-regex-literals */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import { Button, Form, Input, notification } from "antd";
import React from "react";
// import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { BoxCube } from "../BoxCube";
import authApi from "../../api/authApi";

const Register = () => {
  // const router = useRouter();
  const registerMutation = useMutation({
    mutationFn: (body) => authApi.post("/signup", body),
  });

  const onRegister = (values) => {
    registerMutation.mutate(values, {
      onSuccess(response) {
        const { email } = response.data;
        const toastMessage = `Email xác nhận đã được gửi tới ${email}`;
        notification.success({ message: toastMessage });
      },
      onError(response) {
        if (response.response.data.message === "Email already exist") {
          notification.error({ message: "Email đã tồn tại" });
        } else {
          notification.error({
            message: "Đăng kí thất bại, vui lòng thử lại sau",
          });
        }
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 bg-[url('/FPT.jpg')] bg-cover bg-top" />
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative flex items-center justify-center w-full h-full">
        <div className=" sm:basis-1/2 p-[20px] mt-20 z-10">
          <Form
            onFinish={onRegister}
            className="flex flex-col items-center"
            name="basic"
            wrapperCol={{
              span: 24,
            }}
          >
            <div className="mb-2 w-full flex flex-col  items-center">
              <label className="block text-white font-bold mb-1 sm:w-4/5">
                Tên Đầy Đủ
              </label>
              <Form.Item
                name="fullName"
                className="sm:w-4/5"
                rules={[
                  {
                    required: true,
                    message: "Tên đầy đủ của bạn",
                  },
                ]}
              >
                <Input
                  placeholder="Nhập Tên đầy đủ"
                  style={{ padding: "10px 20px", maxWidth: "100%" }}
                />
              </Form.Item>
            </div>

            <div className="mb-2 w-full flex flex-col items-center">
              <label className="block text-white font-bold mb-1 sm:w-4/5">
                Email
              </label>
              <Form.Item
                name="email"
                className="sm:w-4/5"
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
                  style={{ padding: "10px 20px", maxWidth: "100%" }}
                />
              </Form.Item>
            </div>

            <div className="mb-2 w-full flex flex-col items-center">
              <label className="block text-white font-bold mb-1 sm:w-4/5">
                Mật Khẩu
              </label>
              <Form.Item
                name="password"
                className="sm:w-4/5"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                  {
                    pattern: new RegExp(
                      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:"\\|,.<>\\/?]).{8,}$'
                    ),
                    message: "Mật khẩu yếu",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Nhập mật khẩu"
                  style={{ padding: "10px 20px", maxWidth: "100%" }}
                />
              </Form.Item>
            </div>

            <div className="mb-2 w-full flex flex-col items-center">
              <label className="block text-white font-bold mb-1 sm:w-4/5">
                Xác Nhận Mật Khẩu
              </label>
              <Form.Item
                name="confirm"
                className="sm:w-4/5"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập lại mật khẩu!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu không khớp!"));
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Nhập lại mật khẩu"
                  style={{ padding: "10px 20px", maxWidth: "100%" }}
                />
              </Form.Item>
            </div>

            <Form.Item
              wrapperCol={{
                span: 24,
              }}
              className="flex justify-center w-4/5"
            >
              <Button
                loading={registerMutation.isPending}
                type="primary"
                htmlType="submit"
                style={{
                  color: "#5884bb",
                  padding: "18px 28px",
                  backgroundColor: "lightcyan",
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "18px",
                  width: "100%",
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
                Đăng ký
              </Button>
            </Form.Item>
            <div className="text-center text-[#000] font-bold hidden sm:text-[#E0FFFF] ">
              <Link href="/Signin">Bạn đã có tài khoản?</Link>
            </div>
          </Form>
        </div>
        <div className="basis-1/2 z-10 hidden sm:block">
          <BoxCube />
        </div>
      </div>
    </div>
  );
};

export default Register;
