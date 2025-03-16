# Hướng dẫn triển khai XNBlog lên Netlify

## Bước 1: Chuẩn bị dự án

1. Đảm bảo dự án đã được cấu hình đúng cho việc triển khai:
   - Đã thêm file `netlify.toml` vào thư mục gốc
   - Đã tạo thư mục `netlify/functions` cho các serverless functions

2. Kiểm tra cấu hình Astro:
   - Đảm bảo `astro.config.mjs` đã được cấu hình với `output: "server"`
   - Kiểm tra các biến môi trường đã được cấu hình đúng

## Bước 2: Tạo tài khoản và dự án trên Netlify

1. Truy cập [Netlify](https://www.netlify.com/) và đăng nhập hoặc đăng ký tài khoản mới
2. Từ dashboard, nhấp vào "Add new site" > "Import an existing project"
3. Kết nối với GitHub, GitLab hoặc Bitbucket nơi bạn lưu trữ mã nguồn
4. Chọn repository chứa dự án XNBlog

## Bước 3: Cấu hình triển khai

1. Trong phần cấu hình triển khai, thiết lập:
   - Build command: `npm run build`
   - Publish directory: `dist`

2. Mở rộng phần "Advanced build settings" và thêm các biến môi trường:
   - `VITE_SUPABASE_URL`: URL của Supabase (sao chép từ file `.env`)
   - `VITE_SUPABASE_ANON_KEY`: Khóa ẩn danh của Supabase (sao chép từ file `.env`)

3. Nhấp vào "Deploy site" để bắt đầu quá trình triển khai

## Bước 4: Cấu hình Supabase cho production

1. Truy cập [Supabase Dashboard](https://app.supabase.io/)
2. Chọn dự án của bạn
3. Vào phần "Authentication" > "URL Configuration"
4. Thêm URL của trang web Netlify vào danh sách "Site URLs" (ví dụ: `https://xnblog.netlify.app`)
5. Lưu cấu hình

## Bước 5: Kiểm tra và xử lý lỗi

1. Sau khi triển khai hoàn tất, kiểm tra trang web của bạn tại URL Netlify cung cấp
2. Kiểm tra các chức năng:
   - Xem danh sách bài viết
   - Xem chi tiết bài viết
   - Gửi form liên hệ
   - Đăng nhập vào trang admin

3. Nếu gặp lỗi, kiểm tra:
   - Log triển khai trong Netlify dashboard
   - Kiểm tra console của trình duyệt
   - Đảm bảo các biến môi trường đã được cấu hình đúng

## Bước 6: Cấu hình tên miền tùy chỉnh (tùy chọn)

1. Trong Netlify dashboard, vào phần "Domain settings"
2. Nhấp vào "Add custom domain"
3. Nhập tên miền của bạn và làm theo hướng dẫn để cấu hình DNS

## Bước 7: Bảo trì và cập nhật

1. Mỗi khi bạn đẩy các thay đổi lên repository, Netlify sẽ tự động triển khai lại trang web
2. Kiểm tra log triển khai để đảm bảo mọi thứ hoạt động đúng
3. Sử dụng tính năng "Deploy previews" của Netlify để kiểm tra các thay đổi trước khi hợp nhất vào nhánh chính

## Lưu ý quan trọng

- **Bảo mật**: Không bao giờ đưa các khóa bí mật vào mã nguồn. Luôn sử dụng biến môi trường của Netlify.
- **Serverless Functions**: Nếu cần xử lý phía máy chủ phức tạp hơn, hãy sử dụng Netlify Functions.
- **Giới hạn**: Lưu ý về các giới hạn của gói Netlify bạn đang sử dụng (số lượng build, băng thông, v.v.).

## Khắc phục sự cố phổ biến

### Lỗi kết nối Supabase
- Kiểm tra URL và khóa Supabase trong biến môi trường Netlify
- Đảm bảo URL trang web đã được thêm vào cấu hình Supabase

### Lỗi 404 khi truy cập các trang
- Kiểm tra cấu hình chuyển hướng trong file `netlify.toml`
- Đảm bảo Astro đã được cấu hình đúng với `output: "server"`

### Lỗi khi đăng nhập admin
- Kiểm tra cấu hình xác thực Supabase
- Đảm bảo URL callback đã được cấu hình đúng trong Supabase
