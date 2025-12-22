# Kế hoạch sắp xếp lại cấu trúc dự án SSR_FE

## Vấn đề hiện tại

1. File App.jsx và App.js trùng lặp và conflict
2. Nhiều thư mục trống: routes, services, store
3. File index.js và reportWebVitals copy.js dư thừa
4. Thư mục i/ chứa test files không cần thiết
5. Cấu trúc chưa theo React best practices

## Kế hoạch thực hiện

### Bước 1: Dọn dẹp file không cần thiết

- Xóa thư mục `i/`
- Xóa file `index.js` trong thư mục gốc
- Xóa file `reportWebVitals copy.js`
- Xóa thư mục `src/views/` (sử dụng `src/components/` thay thế)
- **Giữ lại thư mục trống** `routes/`, `services/`, `store/` để sử dụng trong tương lai

### Bước 2: Tối ưu cấu trúc components

- Giữ `src/components/` làm nơi chứa tất cả components
- Tổ chức modules trong `src/components/modules/`
- Tạo thư mục `src/layouts/` cho Header, Sidebar
- Tạo thư mục `src/pages/` cho các trang chính

### Bước 3: Sắp xếp utilities và helpers

- Tạo thư mục `src/utils/` cho utility functions
- Tạo thư mục `src/constants/` cho constants
- Tạo thư mục `src/types/` cho TypeScript types (nếu cần)

### Bước 4: Clean up imports và dependencies

- Đảm bảo tất cả imports đều chính xác
- Cập nhật package.json nếu cần
- Tối ưu CSS imports

### Bước 5: Tạo cấu trúc cuối cùng

```
src/
├── components/
│   ├── layouts/
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── Sidebar.jsx
│   │   └── Sidebar.css
│   ├── modules/
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── Production.jsx
│   │   ├── Production.css
│   │   └── ...
│   ├── ui/
│   │   ├── Login.jsx
│   │   └── Login.css
│   └── MainApp.jsx
├── contexts/
├── hooks/
├── utils/
├── constants/
├── assets/
│   ├── images/
│   └── audio/
├── App.jsx
└── main.jsx
```

## Kết quả mong đợi

- Cấu trúc rõ ràng, dễ navigate
- Loại bỏ file trùng lặp và không cần thiết
- Code clean, dễ bảo trì
- Tuân thủ React best practices
