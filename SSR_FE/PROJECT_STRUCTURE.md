# Cấu trúc dự án đã được sắp xếp lại

## Những thay đổi đã thực hiện

### 🗑️ File đã xóa

- `i/` - Thư mục test files không cần thiết
- `index.js` - File dư thừa trong thư mục gốc
- `reportWebVitals copy.js` - File copy không cần thiết
- `src/views/` - Thư mục không sử dụng (đã có components thay thế)

### 🏗️ Thư mục mới đã tạo

- `src/layouts/` - Chứa Header và Sidebar components
- `src/ui/` - Chứa các UI components như Login
- `src/constants/` - Chứa constants của ứng dụng
- `src/utils/` - Chứa utility functions

### 📁 File đã di chuyển

**Từ `src/components/` → `src/layouts/`**

- `Header.jsx` → `src/layouts/Header.jsx`
- `Header.css` → `src/layouts/Header.css`
- `Sidebar.jsx` → `src/layouts/Sidebar.jsx`
- `Sidebar.css` → `src/layouts/Sidebar.css`

**Từ `src/components/` → `src/ui/`**

- `Login.jsx` → `src/ui/Login.jsx`
- `Login.css` → `src/ui/Login.css`

### 🔧 Imports đã cập nhật

- `App.jsx`: Import Login từ `./ui/Login`
- `MainApp.jsx`: Import Header và Sidebar từ `../layouts/`

### 📄 File constants mới (`src/constants/index.js`)

- APP_NAME, APP_VERSION
- THEME_MODES (LIGHT, DARK)
- MODULES (dashboard, production, warehouse, etc.)
- API_ENDPOINTS
- STORAGE_KEYS
- VALIDATION rules

### 🛠️ File utils mới (`src/utils/index.js`)

- `formatDate()` - Format ngày tháng
- `formatCurrency()` - Format tiền tệ VND
- `debounce()` - Debounce function
- `generateId()` - Tạo ID unique
- `hasPermission()` - Kiểm tra quyền user
- `isValidEmail()` - Validate email
- `capitalize()` - Viết hoa chữ cái đầu
- `toSlug()` - Convert string thành slug
- `deepClone()` - Clone object sâu

### 📁 Thư mục được giữ lại

Các thư mục sau được giữ lại để sử dụng trong tương lai:

- `src/routes/` - Dành cho routing
- `src/services/` - Dành cho API services
- `src/store/` - Dành cho state management
- `src/store/Actions/`
- `src/store/Reducers/`

## Cấu trúc cuối cùng

```
src/
├── components/
│   ├── modules/
│   │   ├── Dashboard.jsx/css
│   │   ├── Production.jsx/css
│   │   ├── Warehouse.jsx/css
│   │   ├── Shipping.jsx/css
│   │   ├── Sales.jsx/css
│   │   ├── Finance.jsx/css
│   │   ├── HR.jsx/css
│   │   ├── System.jsx/css
│   │   └── shared.css
│   └── MainApp.jsx/css
├── layouts/
│   ├── Header.jsx/css
│   └── Sidebar.jsx/css
├── ui/
│   ├── Login.jsx/css
├── contexts/
│   └── ThemeContext.jsx
├── hooks/
│   └── useTheme.js
├── constants/
│   └── index.js
├── utils/
│   └── index.js
├── assets/
│   ├── images/
│   ├── audio/
│   └── react.svg
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

## Lợi ích của cấu trúc mới

✅ **Clean Code**: Tách biệt rõ ràng giữa layouts, UI components, và business logic
✅ **Dễ bảo trì**: Cấu trúc phẳng, dễ tìm file
✅ **Scalable**: Có thể mở rộng thêm modules, pages, services
✅ **Reusable**: Utils và constants có thể tái sử dụng
✅ **Best Practices**: Tuân thủ React project conventions
✅ **Future-ready**: Thư mục trống sẵn sàng cho routing, services, store

## Cách sử dụng

### Import utilities

```javascript
import { formatCurrency, generateId } from "../utils";
import { MODULES, THEME_MODES } from "../constants";
```

### Import layouts

```javascript
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
```

### Import UI components

```javascript
import Login from "../ui/Login";
```
