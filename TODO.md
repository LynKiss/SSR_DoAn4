# TODO - Sắp xếp cấu trúc dự án SSR_FE

## ✅ Đã hoàn thành

### Bước 1: Dọn dẹp file không cần thiết

- [x] Xóa thư mục `i/`
- [x] Xóa file `index.js` trong thư mục gốc
- [x] Xóa file `reportWebVitals copy.js`
- [x] Xóa thư mục `src/views/` (sử dụng `src/components/` thay thế)
- [x] **Giữ lại thư mục trống** `routes/`, `services/`, `store/` để sử dụng trong tương lai

### Bước 2: Tối ưu cấu trúc components

- [x] Giữ `src/components/` làm nơi chứa tất cả components
- [x] Tổ chức modules trong `src/components/modules/`
- [x] Tạo thư mục `src/layouts/` cho Header, Sidebar
- [x] Di chuyển Header và Sidebar vào layouts/
- [x] Tạo thư mục `src/ui/` cho các UI components
- [x] Di chuyển Login vào ui/

### Bước 3: Sắp xếp utilities và helpers

- [x] Tạo thư mục `src/utils/` cho utility functions
- [x] Tạo thư mục `src/constants/` cho constants
- [x] Tạo file constants/index.js với các constants cần thiết
- [x] Tạo file utils/index.js với các utility functions

### Bước 4: Clean up imports và dependencies

- [x] Đảm bảo tất cả imports đều chính xác
- [x] Cập nhật App.jsx import Login từ `./ui/Login`
- [x] Cập nhật MainApp.jsx import Header và Sidebar từ `../layouts/`

### Bước 5: Tạo cấu trúc cuối cùng

- [x] Tạo file PROJECT_STRUCTURE.md để ghi lại thay đổi
- [x] Kiểm tra cấu trúc cuối cùng

### Bước 6: Tạo hệ thống SCSS design system

- [x] Tạo `src/styles/main.scss` - Variables, base styles, typography
- [x] Tạo `src/styles/layout/_header.scss` - Header component styles
- [x] Tạo `src/styles/layout/_sidebar.scss` - Sidebar component styles
- [x] Tạo `src/styles/layout/_main-app.scss` - Main layout styles
- [x] Tạo `src/styles/components/_login.scss` - Login component styles
- [x] Tạo `src/styles/modules/_dashboard.scss` - Dashboard module styles
- [x] Tạo `src/styles/index.scss` - Main import file

### Bước 7: Cập nhật components sử dụng SCSS

- [x] Cập nhật `Header.jsx` - Sử dụng SCSS classes
- [x] Cập nhật `Sidebar.jsx` - Sử dụng SCSS classes
- [x] Cập nhật `MainApp.jsx` - Sử dụng SCSS classes và layout tốt hơn
- [x] Cập nhật `Login.jsx` - Sử dụng SCSS classes với design đẹp
- [x] Cập nhật `Dashboard.jsx` - Clean component với SCSS classes
- [x] Cập nhật `main.jsx` - Import SCSS thay vì CSS

### Bước 8: Clean up old CSS files

- [x] Xóa CSS imports khỏi các components
- [x] Xóa CSS file imports không cần thiết
- [x] Đảm bảo tất cả styles được load qua SCSS system

## 🎯 Kết quả cuối cùng

### Cấu trúc dự án hoàn thiện

```
src/
├── components/
│   ├── modules/ (8 modules: Dashboard, Production, Warehouse, Shipping, Sales, Finance, HR, System)
│   └── MainApp.jsx
├── layouts/
│   ├── Header.jsx/css
│   └── Sidebar.jsx/css
├── ui/
│   └── Login.jsx/css
├── contexts/
├── hooks/
├── constants/
│   └── index.js
├── utils/
│   └── index.js
├── styles/
│   ├── index.scss (main import)
│   ├── main.scss (variables, base, utilities)
│   ├── layout/
│   │   ├── _header.scss
│   │   ├── _sidebar.scss
│   │   └── _main-app.scss
│   ├── components/
│   │   └── _login.scss
│   └── modules/
│       └── _dashboard.scss
├── assets/
├── App.jsx
└── main.jsx
```

### Thiết kế UI hoàn thiện

✅ **Phong cách đơn giản cổ điển**: Color palette chuyên nghiệp, typography rõ ràng  
✅ **Responsive design**: Tối ưu cho mobile, tablet, desktop  
✅ **Dark mode support**: Hỗ trợ chuyển đổi theme sáng/tối  
✅ **Animations mượt mà**: Transitions và hover effects  
✅ **Components modular**: Dễ mở rộng và bảo trì  
✅ **Clean code**: Structure tốt, dễ đọc, dễ maintain

### Lợi ích đạt được

✅ **Clean Code**: Tách biệt rõ ràng layouts, UI, business logic  
✅ **Dễ bảo trì**: Cấu trúc phẳng, dễ tìm file  
✅ **Scalable**: Có thể mở rộng thêm modules, pages, services  
✅ **Reusable**: Utils và constants có thể tái sử dụng  
✅ **Best Practices**: Tuân thủ React project conventions  
✅ **Future-ready**: Thư mục trống sẵn sàng cho routing, services, store  
✅ **Professional UI**: Giao diện đẹp, hiện đại, dễ sử dụng  
✅ **SCSS Organization**: Styles được tổ chức khoa học, dễ quản lý
