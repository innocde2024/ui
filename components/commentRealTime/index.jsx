/* eslint-disable import/order */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable implicit-arrow-linebreak */
import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Image, Input, notification, Upload } from "antd";
import usePostById from "../../hook/forum/usePostById";
import formatDate from "../../utils/formatDate";
import useAllUserInformation from "../../hook/auth/useUserInfomation";
import forumApi from "../../api/forumApi";
import { io } from "socket.io-client";
import { forumURL } from "../../api/constants";
import { useEffect } from "react";

const CommentRealTime = ({ postId }) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const socket = io(forumURL);

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("commentAdded", (data) => {
      console.log("New comment created:", data);
      queryClient.invalidateQueries(`COMMENT${data.postId}`);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // const form = Form.useForm();
  const post = usePostById(postId)?.data;
  const { data, isLoading } = useAllUserInformation();
  const allInformation = data?.data;
  const getUserInfoById = (id) =>
    allInformation?.find(
      (information) => String(information.id) === String(id)
    );
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
  const uploadCommentMutation = useMutation({
    mutationFn: ({ id, body }) => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Authorization token is missing");
      }
      return forumApi.post(`api/forum/post/comment/${id}`, body, {
        headers: {
          Authorization: token,
        },
      });
    },
  });

  const onFinish = async (values) => {
    let file = null;
    let imageUrl = "";
    if (values.upload?.[0]) {
      file = values.upload[0].originFileObj;
      imageUrl = await handleOnSubmitImg(file);
    }

    const { content } = values;
    uploadCommentMutation.mutate(
      { id: post._id, body: { content, fileUrl: imageUrl } },
      {
        onError(dataError) {
          if (
            dataError.response.data.errors[0].errorCode === "UnAvailableImage"
          ) {
            notification.error({
              message: "Phát hiện hình ảnh không phù hợp",
            });
          }
        },
      }
    );
  };

  return (
    <section className="bg-orange-100 py-8 lg:py-16 antialiased border-t border-orange-700">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
            Bình Luận ({post?.comments?.length})
          </h2>
        </div>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item name="content" rules={[{ required: true }]}>
            <Input.TextArea placeholder="Bình Luận" />
          </Form.Item>
          <Form.Item
            name="upload"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload name="image" listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Đăng Ảnh</Button>
            </Upload>
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button
              loading={uploadCommentMutation.isPending}
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "orange",
                borderColor: "#1DA57A",
                color: "#fff",
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                fontWeight: "bolder",
              }}
            >
              Đăng
            </Button>
          </Form.Item>
        </Form>
      </div>
      {post?.comments
        ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((comment) => {
          const user = getUserInfoById(comment.author);
          return (
            <article
              key={comment.id}
              className="p-6 text-base bg-white border-t border-gray-200"
            >
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src={user?.avatarUrl}
                      alt="user"
                    />
                    {user?.fullName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <time
                      dateTime={comment.createdAt}
                      title={formatDate(new Date(comment.createdAt))}
                    >
                      {formatDate(new Date(comment.createdAt))}
                    </time>
                  </p>
                </div>
              </footer>
              <p className="text-gray-500">{comment.content}</p>
              {comment.fileUrl && <Image width={200} src={comment.fileUrl} />}
            </article>
          );
        })}
    </section>
  );
};
export default CommentRealTime;
