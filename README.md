# Lumiaura Content Lab

App quản lý và hỗ trợ phòng media trong việc nghiên cứu, sáng tạo nội dung quảng cáo mỹ phẩm.

## Tính năng

| Module | Mô tả |
|---|---|
| 🔍 Viral Research | Tìm kiếm video viral mỹ phẩm theo khu vực, nền tảng, từ khóa |
| 📈 Trend Analysis | Xu hướng hashtag, category, format nội dung |
| 📚 Knowledge Base | Bài viết hướng dẫn chiến lược content |
| 🗓️ Campaigns | Quản lý chiến dịch marketing |
| 💡 Ideas Board | Kanban board quản lý ý tưởng nội dung |
| 👥 Team | Danh sách và phân công team |
| 📋 Guidelines & SOP | Quy trình làm việc chuẩn, onboarding nhân viên mới |

## Triển khai lên Hostinger

### Bước 1 — Build
App là static HTML/CSS/JS, không cần build.

### Bước 2 — Upload lên Hostinger
1. Đăng nhập Hostinger → **Hosting** → **File Manager**
2. Vào thư mục `public_html`
3. Upload toàn bộ nội dung repository:
   - `index.html`
   - `assets/` (thư mục)
4. Truy cập domain để kiểm tra

### Bước 3 — Custom Domain (tùy chọn)
Trong Hostinger → **Domains** → trỏ domain về hosting.

## Cấu trúc file

```
├── index.html          # App shell
├── assets/
│   ├── css/main.css    # Toàn bộ styles
│   └── js/
│       ├── data.js     # Dữ liệu tĩnh & mock content
│       └── app.js      # Logic SPA (routing, render, state)
└── README.md
```

## Phát triển thêm

- Dữ liệu thật: Tích hợp TikTok API / YouTube Data API
- Backend: Node.js + MongoDB để lưu campaigns, ideas
- Auth: Firebase Authentication
- Hosting nâng cao: Vercel / Netlify cho CI/CD tự động từ GitHub
