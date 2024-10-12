/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Spin,
  notification,
  Tooltip,
  Modal,
} from "antd";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authApi from "../../api/authApi";
import useUserInfo from "../../hook/auth/useUserInfo";
import { USER_INFO } from "../../hook/auth/constants";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 6,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

export const UserPage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useUserInfo();
  const [form] = Form.useForm();
  const [mounted, setMounted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  // eslint-disable-next-line operator-linebreak
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const updateUserMutation = useMutation({
    mutationFn: (body) =>
      authApi.put("/profile", body, {
        headers: {
          Authorization: token,
        },
      }),

    onSuccess: () => {
      notification.success({
        message: "Cập nhật thành công",
        description: "Thông tin của bạn đã được cập nhật.",
      });
    },
    onError: (error) => {
      notification.error({
        message: "Update Failed",
        description: error?.response?.data?.message || "Có sự cố khi cập nhật.",
      });
    },
  });

  const updateAvatarMutation = useMutation({
    mutationFn: (formData) =>
      authApi.patch("/update-avatar", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }),

    onSuccess: () => {
      notification.success({
        message: "Cập nhật ảnh đại diện thành công",
        description: "Ảnh đại diện của bạn đã được cập nhật.",
      });
      queryClient.invalidateQueries(USER_INFO);
    },
    onError: (error) => {
      notification.error({
        message: "Update Failed",
        description: error?.response?.data?.message || "Có sự cố khi cập nhật.",
      });
    },
  });
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target.result);
    };
    reader.readAsDataURL(selectedFile);
  };
  const handleSubmit = () => {
    const formData = form.getFieldsValue();
    const userInfo = {
      fullName: formData.fullName,
      about: formData.About,
      gender: formData.Select,
      dob: formData.DatePicker ? formData.DatePicker.toISOString() : null,
    };

    updateUserMutation.mutate(
      userInfo,
      {
        onSettled: () => {
          notification.destroy("updateNotification");
        },
      },
      queryClient.invalidateQueries(USER_INFO)
    );
  };

  const handleAvatarClick = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleModalOk = () => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    updateAvatarMutation.mutate(formData, {
      onSettled: () => {
        notification.destroy("updateNotification");
      },
    });

    setIsModalVisible(false);
  };

  useEffect(() => {
    if (!isLoading && data) {
      form.setFieldsValue({
        fullName: data.data?.fullName,
        About: data.data?.about,
        Select: data.data?.gender,
        DatePicker: data.data?.dob ? moment(data.data.dob) : null,
      });
      setMounted(true);
    }
  }, [isLoading, data, form]);

  if (isLoading || !mounted) {
    return (
      <div className="w-[100vw] h-[100vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-color flex items-center justify-center ">
      <div className=" w-[80vw] h-[75vh] ">
        <div className="bg-[#6A96B9] sm:flex sm:items-center sm:gap-[200px] h-full rounded-[50px] shadow-2xl shadow-red-900">
          <Tooltip title="Cập nhật ảnh đại diện">
            <div onClick={handleAvatarClick} className="cursor-pointer flex items-center justify-center sm:block ">
              <img
                src={data.data?.avatarUrl}
                alt="avatar"
                className="bg-black w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] rounded-full object-cover sm:ml-20 mt-10 sm:mt-0"
              />
            </div>
          </Tooltip>
          <div>
            <h1 className="text-white font-bold sm:text-[2.5rem] sm:mb-5 mt-5 sm:mt-0 flex items-center justify-center sm:block">
              CẬP NHẬT THÔNG TIN CỦA BẠN
            </h1>
            <Form
              isLoading={updateUserMutation.isPending}
              onFinish={handleSubmit}
              {...formItemLayout}
              style={{ maxWidth: 600 }}
              className=" w-[60vw] ml-10 mt-12"
              form={form}
            >
              <div className="text-white text-lg font-bold ">
                Thông Tin Cá Nhân
              </div>
              <Form.Item
                className="sm:w-[50rem] "
                name="fullName"
                rules={[{ required: true, message: "Vui lòng nhập đầy đủ tên" }]}
              >
                <Input className="shadow-md  " />
              </Form.Item>
              <div className="text-white text-lg font-bold  ">Mô Tả</div>
              <Form.Item
                className="sm:w-[50rem]"
                name="About"
              >
                <Input />
              </Form.Item>
              <div className="text-white text-lg font-bold">Giới Tính</div>
              <Form.Item
                className="sm:w-[50rem]"
                name="Select"
                rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
              >
                <Select>
                  <Select.Option value="MALE">NAM</Select.Option>
                  <Select.Option value="FEMALE">NỮ</Select.Option>
                  <Select.Option value="OTHER">KHÁC</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="DatePicker"
                rules={[{ required: true, message: "Vui lòng nhập ngày sinh" }]}
              >
                <div className="text-white text-lg font-bold ">Ngày Sinh</div>
                <DatePicker />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Button
                  className=" w-[7rem] font-semibold bg-[#14173D] ]"
                  type="primary"
                  htmlType="submit"
                  loading={updateUserMutation.isLoading}
                >
                  Xác Nhận
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

      <Modal
        title="Cập Nhật Ảnh Đại Diện"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={[
          <Button key="back" onClick={handleModalCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleModalOk}>
            Cập nhật
          </Button>,
        ]}
      >
        <Input
          className=""
          onChange={handleFileChange}
          type="file"
          placeholder="Choose avatar"
        />
        {previewImage && (
          <div className="mt-4 flex items-center justify-center">
            <img
              src={previewImage}
              alt="Preview"
              className="w-[200px] h-[200px] object-cover rounded-full "
            />
          </div>
        )}
      </Modal>
    </div>
  );
};
