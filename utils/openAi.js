import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "api-key",
  dangerouslyAllowBrowser: true,
});

// New

export const chatCompletion = async (question) => {
  const chat = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: question,
      },
      {
        role: "system",
        content:
          "Chúng tôi hân hạnh giới thiệu trang web đặc biệt nhân dịp kỷ niệm 25 năm thành lập FPT Education, với những chủ đề tiên phong: Trí tuệ nhân tạo - Bán dẫn - Xe điện - Chuyển đổi số - Môi trường Xanh. Đội ngũ xây dựng và thành lập trang web: Huỳnh Kim Huy, Huỳnh Văn Mạnh, Võ Hoàng Kiệt, Nguyễn Thị Mai Trinh. Tính năng trang web: Trang web này không chỉ là một cổng thông tin mà còn là cầu nối giữa quá khứ, hiện tại và tương lai của FPT Education. Được thiết kế với sự sáng tạo và thân thiện với người dùng, trang web tích hợp công nghệ tiên tiến và truyền tải thông điệp mạnh mẽ về bảo vệ môi trường. Nó phản ánh sự phát triển vượt bậc của FPT Education trong các lĩnh vực trí tuệ nhân tạo, bán dẫn, xe điện, chuyển đổi số và môi trường xanh. Cấu trúc trang web: Trang web được chia thành ba phần chính, mỗi phần đều mang trong mình sứ mệnh riêng biệt và đầy ý nghĩa: Trang Landscape: Khắc họa hành trình lịch sử của FPT Education qua từng chặng đường, từ những bước đi đầu tiên cho đến những thành tựu rực rỡ. Giao diện được thiết kế đẹp mắt, dễ nhìn và dễ sử dụng, mang lại trải nghiệm trực quan và thú vị cho người xem. Trang Forum: Diễn đàn mở, nơi mọi người có thể chia sẻ bài viết, giao lưu và tương tác. Đây là không gian để cộng đồng cùng đóng góp, học hỏi và phát triển. Tạo điều kiện cho việc trao đổi ý tưởng và xây dựng một cộng đồng gắn kết, cùng nhau tiến bộ. Tích hợp chức năng đăng nhập và đăng ký tài khoản, giúp người dùng dễ dàng tham gia và quản lý các hoạt động trên diễn đàn. Chức năng chatbot: Mọi người có thể tương tác với hộp chat để hiểu rõ thông tin về trang web cũng như những gì liên quan, thắc mắc. Nó sẽ hỗ trợ bạn với những thông tin và thắc mắc cần thiết. Trang bán đồ lưu niệm FPT Education: Không gian trưng bày và bán các sản phẩm lưu niệm độc đáo, mỗi sản phẩm không chỉ mang giá trị kỷ niệm mà còn góp phần gây quỹ. Với mỗi đóng góp, người dùng sẽ được tặng cây xanh, góp phần bảo vệ môi trường và lan tỏa thông điệp sống xanh. Trang web yêu cầu và tiêu chí thiết kế: Thiết kế giao diện: Sáng tạo, thẩm mỹ và thân thiện với người dùng. Phản ánh rõ nét các chủ đề trọng tâm: trí tuệ nhân tạo, bán dẫn, xe điện, chuyển đổi số và môi trường xanh. Tính năng và chức năng: Tích hợp công nghệ trí tuệ nhân tạo, mang lại trải nghiệm người dùng tuyệt vời. Cập nhật thông tin chi tiết và mới nhất về xe điện và công nghệ bán dẫn mà FPT đang phát triển. Hỗ trợ quá trình chuyển đổi số cho cả doanh nghiệp và cá nhân. Nâng cao nhận thức và khuyến khích bảo vệ môi trường xanh. Cho phép người dùng đăng ký và đăng nhập tài khoản, dễ dàng quản lý thông tin cá nhân và tương tác trên trang web. Nội dung kỷ niệm 25 năm FPT Education: Tích hợp thông tin và sự kiện quan trọng trong suốt 25 năm hành trình của FPT Education. Tôn vinh những thành tựu nổi bật và đóng góp của FPT Education đối với cộng đồng và nền giáo dục. Chúng tôi tin rằng, trang web này không chỉ là một cột mốc kỷ niệm mà còn là biểu tượng cho sự phát triển bền vững và cam kết mạnh mẽ của FPT Education đối với tương lai.",
      },
    ],
    user: "asst_zYktGjA2Ozpe11WB1SjE7Jvm",
  });
  return chat.choices[0].message;
};
