/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, Select, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import forumApi from "../../api/forumApi";
import { ALL_POST } from "../../hook/forum/constants";
import { vi } from "../../utils/banWords";

const { TextArea } = Input;

const CreatePost = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  const [isHaveBanWord, setIsHaveBanWord] = useState(false);

  useEffect(() => {
    if (vi.some((word) => content.toLowerCase().includes(word))) {
      setIsHaveBanWord(true);
    } else {
      setIsHaveBanWord(false);
    }
  }, [content]);

  const uploadPostMutation = useMutation({
    mutationFn: (body) => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Authorization token is missing");
      }
      return forumApi.post("api/forum/post", body, {
        headers: {
          Authorization: token,
        },
      });
    },
  });

  const handleOnSubmitImg = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");
      const dataImage = await fetch(
        "https://api.cloudinary.com/v1_1/dxge4xlbh/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());
      return dataImage.url;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const onFinish = async (values) => {
    let file = null;
    let imageUrl = "";
    if (values.upload?.[0]) {
      file = values.upload[0].originFileObj;
      imageUrl = await handleOnSubmitImg(file);
    }

    const { content: contenta, topic: postTopic } = values;
    uploadPostMutation.mutate(
      { content: contenta, topic: postTopic, fileUrl: imageUrl },
      {
        onSuccess() {
          notification.success({ message: "Đăng thành công" });
          form.resetFields();
          queryClient.invalidateQueries(ALL_POST);
        },
        onError(data) {
          console.log(data.response.data.errors[0].errorCode);
          if (data.response.data.errors[0].errorCode === "Violence") {
            notification.error({
              message: "Phát hiện hình ảnh bạo lực.",
            });
          }
          if (data.response.data.errors[0].errorCode === "Adult") {
            notification.error({
              message: "Phát hiện hình ảnh nhạy cảm.",
            });
          }
          if (data.response.data.errors[0].errorCode === "Spoof") {
            notification.error({
              message: "Phát hiện hình ảnh nhạy cảm.",
            });
          }

          if (data.response.data.errors[0].errorCode === "UnAvailableImage") {
            notification.error({
              message: "Phát hiện hình ảnh không phù hợp",
            });
          }
        },
      }
    );
  };

  return (
    <div className="p-4 bg-orange-100 shadow-lg rounded-3xl mt-4 w-full max-w-lg mx-auto ml-10">
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="topic"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn chủ đề!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Chủ đề thảo luận"
            options={[
              { value: "Trí tuệ nhân tạo", label: "Trí tuệ nhân tạo" },
              { value: "Bán dẫn", label: "Bán dẫn" },
              { value: "Xe điện", label: "Xe điện" },
              { value: "Chuyển đổi số", label: "Chuyển đổi số" },
              { value: "Môi trường Xanh", label: "Môi trường Xanh" },
              { value: "Tán gẫu", label: "Tán gẫu" },
            ]}
            className="w-full"
          />
        </Form.Item>

        <Form.Item
          name="content"
          validateStatus={isHaveBanWord ? "error" : ""}
          help={isHaveBanWord ? "Nội dung chứa từ cấm" : ""}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập nội dung!",
            },
          ]}
        >
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="Bạn đang nghĩ gì?"
            className="w-full border border-gray-300 rounded-md focus:ring focus:ring-orange-400 focus:border-orange-100"
          />
        </Form.Item>

        <Form.Item
          name="upload"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload
            name="image"
            listType="picture"
            maxCount={1}
            className="w-full"
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item className="text-center">
          <Button
            disabled={isHaveBanWord}
            loading={uploadPostMutation.isPending}
            type="default"
            htmlType="submit"
            className="bg-orange-500 border-orange-500 hover:bg-orange-600 hover:border-orange-600 w-full font-bold text-white transition-colors duration-200"
          >
            Đăng
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreatePost;
